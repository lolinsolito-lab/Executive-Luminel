
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
});

// Initialize Supabase (Admin Client for DB updates)
const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // MUST BE SERVICE ROLE KEY
);

export const config = {
    api: {
        bodyParser: false, // Stripe raw body needed
    },
};

// Helper to buffer the raw body for signature verification
async function buffer(readable: any) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        if (!sig || !webhookSecret) return res.status(400).send('Missing signature or secret');
        event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err: any) {
        console.error(`⚠️  Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Extract UserID from client_reference_id
        const userId = session.client_reference_id;
        const amount = session.amount_total; // e.g., 29900 for €299.00
        const email = session.customer_details?.email;

        // Fallback: If no client_reference_id, try to find user by email
        let targetUserId = userId;

        if (!targetUserId && email) {
            console.log(`No client_reference_id. Searching user by email: ${email}`);
            const { data: user, error } = await supabase
                .from('profiles')
                .select('id')
                .eq('email', email)
                .single();

            if (user) targetUserId = user.id;
        }

        if (!targetUserId) {
            console.error('❌ User not found for subscription update');
            return res.status(400).json({ error: 'User Identification Failed' });
        }

        // TIER MAPPING LOGIC (The Uplink)
        // Price Config: Strategist (~€49), Executive (~€299)
        let newTier = 'GRINDER'; // Default to Analyst/Free

        // Check Amount (Robust fallback if Price ID changes)
        if (amount && amount >= 20000) {
            newTier = 'EXECUTIVE'; // Maps to "The Executive" (Partner)
        } else if (amount && amount >= 3000) {
            newTier = 'STRATEGIST'; // Maps to "The Strategist" (Mercenary)
        }

        // TODO: If you have specific price_IDs, check session.line_items or session.metadata['price_id']

        console.log(`✅ Payment received (€${amount ? amount / 100 : 0}). Upgrading user ${targetUserId} to ${newTier}`);

        // A. UPDATE PROFILE (Tier Grant)
        const { error: profileError } = await supabase
            .from('profiles')
            .update({
                subscription_tier: newTier, // Must match DB Enum (likely UPPERCASE based on app types)
                updated_at: new Date().toISOString()
            })
            .eq('id', targetUserId);

        if (profileError) {
            console.error('Failed to update profile:', profileError);
            return res.status(500).json({ error: 'DB Update Failed' });
        }

        // B. UPDATE SUBSCRIPTIONS TABLE (Ledger)
        await supabase.from('subscriptions').insert({
            user_id: targetUserId,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            tier: newTier,
            status: 'active',
            current_period_start: new Date().toISOString(),
        });

        // C. ANALYTICS UPDATE (The CFO Logic)
        // Increment daily revenue
        const today = new Date().toISOString().split('T')[0];

        // Upsert analytics row for today
        // Note: 'total_revenue' is usually an aggregation, but if we have a daily table:
        // We use an RPC or raw SQL for atomic increment, or fetch-update (optimistic lock).
        // Since we are Server-Side (Edge Function), straightforward SQL is best if Supabase client permits,
        // otherwise select -> update. For simplicity/robustness here, we'll try an RPC if it exists, or select-update.

        // Simplified "Get or Create" Logic
        const { data: stats } = await supabase
            .from('analytics_daily')
            .select('*')
            .eq('date', today)
            .single();

        if (stats) {
            await supabase
                .from('analytics_daily')
                .update({
                    total_revenue: (stats.total_revenue || 0) + (amount || 0),
                    updated_at: new Date().toISOString()
                })
                .eq('date', today);
        } else {
            await supabase
                .from('analytics_daily')
                .insert({
                    date: today,
                    total_revenue: amount || 0,
                    active_users: 1, // Approximation
                    updated_at: new Date().toISOString()
                });
        }
    }

    res.status(200).json({ received: true });
}

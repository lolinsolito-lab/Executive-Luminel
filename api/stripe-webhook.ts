
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
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
        const amount = session.amount_total;
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

        // Determine Tier based on amount (Primitive but effective for V5.0)
        // STRATEGIST = ~€4900 (49.00)
        // EXECUTIVE = ~€29900 (299.00)
        let newTier = 'GRINDER';
        if (amount && amount >= 29000) newTier = 'EXECUTIVE';
        else if (amount && amount >= 4000) newTier = 'STRATEGIST';

        console.log(`✅ Payment received. Upgrading user ${targetUserId} to ${newTier}`);

        // Update Profile
        const { error: profileError } = await supabase
            .from('profiles')
            .update({
                subscription_tier: newTier,
                updated_at: new Date().toISOString()
            })
            .eq('id', targetUserId);

        // Create Subscription Record
        await supabase.from('subscriptions').insert({
            user_id: targetUserId,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            tier: newTier,
            status: 'active',
            current_period_start: new Date().toISOString(),
            // Logic for period_end would go here, but omitted for brevity in "Launch" phase
        });

        if (profileError) {
            console.error('Failed to update profile:', profileError);
            return res.status(500).json({ error: 'DB Update Failed' });
        }
    }

    res.status(200).json({ received: true });
}

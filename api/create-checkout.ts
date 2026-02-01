import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
});

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    try {
        const { tier, userId, successUrl, cancelUrl } = req.body;

        if (!tier || !userId) {
            return res.status(400).json({ error: 'Missing parameters' });
        }

        // AD-HOC PRICING (Zero-Config Mode)
        // We define the product/price inline so we don't need to create them in Dashboard.
        let priceData;

        if (tier === 'STRATEGIST') {
            priceData = {
                currency: 'eur',
                product_data: {
                    name: 'The Strategist',
                    description: 'Access to Neural Codex, Sandbox, and Unlimited AI Chat.',
                },
                unit_amount: 4900, // €49.00
                recurring: {
                    interval: 'month',
                },
            };
        } else if (tier === 'EXECUTIVE') {
            priceData = {
                currency: 'eur',
                product_data: {
                    name: 'The Executive',
                    description: 'Full Access, Priority Support, and God Mode.',
                },
                unit_amount: 29900, // €299.00
                recurring: {
                    interval: 'month',
                },
            };
        } else {
            return res.status(400).json({ error: 'Invalid Tier' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: priceData as any,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: successUrl || `${req.headers.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancelUrl || `${req.headers.origin}/auth`,
            client_reference_id: userId,
            metadata: {
                userId: userId,
                tier: tier
            }
        });

        res.status(200).json({ url: session.url, sessionId: session.id });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err);
        res.status(500).json({ error: err.message });
    }
}

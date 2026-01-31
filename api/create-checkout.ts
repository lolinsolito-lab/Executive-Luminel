
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
});

export const config = {
    runtime: 'nodejs', // Utilizza Node.js per piena compatibilità
};

const PRODUCTS = {
    STRATEGIST: {
        name: 'LUMINEL // STRATEGIST',
        description: 'Accesso Avanzato: AI Illimitata + Neural Codex + Sandbox',
        amount: 4900, // €49.00
    },
    EXECUTIVE: {
        name: 'LUMINEL // EXECUTIVE',
        description: 'Accesso Elite: Vault + Priority Support + Human Network',
        amount: 29900, // €299.00
    }
};

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    try {
        const { tier, userId, userEmail } = req.body;

        if (!tier || !userId) {
            return res.status(400).json({ error: 'Missing parameters' });
        }

        const product = PRODUCTS[tier as keyof typeof PRODUCTS];
        if (!product) {
            return res.status(400).json({ error: 'Invalid Tier' });
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: userEmail,
            client_reference_id: userId,
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: product.name,
                            description: product.description,
                            // images: ['https://your-domain.com/luminel-logo.png'], // Optional
                        },
                        unit_amount: product.amount,
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: 1,
                },
            ],
            // Duplicate mode key removed
            mode: 'subscription',
            success_url: `${req.headers.origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/?payment=cancelled`,
            metadata: {
                userId: userId,
                tier: tier
            }
        });

        res.status(200).json({ url: session.url });

    } catch (err: any) {
        console.error('Stripe Checkout Error:', err);
        res.status(500).json({ error: err.message });
    }
}

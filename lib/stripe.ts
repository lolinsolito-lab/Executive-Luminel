import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Initialize Stripe
export const stripePromise = stripePublishableKey
    ? loadStripe(stripePublishableKey)
    : null;

// Pricing configuration
export const STRIPE_PRICES = {
    STRATEGIST: {
        priceId: '', // Set after creating product in Stripe Dashboard
        name: 'THE STRATEGIST',
        price: 49,
        currency: 'EUR',
        interval: 'month' as const,
        features: [
            'AI Chat illimitata',
            'Neural Codex (1 card/giorno)',
            'Out-of-Cycle Window',
            'Sandbox Simulator',
            'Vault Templates Base'
        ]
    },
    EXECUTIVE: {
        priceId: '', // Set after creating product in Stripe Dashboard
        name: 'THE EXECUTIVE',
        price: 299,
        currency: 'EUR',
        interval: 'month' as const,
        features: [
            'Tutto di Strategist +',
            'Priority AI Support',
            'Full Neural Codex',
            'Premium Vault Templates',
            'Email Support 4h',
            'WhatsApp Direct Line'
        ]
    }
};

// Create checkout session (call your backend)
export const createCheckoutSession = async (
    tier: 'STRATEGIST' | 'EXECUTIVE',
    userId: string,
    successUrl: string,
    cancelUrl: string
) => {
    // For now, redirect to Stripe Payment Links
    // In production, this should call your Supabase Edge Function
    const priceConfig = STRIPE_PRICES[tier];

    // Placeholder - will be replaced with actual Stripe Checkout
    console.log('Creating checkout for:', { tier, userId, priceConfig });

    // Return mock session for development
    return {
        sessionId: 'mock_session_' + Date.now(),
        url: null // Will be set when Stripe products are created
    };
};

// Redirect to Stripe Customer Portal (for managing subscriptions)
export const redirectToCustomerPortal = async (customerId: string) => {
    // This should be handled by a Supabase Edge Function
    console.log('Redirecting to portal for customer:', customerId);
};

// Check if Stripe is configured
export const isStripeConfigured = () => {
    return !!stripePublishableKey;
};

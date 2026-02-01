/// <reference types="vite/client" />
import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Initialize Stripe
export const stripePromise = stripePublishableKey
    ? loadStripe(stripePublishableKey)
    : null;

// Pricing configuration
export const STRIPE_PRICES = {
    STRATEGIST: {
        priceId: 'price_PLACEHOLDER_STRATEGIST', // User must update
        link: 'https://buy.stripe.com/test_strategist_placeholder',
        name: 'THE STRATEGIST',
        price: 49,
        currency: 'EUR',
    },
    EXECUTIVE: {
        priceId: 'price_PLACEHOLDER_EXECUTIVE', // User must update
        link: 'https://buy.stripe.com/test_executive_placeholder',
        name: 'THE EXECUTIVE',
        price: 299,
        currency: 'EUR',
    }
};

// Create checkout session (API Uplink)
export const createCheckoutSession = async (
    tier: 'STRATEGIST' | 'EXECUTIVE',
    userId: string,
    successUrl: string,
    cancelUrl: string
) => {
    try {
        const response = await fetch('/api/create-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tier,
                userId,
                successUrl,
                cancelUrl
            }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Checkout creation failed');

        return data; // { url, sessionId }
    } catch (error) {
        console.error("Uplink Error:", error);
        return null;
    }
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

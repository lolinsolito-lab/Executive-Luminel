import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Running in offline mode.');
}

export const supabase = createClient<Database>(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);

// Auth helpers
export const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    return { data, error };
};

export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};

export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

// Profile helpers
export const getProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    return { data, error };
};

export const updateProfile = async (userId: string, updates: Partial<{
    full_name: string;
    subscription_tier: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE';
    tier_level: string;
    performance_xp: number;
    political_capital: number;
}>) => {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
    return { data, error };
};

// Subscription helpers
export const getSubscription = async (userId: string) => {
    const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();
    return { data, error };
};

export const createSubscription = async (subscription: {
    user_id: string;
    stripe_customer_id?: string;
    stripe_subscription_id?: string;
    tier: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE';
    status: 'active' | 'cancelled' | 'past_due';
    current_period_end?: string;
}) => {
    const { data, error } = await supabase
        .from('subscriptions')
        .insert(subscription)
        .select()
        .single();
    return { data, error };
};

// Neural Codex tracking
export const logCardApplication = async (log: {
    user_id: string;
    card_id: string;
    context: string;
    notes?: string;
}) => {
    const { data, error } = await supabase
        .from('neural_codex_logs')
        .insert(log)
        .select()
        .single();
    return { data, error };
};

export const getCardApplications = async (userId: string, limit = 10) => {
    const { data, error } = await supabase
        .from('neural_codex_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
    return { data, error };
};

// =========================================
// V7 PHOENIX - Token Counter System
// =========================================

// Get current token usage for Tier 2 users
export const getTokenUsage = async (userId: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('tokens_used, tokens_reset_date')
        .eq('id', userId)
        .single();
    return { data, error };
};

// Increment token count (call after each AI message)
export const incrementTokenUsage = async (userId: string) => {
    const { data: profile } = await getTokenUsage(userId);

    // Check if we need to reset (new month)
    if (profile?.tokens_reset_date) {
        const resetDate = new Date(profile.tokens_reset_date);
        const now = new Date();
        if (now.getMonth() !== resetDate.getMonth() || now.getFullYear() !== resetDate.getFullYear()) {
            // Reset tokens for new month
            return await supabase
                .from('profiles')
                .update({
                    tokens_used: 1,
                    tokens_reset_date: now.toISOString()
                })
                .eq('id', userId)
                .select()
                .single();
        }
    }

    // Increment tokens
    const { data, error } = await supabase
        .from('profiles')
        .update({
            tokens_used: (profile?.tokens_used || 0) + 1
        })
        .eq('id', userId)
        .select()
        .single();
    return { data, error };
};

// Check if user has tokens remaining (for Tier 2)
export const hasTokensRemaining = async (userId: string, maxTokens = 50) => {
    const { data } = await getTokenUsage(userId);
    return (data?.tokens_used || 0) < maxTokens;
};

// Get message count for free tier (3/day limit)
export const getDailyMessageCount = async (userId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const { count, error } = await supabase
        .from('chat_history')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('role', 'user')
        .gte('created_at', `${today}T00:00:00.000Z`);
    return { count: count || 0, error };
};

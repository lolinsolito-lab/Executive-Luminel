export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    email: string
                    full_name: string | null
                    subscription_tier: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE'
                    tier_level: string
                    performance_xp: number
                    political_capital: number
                    max_performance_xp: number
                    max_political_capital: number
                    streak_days: number
                    total_sessions: number
                    is_admin: boolean
                    marketing_consent: boolean
                    tos_accepted_at: string | null
                    privacy_accepted_at: string | null
                    onboarding_completed: boolean
                }
                Insert: {
                    id: string
                    created_at?: string
                    updated_at?: string
                    email: string
                    full_name?: string | null
                    subscription_tier?: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE'
                    tier_level?: string
                    performance_xp?: number
                    political_capital?: number
                    max_performance_xp?: number
                    max_political_capital?: number
                    streak_days?: number
                    total_sessions?: number
                    is_admin?: boolean
                    marketing_consent?: boolean
                    tos_accepted_at?: string | null
                    privacy_accepted_at?: string | null
                    onboarding_completed?: boolean
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    email?: string
                    full_name?: string | null
                    subscription_tier?: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE'
                    tier_level?: string
                    performance_xp?: number
                    political_capital?: number
                    max_performance_xp?: number
                    max_political_capital?: number
                    streak_days?: number
                    total_sessions?: number
                    is_admin?: boolean
                    marketing_consent?: boolean
                    tos_accepted_at?: string | null
                    privacy_accepted_at?: string | null
                    onboarding_completed?: boolean
                }
            }
            subscriptions: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    user_id: string
                    stripe_customer_id: string | null
                    stripe_subscription_id: string | null
                    tier: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE'
                    status: 'active' | 'cancelled' | 'past_due' | 'trialing'
                    current_period_start: string | null
                    current_period_end: string | null
                    cancel_at_period_end: boolean
                }
                Insert: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    user_id: string
                    stripe_customer_id?: string | null
                    stripe_subscription_id?: string | null
                    tier?: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE'
                    status?: 'active' | 'cancelled' | 'past_due' | 'trialing'
                    current_period_start?: string | null
                    current_period_end?: string | null
                    cancel_at_period_end?: boolean
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    user_id?: string
                    stripe_customer_id?: string | null
                    stripe_subscription_id?: string | null
                    tier?: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE'
                    status?: 'active' | 'cancelled' | 'past_due' | 'trialing'
                    current_period_start?: string | null
                    current_period_end?: string | null
                    cancel_at_period_end?: boolean
                }
            }
            neural_codex_logs: {
                Row: {
                    id: string
                    created_at: string
                    user_id: string
                    card_id: string
                    context: string
                    notes: string | null
                    impact_performance: number | null
                    impact_capital: number | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    user_id: string
                    card_id: string
                    context: string
                    notes?: string | null
                    impact_performance?: number | null
                    impact_capital?: number | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    user_id?: string
                    card_id?: string
                    context?: string
                    notes?: string | null
                    impact_performance?: number | null
                    impact_capital?: number | null
                }
            }
            chat_sessions: {
                Row: {
                    id: string
                    created_at: string
                    user_id: string
                    title: string | null
                    messages: Json
                    is_archived: boolean
                }
                Insert: {
                    id?: string
                    created_at?: string
                    user_id: string
                    title?: string | null
                    messages?: Json
                    is_archived?: boolean
                }
                Update: {
                    id?: string
                    created_at?: string
                    user_id?: string
                    title?: string | null
                    messages?: Json
                    is_archived?: boolean
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            subscription_tier: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE'
            subscription_status: 'active' | 'cancelled' | 'past_due' | 'trialing'
        }
    }
}

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase, getProfile, updateProfile } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: ProfileData | null;
    isLoading: boolean;
    signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
    updateUserProfile: (updates: Partial<ProfileData>) => Promise<void>;
}

interface ProfileData {
    id: string;
    email: string;
    full_name: string | null;
    subscription_tier: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE';
    tier_level: string;
    performance_xp: number;
    political_capital: number;
    max_performance_xp: number;
    max_political_capital: number;
    streak_days: number;
    total_sessions: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                loadProfile(session.user.id);
            }
            setIsLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user) {
                    await loadProfile(session.user.id);
                } else {
                    setProfile(null);
                }
                setIsLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const loadProfile = async (userId: string) => {
        const { data, error } = await getProfile(userId);
        if (!error && data) {
            setProfile(data as ProfileData);
        }
    };

    const handleSignUp = async (email: string, password: string, fullName?: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName }
            }
        });
        return { error: error as Error | null };
    };

    const handleSignIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error: error as Error | null };
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setProfile(null);
    };

    const updateUserProfile = async (updates: Partial<ProfileData>) => {
        if (!user) return;
        const { data } = await updateProfile(user.id, updates);
        if (data) {
            setProfile(data as ProfileData);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            session,
            profile,
            isLoading,
            signUp: handleSignUp,
            signIn: handleSignIn,
            signOut: handleSignOut,
            updateUserProfile,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

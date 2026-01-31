import { useState, useContext, createContext, ReactNode, useCallback } from 'react';
import { supabase, logCardApplication, getCardApplications } from '../lib/supabase';
import { StrategyCard, getDailyCard, getCardsByContext, getCardById } from '../data/neural-codex';

interface CardApplication {
    id: string;
    card_id: string;
    context: string;
    notes: string | null;
    impact_performance: number | null;
    impact_capital: number | null;
    created_at: string;
}

interface NeuralCodexContextType {
    dailyCard: StrategyCard | null;
    appliedCards: CardApplication[];
    isLoading: boolean;
    applyCard: (cardId: string, context: string, notes?: string) => Promise<void>;
    getRelevantCards: (context: string) => StrategyCard[];
    refreshAppliedCards: () => Promise<void>;
    todayApplicationCount: number;
}

const NeuralCodexContext = createContext<NeuralCodexContextType | undefined>(undefined);

export const NeuralCodexProvider: React.FC<{ children: ReactNode; userId: string | null }> = ({
    children,
    userId
}) => {
    const [dailyCard] = useState<StrategyCard | null>(() => getDailyCard('STRATEGIST'));
    const [appliedCards, setAppliedCards] = useState<CardApplication[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Load applied cards from DB
    const refreshAppliedCards = useCallback(async () => {
        if (!userId) return;

        setIsLoading(true);
        try {
            const { data, error } = await getCardApplications(userId, 50);
            if (!error && data) {
                setAppliedCards(data as CardApplication[]);
            }
        } catch (e) {
            console.error('Failed to load card applications:', e);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    // Apply a card (log to DB)
    const applyCard = useCallback(async (cardId: string, context: string, notes?: string) => {
        if (!userId) {
            console.warn('Cannot apply card: user not authenticated');
            return;
        }

        const card = getCardById(cardId);
        if (!card) {
            console.error('Card not found:', cardId);
            return;
        }

        setIsLoading(true);
        try {
            const { data, error } = await logCardApplication({
                user_id: userId,
                card_id: cardId,
                context,
                notes: notes || null,
            });

            if (error) {
                console.error('Failed to log card application:', error);
                return;
            }

            // Add to local state
            if (data) {
                setAppliedCards(prev => [data as CardApplication, ...prev]);
            }
        } catch (e) {
            console.error('Failed to apply card:', e);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    // Get relevant cards for a context
    const getRelevantCards = useCallback((context: string) => {
        return getCardsByContext(context);
    }, []);

    // Count today's applications
    const todayApplicationCount = appliedCards.filter(app => {
        const appDate = new Date(app.created_at).toDateString();
        return appDate === new Date().toDateString();
    }).length;

    return (
        <NeuralCodexContext.Provider value={{
            dailyCard,
            appliedCards,
            isLoading,
            applyCard,
            getRelevantCards,
            refreshAppliedCards,
            todayApplicationCount,
        }}>
            {children}
        </NeuralCodexContext.Provider>
    );
};

export const useNeuralCodex = () => {
    const context = useContext(NeuralCodexContext);
    if (!context) {
        throw new Error('useNeuralCodex must be used within NeuralCodexProvider');
    }
    return context;
};

// Standalone helper for components that just need to apply a card
export const useApplyCard = () => {
    const { applyCard, isLoading } = useNeuralCodex();
    return { applyCard, isLoading };
};

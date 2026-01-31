import { useState, useCallback, createContext, useContext, ReactNode } from 'react';

interface PaywallContextType {
    isOpen: boolean;
    featureRequested: string | undefined;
    openPaywall: (feature?: string) => void;
    closePaywall: () => void;
    checkAccess: (requiredTier: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE', currentTier: string) => boolean;
}

const PaywallContext = createContext<PaywallContextType | undefined>(undefined);

const TIER_LEVELS = {
    'GRINDER': 0,
    'STRATEGIST': 1,
    'EXECUTIVE': 2,
};

export const PaywallProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [featureRequested, setFeatureRequested] = useState<string | undefined>();

    const openPaywall = useCallback((feature?: string) => {
        setFeatureRequested(feature);
        setIsOpen(true);
    }, []);

    const closePaywall = useCallback(() => {
        setIsOpen(false);
        setFeatureRequested(undefined);
    }, []);

    const checkAccess = useCallback((
        requiredTier: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE',
        currentTier: string
    ): boolean => {
        const requiredLevel = TIER_LEVELS[requiredTier] ?? 0;
        const currentLevel = TIER_LEVELS[currentTier as keyof typeof TIER_LEVELS] ?? 0;
        return currentLevel >= requiredLevel;
    }, []);

    return (
        <PaywallContext.Provider value={{
            isOpen,
            featureRequested,
            openPaywall,
            closePaywall,
            checkAccess
        }}>
            {children}
        </PaywallContext.Provider>
    );
};

export const usePaywall = () => {
    const context = useContext(PaywallContext);
    if (!context) {
        throw new Error('usePaywall must be used within PaywallProvider');
    }
    return context;
};

// Helper hook per gated features
export const useGatedFeature = (
    requiredTier: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE',
    currentTier: string,
    featureName: string
) => {
    const { openPaywall, checkAccess } = usePaywall();

    const hasAccess = checkAccess(requiredTier, currentTier);

    const executeOrPaywall = useCallback((action: () => void) => {
        if (hasAccess) {
            action();
        } else {
            openPaywall(featureName);
        }
    }, [hasAccess, openPaywall, featureName]);

    return { hasAccess, executeOrPaywall };
};

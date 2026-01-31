import { createContext, useContext, useState, ReactNode } from 'react';

type Tier = 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE';

// Feature access matrix
const FEATURE_MATRIX: Record<string, Record<Tier, boolean | number | string>> = {
    // Neural Codex
    'neural_codex': { GRINDER: false, STRATEGIST: true, EXECUTIVE: true },
    'neural_codex_full': { GRINDER: false, STRATEGIST: false, EXECUTIVE: true },

    // AI Chat
    'ai_unlimited': { GRINDER: false, STRATEGIST: true, EXECUTIVE: true },
    'ai_priority': { GRINDER: false, STRATEGIST: false, EXECUTIVE: true },
    'ai_daily_limit': { GRINDER: 3, STRATEGIST: -1, EXECUTIVE: -1 }, // -1 = unlimited

    // Features
    'out_of_cycle': { GRINDER: false, STRATEGIST: true, EXECUTIVE: true },
    'sandbox_simulator': { GRINDER: false, STRATEGIST: true, EXECUTIVE: true },
    'vault_basic': { GRINDER: false, STRATEGIST: true, EXECUTIVE: true },
    'vault_premium': { GRINDER: false, STRATEGIST: false, EXECUTIVE: true },
    'whatsapp_direct': { GRINDER: false, STRATEGIST: false, EXECUTIVE: true },

    // Support
    'email_support': { GRINDER: false, STRATEGIST: '48h', EXECUTIVE: '4h' },
};

// Tier hierarchy for upgrade prompts
const TIER_UPGRADE: Record<Tier, Tier | null> = {
    GRINDER: 'STRATEGIST',
    STRATEGIST: 'EXECUTIVE',
    EXECUTIVE: null
};

interface PaywallContextType {
    currentTier: Tier;
    setCurrentTier: (tier: Tier) => void;
    canAccess: (feature: string) => boolean;
    getFeatureValue: (feature: string) => boolean | number | string;
    requireFeature: (feature: string, onBlocked?: (upgradeTo: Tier) => void) => boolean;
    getUpgradeTier: () => Tier | null;
    isAdmin: boolean;
}

const PaywallContext = createContext<PaywallContextType | undefined>(undefined);

// Admin emails
const ADMIN_EMAILS = ['lolinsolito@gmail.com', 'admin@luminel.io'];

interface PaywallProviderProps {
    children: ReactNode;
    initialTier?: Tier;
    userEmail?: string;
}

export const PaywallProvider: React.FC<PaywallProviderProps> = ({
    children,
    initialTier = 'GRINDER',
    userEmail = ''
}) => {
    const [currentTier, setCurrentTier] = useState<Tier>(initialTier);
    const isAdmin = ADMIN_EMAILS.includes(userEmail.toLowerCase());

    // Check if user can access a feature
    const canAccess = (feature: string): boolean => {
        // Admin bypasses all restrictions
        if (isAdmin) return true;

        const value = FEATURE_MATRIX[feature]?.[currentTier];
        if (typeof value === 'boolean') return value;
        if (typeof value === 'number') return value !== 0;
        if (typeof value === 'string') return true;
        return false;
    };

    // Get the raw feature value
    const getFeatureValue = (feature: string): boolean | number | string => {
        if (isAdmin) {
            // Admin gets max values
            const execValue = FEATURE_MATRIX[feature]?.EXECUTIVE;
            return execValue ?? true;
        }
        return FEATURE_MATRIX[feature]?.[currentTier] ?? false;
    };

    // Require a feature - returns true if accessible, calls onBlocked if not
    const requireFeature = (feature: string, onBlocked?: (upgradeTo: Tier) => void): boolean => {
        if (canAccess(feature)) return true;

        const upgradeTo = TIER_UPGRADE[currentTier];
        if (onBlocked && upgradeTo) {
            onBlocked(upgradeTo);
        }
        return false;
    };

    // Get the next tier for upgrade
    const getUpgradeTier = (): Tier | null => {
        return TIER_UPGRADE[currentTier];
    };

    return (
        <PaywallContext.Provider value={{
            currentTier,
            setCurrentTier,
            canAccess,
            getFeatureValue,
            requireFeature,
            getUpgradeTier,
            isAdmin
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

// HOC for protecting components
export const withPaywall = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    requiredFeature: string
) => {
    return (props: P & { onBlocked?: () => void }) => {
        const { canAccess } = usePaywall();

        if (!canAccess(requiredFeature)) {
            return (
                <div className="relative">
                    <div className="absolute inset-0 bg-corp-onyx/80 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="text-center p-6">
                            <div className="text-corp-gold text-sm font-mono mb-2">🔒 FEATURE LOCKED</div>
                            <button className="px-4 py-2 bg-corp-gold text-corp-onyx text-xs font-bold uppercase">
                                Upgrade to Access
                            </button>
                        </div>
                    </div>
                    <div className="blur-sm pointer-events-none">
                        <WrappedComponent {...props} />
                    </div>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };
};

// Feature names export for consistency
export const FEATURES = {
    NEURAL_CODEX: 'neural_codex',
    NEURAL_CODEX_FULL: 'neural_codex_full',
    AI_UNLIMITED: 'ai_unlimited',
    AI_PRIORITY: 'ai_priority',
    AI_DAILY_LIMIT: 'ai_daily_limit',
    OUT_OF_CYCLE: 'out_of_cycle',
    SANDBOX_SIMULATOR: 'sandbox_simulator',
    VAULT_BASIC: 'vault_basic',
    VAULT_PREMIUM: 'vault_premium',
    WHATSAPP_DIRECT: 'whatsapp_direct',
    EMAIL_SUPPORT: 'email_support',
} as const;

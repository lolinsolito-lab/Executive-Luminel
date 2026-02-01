import { UserProfile } from '../types';

export const hasAccess = (user: UserProfile, feature: string): boolean => {
    // 1. Check Granular Permissions (The "Spec Ops" clause)
    if (user.permissions && user.permissions[feature] === true) {
        return true;
    }

    // 2. Check Tier Levels (The "Rank" clause)
    switch (user.subscription) {
        case 'EXECUTIVE':
        case 'PARTNER' as any: // Future proofing
            return true; // God mode

        case 'STRATEGIST':
            // Strategist gets most tools, but maybe not deep intel
            if (feature === 'codex') return true;
            if (feature === 'vault') return true; // Basic vault
            if (feature === 'cv_tool') return true;
            return false;

        case 'GRINDER':
        default:
            // Free tier gets almost nothing but can view the Shop Window (Vault) and basic Laws
            if (feature === 'command') return true;
            if (feature === 'vault') return true; // View locked items
            if (feature === 'codex') return true; // View basic laws
            if (feature === 'blackbook') return true; // Start profiling
            return false;
    }
};

import React from 'react';
import { X, Lock, CheckCircle, Shield, Crown, Target, Zap } from 'lucide-react';

interface HierarchyModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentTier: string;
}

// V7 PHOENIX - CORPORATE LADDER Modal
export const HierarchyModal: React.FC<HierarchyModalProps> = ({ isOpen, onClose, currentTier }) => {
    if (!isOpen) return null;

    // Map tier letter to position
    const getTierPosition = (tier: string): number => {
        const map: { [key: string]: number } = {
            'A1': 0, 'A2': 0, 'A3': 0, 'A4': 0,
            'B1': 1, 'B2': 1,
            'C1': 2, 'C2': 2,
            'D': 3,
            'F': 4
        };
        return map[tier] ?? 1;
    };

    const currentPosition = getTierPosition(currentTier);

    const tiers = [
        {
            id: 'A',
            name: 'IL SOLDATO',
            subtitle: 'Tier A - Entry Level',
            desc: 'Esecuzione pura. Zero leva politica.',
            icon: CheckCircle,
            position: 0,
            bgClass: 'bg-emerald-50',
            borderClass: 'border-emerald-300',
            iconColor: 'text-emerald-500',
        },
        {
            id: 'B',
            name: 'IL MAESTRO',
            subtitle: 'Tier B - Specialist',
            desc: 'Alta competenza tecnica. Rischio: stagnazione.',
            icon: Shield,
            position: 1,
            bgClass: 'bg-blue-50',
            borderClass: 'border-blue-400',
            iconColor: 'text-blue-500',
        },
        {
            id: 'C',
            name: 'IL GENERALE',
            subtitle: 'Tier C - Management',
            desc: 'Leva strategica. Responsabilità P&L.',
            icon: Target,
            position: 2,
            bgClass: 'bg-purple-50',
            borderClass: 'border-purple-300',
            iconColor: 'text-purple-500',
        },
        {
            id: 'D',
            name: 'IL DIRETTORE',
            subtitle: 'Tier D - Director',
            desc: 'Guida divisionale. Accesso al board.',
            icon: Zap,
            position: 3,
            bgClass: 'bg-gray-50',
            borderClass: 'border-gray-300',
            iconColor: 'text-gray-400',
        },
        {
            id: 'F',
            name: 'IL PARTNER',
            subtitle: 'Tier F - Partner/C-Level',
            desc: 'Proprietà e controllo totale.',
            icon: Crown,
            position: 4,
            bgClass: 'bg-amber-50',
            borderClass: 'border-phoenix-gold',
            iconColor: 'text-phoenix-gold',
        },
    ];

    // Reverse for visual ladder (F at top, A at bottom)
    const tiersReversed = [...tiers].reverse();

    const getStatus = (position: number) => {
        if (position < currentPosition) return 'completed';
        if (position === currentPosition) return 'current';
        if (position === currentPosition + 1) return 'next';
        return 'locked';
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-phoenix-ink/40 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white border border-gray-200 w-full max-w-lg rounded-sm shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-display font-bold text-phoenix-ink text-lg tracking-widest">LA SCALA DEL POTERE</h2>
                            <p className="font-sans text-[10px] text-phoenix-gold mt-1 uppercase tracking-widest font-bold">Corporate Ladder</p>
                        </div>
                        <button onClick={onClose} className="text-phoenix-ghost hover:text-phoenix-ink transition-colors p-2 hover:bg-gray-100 rounded-sm">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Ladder Visual */}
                <div className="p-5 bg-phoenix-snow max-h-[60vh] overflow-y-auto">

                    {/* Vertical Connector */}
                    <div className="relative">
                        <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-phoenix-gold via-gray-300 to-emerald-400"></div>

                        <div className="space-y-4">
                            {tiersReversed.map((tier) => {
                                const status = getStatus(tier.position);
                                const isCurrent = status === 'current';
                                const isCompleted = status === 'completed';
                                const isNext = status === 'next';
                                const isLocked = status === 'locked';

                                return (
                                    <div
                                        key={tier.id}
                                        className={`relative flex items-center gap-4 p-4 rounded-sm border transition-all ${isCurrent
                                                ? `${tier.bgClass} ${tier.borderClass} border-2 shadow-md`
                                                : isCompleted
                                                    ? `${tier.bgClass} ${tier.borderClass} opacity-60`
                                                    : isNext
                                                        ? `bg-white ${tier.borderClass} border-dashed`
                                                        : 'bg-gray-50 border-gray-200 opacity-40'
                                            }`}
                                    >
                                        {/* Icon */}
                                        <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 ${isCurrent
                                                ? `${tier.borderClass} bg-white shadow-sm`
                                                : isCompleted
                                                    ? `${tier.borderClass} bg-white`
                                                    : 'border-gray-300 bg-white'
                                            }`}>
                                            {isLocked ? (
                                                <Lock size={18} className="text-gray-300" />
                                            ) : (
                                                <tier.icon size={18} className={tier.iconColor} />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h3 className={`font-display font-bold text-sm ${isLocked ? 'text-gray-400' : 'text-phoenix-ink'}`}>
                                                    {tier.name}
                                                </h3>
                                                {isCurrent && (
                                                    <span className="font-sans text-[9px] bg-phoenix-navy text-white px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                                                        Sei Qui
                                                    </span>
                                                )}
                                                {isNext && (
                                                    <span className="font-sans text-[9px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                                                        Obiettivo
                                                    </span>
                                                )}
                                                {isCompleted && (
                                                    <span className="font-sans text-[9px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                                                        ✓
                                                    </span>
                                                )}
                                            </div>
                                            <p className="font-sans text-[10px] text-phoenix-ghost uppercase tracking-wider mb-1">{tier.subtitle}</p>
                                            <p className="font-sans text-xs text-phoenix-ghost leading-relaxed">{tier.desc}</p>
                                        </div>

                                        {/* Tier Letter */}
                                        <div className={`font-display text-3xl font-bold ${isLocked ? 'text-gray-200' : 'text-gray-300'}`}>
                                            {tier.id}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-white border-t border-gray-100 text-center">
                    <p className="font-sans text-[10px] text-phoenix-ghost uppercase tracking-widest">
                        La prossima promozione è tua. <span className="text-phoenix-gold font-bold">Preparala.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

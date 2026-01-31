import React from 'react';
import { X, Lock, CheckCircle, Shield, Crown, TrendingUp } from 'lucide-react';

interface HierarchyModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentTier: string; // 'B1' usually
}

export const HierarchyModal: React.FC<HierarchyModalProps> = ({ isOpen, onClose, currentTier }) => {
    if (!isOpen) return null;

    const tiers = [
        {
            id: 'A',
            name: 'THE GRINDER',
            status: 'COMPLETED',
            desc: 'Pure execution. Low leverage.',
            icon: CheckCircle,
            color: 'text-emerald-500',
            bg: 'bg-emerald-900/10',
            border: 'border-emerald-500/30'
        },
        {
            id: 'B',
            name: 'THE SPECIALIST',
            sub: 'TIER B1',
            status: 'CURRENT',
            desc: 'High technical skill. Risk: Stagnation.',
            icon: Shield,
            color: 'text-corp-blue',
            bg: 'bg-corp-blue/10',
            border: 'border-corp-blue/50'
        },
        {
            id: 'C',
            name: 'THE OFFICER',
            status: 'LOCKED',
            desc: 'Strategic leverage. Revenue generation.',
            icon: Lock,
            color: 'text-corp-silver',
            bg: 'bg-white/5',
            border: 'border-white/10'
        },
        {
            id: 'F',
            name: 'THE PARTNER',
            status: 'GOD MODE',
            desc: 'Total equity ownership.',
            icon: Crown,
            color: 'text-corp-gold',
            bg: 'bg-corp-gold/5',
            border: 'border-corp-gold/20'
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-corp-bg border border-corp-border w-full max-w-lg rounded-sm shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="p-6 border-b border-corp-border bg-corp-onyx">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-display font-bold text-corp-platinum text-xl tracking-widest">CORPORATE LADDER</h2>
                            <p className="font-mono text-[10px] text-corp-silver mt-1">YOUR PATH TO POWER</p>
                        </div>
                        <button onClick={onClose} className="text-corp-silver hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4 bg-corp-onyx/95">
                    {tiers.map((tier) => (
                        <div key={tier.id} className={`p-4 rounded-sm border ${tier.border} ${tier.bg} flex items-center gap-4 transition-all hover:bg-opacity-20`}>
                            <div className={`w-10 h-10 rounded-sm flex items-center justify-center border ${tier.border} bg-black/20`}>
                                <tier.icon className={tier.color} size={20} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className={`font-display font-bold text-sm ${tier.color}`}>{tier.name}</h3>
                                    {tier.status === 'CURRENT' && (
                                        <span className="font-mono text-[9px] bg-corp-blue text-white px-2 py-0.5 rounded-sm animate-pulse">
                                            ACTIVE
                                        </span>
                                    )}
                                </div>
                                <p className="font-mono text-xs text-corp-silver/80 leading-relaxed">{tier.desc}</p>
                            </div>
                            <div className="font-mono text-2xl font-bold opacity-20 text-white">
                                {tier.id}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 bg-black/40 border-t border-white/5 text-center">
                    <p className="font-mono text-[10px] text-corp-silver">NEXT REVIEW: 14 MONTHS</p>
                </div>
            </div>
        </div>
    );
};

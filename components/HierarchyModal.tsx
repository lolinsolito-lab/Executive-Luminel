import React from 'react';
import { X, Lock, CheckCircle, Shield, Crown, TrendingUp } from 'lucide-react';

interface HierarchyModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentTier: string;
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
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            border: 'border-emerald-300'
        },
        {
            id: 'B',
            name: 'THE SPECIALIST',
            sub: 'TIER B1',
            status: 'CURRENT',
            desc: 'High technical skill. Risk: Stagnation.',
            icon: Shield,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-300'
        },
        {
            id: 'C',
            name: 'THE OFFICER',
            status: 'LOCKED',
            desc: 'Strategic leverage. Revenue generation.',
            icon: Lock,
            color: 'text-gray-400',
            bg: 'bg-gray-50',
            border: 'border-gray-200'
        },
        {
            id: 'F',
            name: 'THE PARTNER',
            status: 'GOD MODE',
            desc: 'Total equity ownership.',
            icon: Crown,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            border: 'border-amber-300'
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white border border-amber-200 w-full max-w-lg rounded-sm shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="p-5 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-display font-bold text-gray-900 text-lg tracking-widest">CORPORATE LADDER</h2>
                            <p className="font-mono text-[10px] text-amber-600 mt-1 uppercase tracking-wider">Your Path to Power</p>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors p-1 hover:bg-gray-100 rounded">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3 bg-[#F9F8F2] max-h-[60vh] overflow-y-auto">
                    {tiers.map((tier) => (
                        <div key={tier.id} className={`p-4 rounded-sm border ${tier.border} ${tier.bg} flex items-center gap-4 transition-all hover:shadow-md`}>
                            <div className={`w-10 h-10 rounded-sm flex items-center justify-center border ${tier.border} bg-white`}>
                                <tier.icon className={tier.color} size={20} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className={`font-display font-bold text-sm ${tier.color}`}>{tier.name}</h3>
                                    {tier.status === 'CURRENT' && (
                                        <span className="font-mono text-[9px] bg-blue-500 text-white px-2 py-0.5 rounded-sm">
                                            ACTIVE
                                        </span>
                                    )}
                                    {tier.status === 'LOCKED' && (
                                        <span className="font-mono text-[9px] bg-gray-200 text-gray-500 px-2 py-0.5 rounded-sm">
                                            LOCKED
                                        </span>
                                    )}
                                </div>
                                <p className="font-mono text-xs text-gray-600 leading-relaxed">{tier.desc}</p>
                            </div>
                            <div className="font-mono text-2xl font-bold text-gray-200">
                                {tier.id}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 bg-white border-t border-amber-100 text-center">
                    <p className="font-mono text-[10px] text-gray-500">NEXT REVIEW: 14 MONTHS</p>
                </div>
            </div>
        </div>
    );
};

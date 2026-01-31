import React from 'react';
import { StrategyCard as StrategyCardType } from '../../data/neural-codex';
import { BookOpen, Zap, Shield, Crown, Sparkles } from 'lucide-react';

interface StrategyCardProps {
    card: StrategyCardType;
    onApply?: () => void;
}

const sourceIcons = {
    power: Crown,
    habits: Zap,
    psychology: Shield,
    ceo: Sparkles,
    ikigai: BookOpen
};

const sourceColors = {
    power: { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-300', icon: 'text-amber-600' },
    habits: { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-300', icon: 'text-emerald-600' },
    psychology: { text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-300', icon: 'text-rose-600' },
    ceo: { text: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-300', icon: 'text-purple-600' },
    ikigai: { text: 'text-cyan-700', bg: 'bg-cyan-50', border: 'border-cyan-300', icon: 'text-cyan-600' }
};

export const StrategyCardComponent: React.FC<StrategyCardProps> = ({ card, onApply }) => {
    const Icon = sourceIcons[card.source];
    const colors = sourceColors[card.source];

    return (
        <div className={`
            relative overflow-hidden
            bg-white
            border ${colors.border} rounded-sm
            p-6 space-y-4
            shadow-lg
            animate-fade-in
        `}>
            {/* Source Badge */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className={`p-2.5 ${colors.bg} border ${colors.border} rounded-sm ${colors.icon} shadow-sm`}>
                        <Icon size={18} />
                    </div>
                    <div>
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                            {card.sourceName}
                        </div>
                        {card.lawNumber && (
                            <div className={`text-sm font-bold ${colors.text}`}>
                                Legge #{card.lawNumber}
                            </div>
                        )}
                    </div>
                </div>

                {/* Tier Badge */}
                <span className={`
                    text-[9px] font-mono px-2.5 py-1 rounded-sm uppercase tracking-widest font-bold
                    ${card.tier === 'EXECUTIVE' ? 'bg-amber-100 text-amber-700 border border-amber-300' :
                        card.tier === 'STRATEGIST' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                            'bg-gray-100 text-gray-600 border border-gray-200'}
                `}>
                    {card.tier}
                </span>
            </div>

            {/* Card Content */}
            <div className="space-y-3">
                <h3 className="text-xl font-display font-bold text-gray-900">
                    {card.title}
                </h3>
                <p className="text-sm font-mono text-gray-600 italic">
                    "{card.subtitle}"
                </p>

                {/* Action Box */}
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-sm shadow-inner">
                    <div className="text-[10px] font-mono text-amber-700 uppercase tracking-widest mb-2 font-bold">
                        AZIONE CONSIGLIATA
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">
                        {card.action}
                    </p>
                </div>
            </div>

            {/* Impact */}
            <div className="flex gap-6 pt-3 border-t border-gray-200">
                {card.impact.performance && (
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Performance:</span>
                        <span className="text-emerald-600 font-bold">+{card.impact.performance}</span>
                    </div>
                )}
                {card.impact.capital && (
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Capital:</span>
                        <span className="text-amber-600 font-bold">+{card.impact.capital}</span>
                    </div>
                )}
            </div>

            {/* Apply Button */}
            {onApply && (
                <button
                    onClick={onApply}
                    className="w-full py-3 bg-amber-500 text-white text-sm font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors rounded-sm shadow-md"
                >
                    Applica Strategia
                </button>
            )}
        </div>
    );
};

export default StrategyCardComponent;

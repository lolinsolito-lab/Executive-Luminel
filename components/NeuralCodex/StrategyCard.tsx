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
    power: 'text-amber-600',
    habits: 'text-emerald-600',
    psychology: 'text-rose-500',
    ceo: 'text-purple-600',
    ikigai: 'text-cyan-600'
};

const sourceBgColors = {
    power: 'from-amber-100',
    habits: 'from-emerald-100',
    psychology: 'from-rose-100',
    ceo: 'from-purple-100',
    ikigai: 'from-cyan-100'
};

export const StrategyCardComponent: React.FC<StrategyCardProps> = ({ card, onApply }) => {
    const Icon = sourceIcons[card.source];
    const textColor = sourceColors[card.source];
    const bgGradient = sourceBgColors[card.source];

    return (
        <div className={`
      relative overflow-hidden
      bg-gradient-to-br ${bgGradient} to-white
      border border-amber-200 rounded-sm
      p-5 space-y-4
      hover:border-amber-400 transition-all duration-300
      hover:shadow-lg
      animate-fade-in
    `}>
            {/* Source Badge */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <div className={`p-2 bg-white border border-gray-200 rounded-sm ${textColor} shadow-sm`}>
                        <Icon size={16} />
                    </div>
                    <div>
                        <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                            {card.sourceName}
                        </div>
                        {card.lawNumber && (
                            <div className={`text-xs font-bold ${textColor}`}>
                                Legge #{card.lawNumber}
                            </div>
                        )}
                    </div>
                </div>

                {/* Tier Badge */}
                <span className={`
          text-[8px] font-mono px-2 py-1 rounded-sm uppercase tracking-widest
          ${card.tier === 'EXECUTIVE' ? 'bg-amber-100 text-amber-700 border border-amber-300' :
                        card.tier === 'STRATEGIST' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                            'bg-gray-100 text-gray-600 border border-gray-200'}
        `}>
                    {card.tier}
                </span>
            </div>

            {/* Card Content */}
            <div className="space-y-3">
                <h3 className="text-lg font-display font-bold text-gray-900">
                    {card.title}
                </h3>
                <p className="text-xs font-mono text-gray-600 italic">
                    "{card.subtitle}"
                </p>

                {/* Action */}
                <div className="bg-amber-50 border-l-2 border-amber-400 p-4 rounded-r-sm">
                    <div className="text-[9px] font-mono text-amber-600 uppercase tracking-widest mb-2 font-bold">
                        AZIONE CONSIGLIATA
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">
                        {card.action}
                    </p>
                </div>
            </div>

            {/* Impact */}
            <div className="flex gap-4 pt-2 border-t border-amber-100">
                {card.impact.performance && (
                    <div className="flex items-center gap-1 text-xs">
                        <span className="text-gray-500">Performance:</span>
                        <span className="text-emerald-600 font-bold">+{card.impact.performance}</span>
                    </div>
                )}
                {card.impact.capital && (
                    <div className="flex items-center gap-1 text-xs">
                        <span className="text-gray-500">Capital:</span>
                        <span className="text-amber-600 font-bold">+{card.impact.capital}</span>
                    </div>
                )}
            </div>

            {/* Apply Button */}
            {onApply && (
                <button
                    onClick={onApply}
                    className="w-full mt-2 py-2.5 bg-amber-500 text-white text-xs font-mono uppercase tracking-widest hover:bg-amber-600 transition-colors rounded-sm shadow-md"
                >
                    Applica Strategia
                </button>
            )}
        </div>
    );
};

export default StrategyCardComponent;

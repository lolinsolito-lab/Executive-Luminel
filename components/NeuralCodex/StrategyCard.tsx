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
    power: 'text-corp-gold',
    habits: 'text-emerald-400',
    psychology: 'text-red-400',
    ceo: 'text-purple-400',
    ikigai: 'text-cyan-400'
};

const sourceBgColors = {
    power: 'from-corp-gold/20',
    habits: 'from-emerald-500/20',
    psychology: 'from-red-500/20',
    ceo: 'from-purple-500/20',
    ikigai: 'from-cyan-500/20'
};

export const StrategyCardComponent: React.FC<StrategyCardProps> = ({ card, onApply }) => {
    const Icon = sourceIcons[card.source];
    const textColor = sourceColors[card.source];
    const bgGradient = sourceBgColors[card.source];

    return (
        <div className={`
      relative overflow-hidden
      bg-gradient-to-br ${bgGradient} to-transparent
      border border-corp-border rounded-sm
      p-6 space-y-4
      hover:border-corp-gold/50 transition-all duration-300
      hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]
      animate-fade-in
    `}>
            {/* Source Badge */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <div className={`p-2 bg-corp-bg border border-corp-border rounded-sm ${textColor}`}>
                        <Icon size={16} />
                    </div>
                    <div>
                        <div className="text-[9px] font-mono text-corp-silver uppercase tracking-widest">
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
          ${card.tier === 'EXECUTIVE' ? 'bg-corp-gold/20 text-corp-gold border border-corp-gold/30' :
                        card.tier === 'STRATEGIST' ? 'bg-corp-blue/20 text-corp-blue border border-corp-blue/30' :
                            'bg-corp-silver/20 text-corp-silver border border-corp-silver/30'}
        `}>
                    {card.tier}
                </span>
            </div>

            {/* Card Content */}
            <div className="space-y-3">
                <h3 className="text-lg font-display font-bold text-corp-platinum">
                    {card.title}
                </h3>
                <p className="text-xs font-mono text-corp-silver italic">
                    "{card.subtitle}"
                </p>

                {/* Action */}
                <div className="bg-corp-bg/60 border-l-2 border-corp-gold p-4 rounded-r-sm">
                    <div className="text-[9px] font-mono text-corp-gold uppercase tracking-widest mb-2">
                        AZIONE CONSIGLIATA
                    </div>
                    <p className="text-sm text-corp-platinum/90 leading-relaxed">
                        {card.action}
                    </p>
                </div>
            </div>

            {/* Impact */}
            <div className="flex gap-4 pt-2 border-t border-corp-border">
                {card.impact.performance && (
                    <div className="flex items-center gap-1 text-xs">
                        <span className="text-corp-silver">Performance:</span>
                        <span className="text-emerald-400 font-bold">+{card.impact.performance}</span>
                    </div>
                )}
                {card.impact.capital && (
                    <div className="flex items-center gap-1 text-xs">
                        <span className="text-corp-silver">Capital:</span>
                        <span className="text-corp-gold font-bold">+{card.impact.capital}</span>
                    </div>
                )}
            </div>

            {/* Apply Button */}
            {onApply && (
                <button
                    onClick={onApply}
                    className="w-full mt-2 py-2 bg-corp-gold/10 border border-corp-gold/30 text-corp-gold text-xs font-mono uppercase tracking-widest hover:bg-corp-gold/20 transition-colors"
                >
                    Applica Strategia
                </button>
            )}
        </div>
    );
};

export default StrategyCardComponent;

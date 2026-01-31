import React, { useState, useEffect } from 'react';
import { getDailyCard, StrategyCard } from '../../data/neural-codex';
import { StrategyCardComponent } from './StrategyCard';
import { BookOpen, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface DailyBriefingProps {
    userTier: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE';
}

export const DailyBriefing: React.FC<DailyBriefingProps> = ({ userTier }) => {
    const [card, setCard] = useState<StrategyCard | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const dailyCard = getDailyCard(userTier);
        setCard(dailyCard);
    }, [userTier]);

    if (!card) return null;

    return (
        <div className="space-y-3">
            {/* Header */}
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between cursor-pointer group"
            >
                <div className="flex items-center gap-2 text-[10px] font-mono text-corp-gold uppercase tracking-widest">
                    <BookOpen size={12} />
                    <span>Daily Intel</span>
                    <Sparkles size={10} className="animate-pulse" />
                </div>
                <button className="p-1 hover:bg-white/5 rounded transition-colors">
                    {isExpanded ? (
                        <ChevronUp size={14} className="text-corp-silver" />
                    ) : (
                        <ChevronDown size={14} className="text-corp-silver" />
                    )}
                </button>
            </div>

            {/* Collapsed Preview */}
            {!isExpanded && (
                <div
                    onClick={() => setIsExpanded(true)}
                    className="bg-gradient-to-r from-corp-gold/5 to-transparent border-l-2 border-corp-gold p-3 cursor-pointer hover:border-l-4 transition-all"
                >
                    <div className="text-[9px] font-mono text-corp-silver mb-1">
                        {card.sourceName} {card.lawNumber && `• Legge #${card.lawNumber}`}
                    </div>
                    <p className="text-xs text-corp-platinum font-medium line-clamp-2">
                        {card.title}
                    </p>
                    <div className="text-[9px] text-corp-gold mt-2">
                        Clicca per espandere →
                    </div>
                </div>
            )}

            {/* Expanded Card Modal Overlay */}
            {isExpanded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setIsExpanded(false)}>
                    <div className="max-w-md w-full" onClick={e => e.stopPropagation()}>
                        <StrategyCardComponent
                            card={card}
                            onApply={() => {
                                console.log('Strategy applied:', card.id);
                                setIsExpanded(false);
                            }}
                        />
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="mt-4 w-full py-2 text-[10px] font-mono uppercase text-corp-silver hover:text-white transition-colors"
                        >
                            Close Briefing
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DailyBriefing;

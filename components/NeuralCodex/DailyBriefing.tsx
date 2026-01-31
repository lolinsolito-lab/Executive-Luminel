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
        <div className="space-y-2">
            {/* Header */}
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between cursor-pointer group"
            >
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-amber-600 uppercase tracking-widest font-bold">
                    <BookOpen size={10} />
                    <span>Daily Intel</span>
                    <Sparkles size={9} className="animate-pulse text-amber-400" />
                </div>
                <button className="p-1 hover:bg-amber-50 rounded transition-colors">
                    {isExpanded ? (
                        <ChevronUp size={12} className="text-gray-400" />
                    ) : (
                        <ChevronDown size={12} className="text-gray-400" />
                    )}
                </button>
            </div>

            {/* Collapsed Preview */}
            {!isExpanded && (
                <div
                    onClick={() => setIsExpanded(true)}
                    className="bg-amber-50 border-l-2 border-amber-400 p-2 cursor-pointer hover:border-l-4 transition-all rounded-r-sm"
                >
                    <div className="text-[8px] font-mono text-gray-500 mb-0.5">
                        {card.sourceName} {card.lawNumber && `• Legge #${card.lawNumber}`}
                    </div>
                    <p className="text-[10px] text-gray-800 font-medium line-clamp-2">
                        {card.title}
                    </p>
                    <div className="text-[8px] text-amber-600 mt-1 font-bold">
                        Clicca per espandere →
                    </div>
                </div>
            )}

            {/* Expanded Card Modal Overlay */}
            {isExpanded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setIsExpanded(false)}>
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
                            className="mt-3 w-full py-2 text-[10px] font-mono uppercase text-gray-500 hover:text-gray-800 bg-white border border-gray-200 rounded-sm transition-colors shadow-sm"
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

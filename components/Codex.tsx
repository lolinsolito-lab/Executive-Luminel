import React, { useState } from 'react';
import { CodexLaw, UserProfile } from '../types';
import { CODEX_LAWS } from '../data/codexData';
import { BookOpen, ChevronRight, Lock, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface CodexProps {
    user?: UserProfile; // Optional to not break old usage immediately, but recommended
    onOpenUpgrade?: (feature: string) => void;
}

export const Codex: React.FC<CodexProps> = ({ user, onOpenUpgrade }) => {
    const [selectedLaw, setSelectedLaw] = useState<CodexLaw | null>(null);

    // TIER LOGIC
    const userTierValue = {
        'GRINDER': 0, // Analyst
        'STRATEGIST': 1, // Strategist
        'EXECUTIVE': 2 // Executive
    }[user?.subscription || 'GRINDER'] || 0;

    const getRequiredTierValue = (tier: string) => {
        switch (tier) {
            case 'GRINDER': return 0;
            case 'STRATEGIST': return 1;
            case 'EXECUTIVE': return 2;
            default: return 99;
        }
    };

    const isUnlocked = (lawTier: string) => {
        return userTierValue >= getRequiredTierValue(lawTier);
    };

    const handleLawClick = (law: CodexLaw) => {
        if (isUnlocked(law.min_tier)) {
            setSelectedLaw(law);
        } else {
            // Trigger Upgrade
            if (onOpenUpgrade) onOpenUpgrade(`Unlock: ${law.title}`);
            else alert("Upgrade required to access this Law.");
        }
    };

    return (
        <div className="h-full flex bg-phoenix-canvas text-phoenix-ink animate-fade-in overflow-hidden">
            {/* LEFT: LIST */}
            <div className={`${selectedLaw ? 'hidden md:flex' : 'flex'} w-full md:w-1/3 flex-col border-r border-gray-100 bg-phoenix-snow`}>
                <div className="p-6 border-b border-gray-100">
                    <h2 className="font-display font-bold text-xl text-phoenix-navy tracking-widest uppercase flex items-center gap-3">
                        <BookOpen className="text-phoenix-gold" /> Il Codex
                    </h2>
                    <p className="text-xs text-phoenix-ghost mt-1 font-serif italic">Le Leggi Immutabili del Potere.</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {CODEX_LAWS.map((law) => {
                        const unlocked = isUnlocked(law.min_tier);
                        return (
                            <div
                                key={law.id}
                                onClick={() => handleLawClick(law)}
                                className={`
                                    p-5 border-b border-gray-100 cursor-pointer transition-all group relative overflow-hidden
                                    ${selectedLaw?.id === law.id ? 'bg-white border-l-4 border-l-phoenix-gold' : 'border-l-4 border-l-transparent hover:bg-white'}
                                `}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-phoenix-gold">{law.category}</span>
                                    {!unlocked && <Lock size={12} className="text-gray-400" />}
                                </div>
                                <h3 className={`font-display font-bold text-lg mb-1 transition-colors ${selectedLaw?.id === law.id ? 'text-phoenix-gold' : 'text-phoenix-navy'} ${!unlocked ? 'opacity-70' : ''}`}>
                                    {law.title}
                                </h3>
                                <p className={`font-serif text-xs text-phoenix-ghost line-clamp-2 leading-relaxed ${!unlocked ? 'blur-[3px] select-none opacity-50' : ''}`}>
                                    {law.description}
                                </p>

                                {!unlocked && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-[1px]">
                                        <div className="bg-phoenix-gold text-white text-[9px] font-bold uppercase px-2 py-1 rounded-sm shadow-sm">
                                            {law.min_tier === 'EXECUTIVE' ? 'Executive Only' : 'Strategist Only'}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* RIGHT: CONTENT (Reader) */}
            <div className={`${selectedLaw ? 'flex' : 'hidden md:flex'} w-full md:w-2/3 flex-col bg-phoenix-canvas relative`}>
                {selectedLaw ? (
                    <>
                        <div className="p-6 md:p-10 flex-1 overflow-y-auto custom-scrollbar">
                            <button
                                onClick={() => setSelectedLaw(null)}
                                className="md:hidden mb-4 text-xs font-bold uppercase tracking-widest text-phoenix-ghost flex items-center gap-1"
                            >
                                ← Torna all'Indice
                            </button>

                            <div className="max-w-2xl mx-auto">
                                <div className="mb-8 text-center">
                                    <span className="inline-block px-3 py-1 mb-4 border border-phoenix-gold/30 text-phoenix-gold text-[10px] font-bold uppercase tracking-[0.3em] rounded-full">
                                        {selectedLaw.category}
                                    </span>
                                    <h1 className="font-display font-bold text-3xl md:text-4xl text-phoenix-navy mb-4 leading-tight">
                                        {selectedLaw.title}
                                    </h1>
                                    <div className="h-1 w-20 bg-phoenix-gold mx-auto rounded-full"></div>
                                </div>

                                <div className="prose prose-sm md:prose-base prose-slate font-serif text-phoenix-ink leading-loose">
                                    <ReactMarkdown>{selectedLaw.content}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-phoenix-ghost/50">
                        <BookOpen size={64} strokeWidth={1} className="mb-4 opacity-20" />
                        <p className="font-display text-sm tracking-widest uppercase">Seleziona una Legge da Studiare</p>
                    </div>
                )}
            </div>
        </div>
    );
};

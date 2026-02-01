import React, { useState } from 'react';
import { CodexLaw } from '../types';
import { CODEX_LAWS } from '../data/codexData';
import { BookOpen, ChevronRight, Lock, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const Codex: React.FC = () => {
    const [selectedLaw, setSelectedLaw] = useState<CodexLaw | null>(null);

    return (
        <div className="h-full flex bg-phoenix-canvas text-phoenix-ink animate-fade-in overflow-hidden">
            {/* LEFT: LIST */}
            <div className={`${selectedLaw ? 'hidden md:flex' : 'flex'} w-full md:w-1/3 flex-col border-r border-gray-100 bg-phoenix-snow`}>
                <div className="p-6 border-b border-gray-100">
                    <h2 className="font-display font-bold text-xl text-phoenix-navy tracking-widest uppercase flex items-center gap-3">
                        <BookOpen className="text-phoenix-gold" /> The Codex
                    </h2>
                    <p className="text-xs text-phoenix-ghost mt-1 font-serif italic">The Immutable Laws of Power.</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {CODEX_LAWS.map((law) => (
                        <div
                            key={law.id}
                            onClick={() => setSelectedLaw(law)}
                            className={`p-5 border-b border-gray-100 cursor-pointer transition-all hover:bg-white group ${selectedLaw?.id === law.id ? 'bg-white border-l-4 border-l-phoenix-gold' : 'border-l-4 border-l-transparent'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-phoenix-gold">{law.category}</span>
                                {law.isLocked && <Lock size={12} className="text-gray-400" />}
                            </div>
                            <h3 className={`font-display font-bold text-lg mb-1 group-hover:text-phoenix-gold transition-colors ${selectedLaw?.id === law.id ? 'text-phoenix-gold' : 'text-phoenix-navy'}`}>
                                {law.title}
                            </h3>
                            <p className="font-serif text-xs text-phoenix-ghost line-clamp-2 leading-relaxed">
                                {law.description}
                            </p>
                        </div>
                    ))}
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
                                ← Back to Index
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
                        <p className="font-display text-sm tracking-widest uppercase">Select a Law to Study</p>
                    </div>
                )}
            </div>
        </div>
    );
};

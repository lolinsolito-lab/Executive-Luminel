import React from 'react';
import { Target, Zap, Globe, ChevronRight } from 'lucide-react';

export const WeaponSection: React.FC = () => {
    return (
        <section className="relative py-32 bg-phoenix-ink text-white overflow-hidden">

            {/* BACKGROUND: Deep Navy/Gold Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1)_0%,transparent_50%)]"></div>

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-20 space-y-4">
                    <p className="font-sans text-phoenix-gold text-xs uppercase tracking-[0.3em] font-bold">
                        L'ARMA SEGRETA (V7.7)
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                        NON È UN SOFTWARE.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">È UN VANTAGGIO SLEALE.</span>
                    </h2>
                </div>

                {/* SHOWCASE GRID */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* FEATURE 1: MONEY METRIC */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-sm hover:border-phoenix-gold/50 transition-colors group">
                        <div className="w-12 h-12 bg-red-500/10 rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Target className="text-red-500" />
                        </div>
                        <h3 className="font-display text-xl font-bold mb-3 text-white">The Money Metric</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Non ti diciamo "bravo". Ti diciamo: <br />
                            <span className="text-red-400 font-bold">"Stai perdendo €17.000 l'anno restando in questo ruolo."</span>
                        </p>
                        <div className="font-sans text-[10px] uppercase tracking-widest text-phoenix-gold flex items-center gap-2">
                            Il dolore motiva <ChevronRight size={12} />
                        </div>
                    </div>

                    {/* FEATURE 2: PANIC MODE */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-sm hover:border-phoenix-gold/50 transition-colors group">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Zap className="text-amber-500" />
                        </div>
                        <h3 className="font-display text-xl font-bold mb-3 text-white">Panic Mode</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Il capo urla? Clicca un bottone.<br />
                            L'AI genera istantaneamente la risposta che lo disarma e ti fa sembrare un Leader.
                        </p>
                        <div className="font-sans text-[10px] uppercase tracking-widest text-phoenix-gold flex items-center gap-2">
                            Difesa Istantanea <ChevronRight size={12} />
                        </div>
                    </div>

                    {/* FEATURE 3: GLOBAL BRAIN */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-sm hover:border-phoenix-gold/50 transition-colors group">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Globe className="text-blue-400" />
                        </div>
                        <h3 className="font-display text-xl font-bold mb-3 text-white">Global Brain</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Dublino o Milano?<br />
                            L'AI adatta la strategia alla cultura locale. Perché la politica a Londra non funziona a Roma.
                        </p>
                        <div className="font-sans text-[10px] uppercase tracking-widest text-phoenix-gold flex items-center gap-2">
                            Adattamento Culturale <ChevronRight size={12} />
                        </div>
                    </div>

                </div>

                {/* 3D TILT MOCKUP PLACEHOLDER (Visual Anchor) */}
                <div className="mt-24 relative mx-auto max-w-4xl perspective-1000">
                    <div className="relative z-10 bg-phoenix-canvas border border-phoenix-gold/20 rounded-lg shadow-[0_0_100px_rgba(212,175,55,0.2)] p-4 transform rotate-x-12 hover:rotate-x-0 transition-transform duration-1000">
                        {/* Placeholder for the actual app screenshot/demo in high fidelity */}
                        <div className="aspect-video bg-gray-900 rounded-sm flex items-center justify-center border border-gray-800">
                            <span className="font-display text-phoenix-gold tracking-[0.5em] uppercase text-sm animate-pulse">
                                Live Terminal Preview
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

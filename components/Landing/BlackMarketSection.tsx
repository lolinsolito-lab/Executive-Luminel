import React from 'react';
import { Mic, FileText, Linkedin, ShoppingCart } from 'lucide-react';

export const BlackMarketSection: React.FC = () => {
    return (
        <section className="py-24 bg-gray-50 border-y border-gray-200">
            <div className="max-w-6xl mx-auto px-6">

                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl font-bold text-phoenix-ink uppercase tracking-widest">
                        Need an Unfair Advantage?
                    </h2>
                    <p className="mt-4 text-phoenix-ghost font-sans text-sm">
                        Strategie proibite per chi vuole vincere sporco. (No Subscription Required)
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* CARD 1: AUDIO PROFILER */}
                    <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-phoenix-navy/5 rounded-full">
                                <Mic size={24} className="text-phoenix-navy" />
                            </div>
                            <span className="font-sans font-bold text-lg">€9</span>
                        </div>
                        <h3 className="font-display font-bold text-lg mb-2">The Audio Profiler</h3>
                        <p className="text-sm text-gray-500 mb-6 min-h-[40px]">
                            Carica l'audio del tuo capo. Ti diciamo se è narcisista o analitico.
                        </p>
                        <button className="w-full py-2 border border-phoenix-navy text-phoenix-navy font-bold text-xs uppercase tracking-widest hover:bg-phoenix-navy hover:text-white transition-colors flex items-center justify-center gap-2">
                            <ShoppingCart size={14} /> Buy Now
                        </button>
                    </div>

                    {/* CARD 2: CV KILLER */}
                    <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold px-2 py-1 uppercase tracking-wider">
                            Best Seller
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-phoenix-navy/5 rounded-full">
                                <FileText size={24} className="text-phoenix-navy" />
                            </div>
                            <span className="font-sans font-bold text-lg">€19</span>
                        </div>
                        <h3 className="font-display font-bold text-lg mb-2">The CV Killer</h3>
                        <p className="text-sm text-gray-500 mb-6 min-h-[40px]">
                            Riscriviamo il tuo CV per aggirare gli algoritmi HR e colpire i bias cognitivi.
                        </p>
                        <button className="w-full py-2 border border-phoenix-navy text-phoenix-navy font-bold text-xs uppercase tracking-widest hover:bg-phoenix-navy hover:text-white transition-colors flex items-center justify-center gap-2">
                            <ShoppingCart size={14} /> Buy Now
                        </button>
                    </div>

                    {/* CARD 3: LINKEDIN GHOST */}
                    <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-phoenix-navy/5 rounded-full">
                                <Linkedin size={24} className="text-phoenix-navy" />
                            </div>
                            <span className="font-sans font-bold text-lg">€5</span>
                        </div>
                        <h3 className="font-display font-bold text-lg mb-2">LinkedIn Ghost</h3>
                        <p className="text-sm text-gray-500 mb-6 min-h-[40px]">
                            Post virali pronti all'uso. Diventa un Thought Leader senza scrivere una parola.
                        </p>
                        <button className="w-full py-2 border border-phoenix-navy text-phoenix-navy font-bold text-xs uppercase tracking-widest hover:bg-phoenix-navy hover:text-white transition-colors flex items-center justify-center gap-2">
                            <ShoppingCart size={14} /> Buy Pack
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

import React from 'react';
import { Mic, FileText, Linkedin, ShoppingCart } from 'lucide-react';

export const BlackMarketSection: React.FC = () => {
    return (
        <section className="py-24 bg-gray-50 border-y border-gray-200">
            <div className="max-w-6xl mx-auto px-6">

                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl font-bold text-phoenix-ink uppercase tracking-widest">
                        IL MERCATO NERO (BLACK MARKET)
                    </h2>
                    <p className="mt-4 text-phoenix-ghost font-sans text-sm">
                        Strumenti tattici singoli per chi non è pronto all'abbonamento.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* CARD 1: CV REWRITE */}
                    <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-phoenix-navy/5 rounded-full">
                                <FileText size={24} className="text-phoenix-navy" />
                            </div>
                            <span className="font-sans font-bold text-lg">€19</span>
                        </div>
                        <h3 className="font-display font-bold text-lg mb-2">CV REWRITE</h3>
                        <p className="text-sm text-gray-500 mb-6 min-h-[40px]">
                            L'AI riscrive il tuo CV per battere gli ATS. Passa da 'cestinato' a 'colloquio' in 3 secondi.
                        </p>
                        <button className="w-full py-2 border border-phoenix-navy text-phoenix-navy font-bold text-xs uppercase tracking-widest hover:bg-phoenix-navy hover:text-white transition-colors flex items-center justify-center gap-2">
                            <ShoppingCart size={14} /> Buy Now
                        </button>
                    </div>

                    {/* CARD 2: SALARY NEGOTIATOR */}
                    <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold px-2 py-1 uppercase tracking-wider">
                            Best Seller
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-phoenix-navy/5 rounded-full">
                                <Mic size={24} className="text-phoenix-navy" />
                            </div>
                            <span className="font-sans font-bold text-lg">€9</span>
                        </div>
                        <h3 className="font-display font-bold text-lg mb-2">SALARY NEGOTIATOR SCRIPT</h3>
                        <p className="text-sm text-gray-500 mb-6 min-h-[40px]">
                            Cosa dire esattamente quando ti offrono +5%. Lo script per chiedere +20% senza tremare.
                        </p>
                        <button className="w-full py-2 border border-phoenix-navy text-phoenix-navy font-bold text-xs uppercase tracking-widest hover:bg-phoenix-navy hover:text-white transition-colors flex items-center justify-center gap-2">
                            <ShoppingCart size={14} /> Buy Now
                        </button>
                    </div>

                    {/* CARD 3: LINKEDIN GHOSTWRITER */}
                    <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-phoenix-navy/5 rounded-full">
                                <Linkedin size={24} className="text-phoenix-navy" />
                            </div>
                            <span className="font-sans font-bold text-lg">€5</span>
                        </div>
                        <h3 className="font-display font-bold text-lg mb-2">LINKEDIN GHOSTWRITER</h3>
                        <p className="text-sm text-gray-500 mb-6 min-h-[40px]">
                            Un post virale generato per te. Posizionati come Thought Leader mentre dormi.
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

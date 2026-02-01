import React from 'react';
import { Check, X } from 'lucide-react';

interface TierSectionProps {
    onEnterApp: () => void;
}

export const TierSection: React.FC<TierSectionProps> = ({ onEnterApp }) => {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-6xl mx-auto px-6">

                <div className="text-center mb-20">
                    <h2 className="font-display text-4xl font-bold text-phoenix-ink mb-4">
                        LA SCELTA
                    </h2>
                    <p className="text-phoenix-ghost font-sans max-w-2xl mx-auto">
                        Nel mondo corporate ci sono solo due ruoli: chi firma gli assegni e chi li aspetta.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-end">

                    {/* TIER 1: THE TOURIST (Boring/Weak) */}
                    <div className="bg-gray-50 p-8 rounded-sm border border-gray-200 opacity-70 hover:opacity-100 transition-opacity">
                        <h3 className="font-sans text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">The Tourist</h3>
                        <div className="text-4xl font-display font-bold text-gray-400 mb-2">€0<span className="text-lg">/mo</span></div>
                        <p className="text-xs text-gray-400 mb-8 italic">Per chi vuole rimanere spettatore.</p>

                        <ul className="space-y-4 mb-8 text-sm text-gray-500">
                            <li className="flex gap-2"><Check size={16} /> Accesso limitato</li>
                            <li className="flex gap-2"><Check size={16} /> 3 Messaggi/giorno</li>
                            <li className="flex gap-2 text-gray-300"><X size={16} /> No Strategy Vault</li>
                            <li className="flex gap-2 text-gray-300"><X size={16} /> No AI Persona</li>
                        </ul>

                        <button onClick={onEnterApp} className="w-full py-3 bg-white border border-gray-300 text-gray-400 font-bold text-xs rounded-sm hover:bg-gray-50 transition-colors">
                            RESTA POVORO
                        </button>
                    </div>

                    {/* TIER 2: THE MERCENARY (Metallic/Solid) */}
                    <div className="bg-slate-100 p-8 rounded-sm border border-slate-300 relative transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="absolute top-0 inset-x-0 h-1 bg-slate-400"></div>
                        <h3 className="font-sans text-xs font-bold text-slate-600 uppercase tracking-widest mb-4">The Mercenary</h3>
                        <div className="text-4xl font-display font-bold text-slate-800 mb-2">€49<span className="text-lg">/mo</span></div>
                        <p className="text-xs text-slate-500 mb-8">Per chi vuole combattere.</p>

                        <ul className="space-y-4 mb-8 text-sm text-slate-700">
                            <li className="flex gap-2"><Check size={16} /> Accesso Completo</li>
                            <li className="flex gap-2"><Check size={16} /> 150 Messaggi/giorno</li>
                            <li className="flex gap-2"><Check size={16} /> Basic Vault Access</li>
                            <li className="flex gap-2 text-gray-400"><X size={16} /> No WhatsApp Line</li>
                        </ul>

                        <button onClick={onEnterApp} className="w-full py-3 bg-slate-800 text-white font-bold text-xs rounded-sm hover:bg-slate-900 transition-colors uppercase tracking-wider">
                            Diventa Operativo
                        </button>
                    </div>

                    {/* TIER 3: THE PARTNER (Gold/Shining) */}
                    <div className="bg-white p-8 rounded-sm border-2 border-phoenix-gold relative shadow-phoenix-shadow-levitate transform scale-105 z-10">
                        <div className="absolute -top-4 inset-x-0 flex justify-center">
                            <span className="bg-phoenix-gold text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-full shadow-lg">
                                Only 14 Spots Left
                            </span>
                        </div>

                        <h3 className="font-sans text-xs font-bold text-phoenix-gold uppercase tracking-widest mb-4">The Partner</h3>
                        <div className="text-5xl font-display font-bold text-phoenix-ink mb-2">€299<span className="text-lg">/mo</span></div>
                        <p className="text-xs text-phoenix-navy mb-8 font-medium">Per chi vuole possedere il gioco.</p>

                        <ul className="space-y-4 mb-8 text-sm text-phoenix-ink font-medium">
                            <li className="flex gap-2"><Check size={16} className="text-phoenix-gold" /> <strong>Unlimited AI</strong> (God Mode)</li>
                            <li className="flex gap-2"><Check size={16} className="text-phoenix-gold" /> <strong>Full Vault Access</strong> (Docs)</li>
                            <li className="flex gap-2"><Check size={16} className="text-phoenix-gold" /> <strong>WhatsApp Diretto</strong> h24</li>
                            <li className="flex gap-2"><Check size={16} className="text-phoenix-gold" /> <strong>Priority Coaching</strong></li>
                        </ul>

                        <button className="w-full py-4 bg-phoenix-gold-gradient text-white font-bold text-sm rounded-sm shadow-phoenix-glow hover:scale-105 transition-transform uppercase tracking-widest relative overflow-hidden group">
                            <span className="relative z-10">Richiedi Accesso Elitario</span>
                            <div className="absolute top-0 -left-full w-full h-full bg-white/30 transform skew-x-12 group-hover:animate-shine"></div>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

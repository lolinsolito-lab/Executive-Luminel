import React, { useState, useEffect } from 'react';
import {
    Crown, Shield, Zap, Target, Brain, Lock,
    ChevronRight, ArrowRight, Check, X,
    Eye, Sword, Scroll, MessageCircle, Users, Sparkles
} from 'lucide-react';
import { LegalModal } from '../Legal/LegalModal';

interface LandingPageProps {
    onEnterApp: () => void;
}

// =========================================
// THE MANIFESTO EDITION - V7.0
// "Divine Revelation meets Savage Truth"
// =========================================

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
    const [blockedCount, setBlockedCount] = useState(14502);
    const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

    // Simulate live counter
    useEffect(() => {
        const interval = setInterval(() => {
            setBlockedCount(prev => prev + Math.floor(Math.random() * 3));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-white text-phoenix-ink font-sans overflow-x-hidden">

            {/* ========== NAVBAR ========== */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Crown size={24} className="text-phoenix-gold" />
                        <span className="font-display font-bold text-xl tracking-widest text-phoenix-navy">LUMINEL</span>
                    </div>
                    <button
                        onClick={onEnterApp}
                        className="px-5 py-2 bg-phoenix-navy text-white font-sans text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors rounded-sm"
                    >
                        Accedi
                    </button>
                </div>
            </nav>

            {/* ========== SECTION 1: L'IMPATTO (Hero) ========== */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                {/* Background with light rays */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-amber-100/50 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
                </div>

                {/* Light Ray Animation */}
                <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-phoenix-gold/40 via-phoenix-gold/10 to-transparent -translate-x-1/2 animate-pulse-slow"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-phoenix-navy text-white text-[10px] font-sans uppercase tracking-[0.3em] mb-8 rounded-sm">
                        <Sparkles size={12} />
                        EXECUTIVE INTELLIGENCE
                    </div>

                    {/* Headline - IL GANCIO VIRALE */}
                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-phoenix-ink leading-tight mb-8 tracking-tight">
                        IL TUO DURO LAVORO
                        <br />
                        <span className="text-phoenix-gold">È IRRILEVANTE.</span>
                    </h1>

                    {/* Sub-headline - STORYTELLING */}
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-phoenix-ghost leading-relaxed mb-10">
                        Mentre tu fai gli straordinari sperando in un "Bravo", il tuo collega meno competente sta cenando con il Partner e <span className="text-phoenix-ink font-semibold">prendendo la tua promozione</span>.
                        <br /><br />
                        Il sistema non è rotto. <span className="text-phoenix-gold font-bold">È progettato per usarti.</span>
                        <br />
                        Noi siamo il codice per romperlo.
                    </p>

                    {/* CTA - LUSSO */}
                    <button
                        onClick={onEnterApp}
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-phoenix-gold to-amber-600 text-white font-sans text-base font-bold uppercase tracking-widest hover:from-amber-600 hover:to-phoenix-gold transition-all shadow-lg hover:shadow-xl rounded-sm"
                    >
                        INIZIA L'ASCESA
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronRight size={24} className="text-phoenix-ghost rotate-90" />
                </div>
            </section>

            {/* ========== SECTION 2: LA VERITÀ (The Awakening) ========== */}
            <section className="py-24 md:py-32 bg-phoenix-navy text-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-phoenix-gold font-sans text-[11px] tracking-[0.4em] uppercase font-bold">The Awakening</span>
                        <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 tracking-tight">
                            LA NEBBIA DI GUERRA
                        </h2>
                        <p className="text-gray-400 text-sm font-sans mt-2 uppercase tracking-widest">// THE FOG //</p>
                    </div>

                    <div className="max-w-3xl mx-auto text-center space-y-6 text-lg leading-relaxed text-gray-300">
                        <p>
                            Ti hanno detto che <span className="text-white font-semibold">il merito paga</span>. Hanno mentito.
                        </p>
                        <p>
                            Nelle Big Corp (Capgemini, Deloitte, Accenture), la carriera è un gioco di
                            <span className="text-phoenix-gold"> percezione</span>,
                            <span className="text-phoenix-gold"> alleanze</span> e
                            <span className="text-phoenix-gold"> leva politica</span>.
                        </p>
                        <div className="py-6 border-l-4 border-phoenix-gold pl-6 text-left bg-white/5 rounded-r-sm">
                            <p className="text-white">Sei un <strong>Tier A (Analyst)</strong>? Sei invisibile.</p>
                            <p className="text-white mt-2">Sei un <strong>Tier B (Specialist)</strong>? Sei un ingranaggio costoso.</p>
                        </div>
                        <p className="text-xl text-white font-semibold">
                            L'unico modo per uscire dalla trappola non è lavorare di più.
                            <br />
                            È <span className="text-phoenix-gold">vedere ciò che gli altri non vedono</span>.
                        </p>
                    </div>

                    {/* Live Counter - Elemento Virale */}
                    <div className="mt-16 text-center">
                        <div className="inline-block p-6 border border-red-500/30 bg-red-500/10 rounded-sm">
                            <div className="text-4xl md:text-5xl font-display font-bold text-red-400">
                                {blockedCount.toLocaleString()}
                            </div>
                            <p className="text-sm text-gray-400 mt-2 font-sans uppercase tracking-widest">
                                Utenti bloccati nel Tier A oggi
                            </p>
                        </div>
                        <p className="mt-6 text-phoenix-gold font-bold text-lg">
                            Non essere uno di loro.
                        </p>
                    </div>
                </div>
            </section>

            {/* ========== SECTION 3: L'ARMA (The Weapon) ========== */}
            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-phoenix-gold font-sans text-[11px] tracking-[0.4em] uppercase font-bold">The Weapon</span>
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-phoenix-ink mt-4 tracking-tight">
                            IL TUO "CONSIGLIERE DI GUERRA"
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* THE ARCHITECT */}
                        <div className="group p-8 border border-gray-200 hover:border-phoenix-gold transition-all duration-300 rounded-sm hover:shadow-xl">
                            <div className="w-14 h-14 bg-phoenix-navy rounded-sm flex items-center justify-center mb-6 group-hover:bg-phoenix-gold transition-colors">
                                <Brain size={28} className="text-white" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-phoenix-ink mb-3">THE ARCHITECT</h3>
                            <p className="text-phoenix-ghost leading-relaxed">
                                Non un chatbot. Un <span className="text-phoenix-ink font-semibold">mentore machiavellico</span> che corregge le tue mail troppo gentili e rivela le mosse nascoste.
                            </p>
                        </div>

                        {/* THE BLACK BOOK */}
                        <div className="group p-8 border border-gray-200 hover:border-phoenix-gold transition-all duration-300 rounded-sm hover:shadow-xl">
                            <div className="w-14 h-14 bg-phoenix-navy rounded-sm flex items-center justify-center mb-6 group-hover:bg-phoenix-gold transition-colors">
                                <Users size={28} className="text-white" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-phoenix-ink mb-3">THE BLACK BOOK</h3>
                            <p className="text-phoenix-ghost leading-relaxed">
                                <span className="text-phoenix-ink font-semibold">Mappa i tuoi nemici.</span> Sai sempre chi ha il potere reale nella stanza prima ancora di entrare.
                            </p>
                        </div>

                        {/* THE VAULT */}
                        <div className="group p-8 border border-gray-200 hover:border-phoenix-gold transition-all duration-300 rounded-sm hover:shadow-xl">
                            <div className="w-14 h-14 bg-phoenix-navy rounded-sm flex items-center justify-center mb-6 group-hover:bg-phoenix-gold transition-colors">
                                <Lock size={28} className="text-white" />
                            </div>
                            <h3 className="font-display font-bold text-xl text-phoenix-ink mb-3">THE VAULT</h3>
                            <p className="text-phoenix-ghost leading-relaxed">
                                I documenti che HR non vuole che tu abbia. <span className="text-phoenix-ink font-semibold">Script di negoziazione RAL</span> basati su dati reali.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== SECTION 4: I TIER (La Scala dell'Ego) ========== */}
            <section className="py-24 md:py-32 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-phoenix-gold font-sans text-[11px] tracking-[0.4em] uppercase font-bold">La Scala dell'Ego</span>
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-phoenix-ink mt-4 tracking-tight">
                            QUANTO VALI SUL MERCATO?
                        </h2>
                        <p className="text-phoenix-ghost mt-4 text-lg">Scegli il tuo destino.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-start">

                        {/* CARD 1: THE TOURIST (Free) */}
                        <div className="bg-white border border-gray-200 p-8 rounded-sm opacity-80 hover:opacity-100 transition-opacity">
                            <div className="text-center mb-6">
                                <span className="text-[10px] font-sans text-gray-400 uppercase tracking-widest">Per Curiosi & Scettici</span>
                                <h3 className="font-display font-bold text-2xl text-gray-500 mt-2">THE TOURIST</h3>
                                <div className="text-4xl font-display font-bold text-gray-400 mt-4">€0</div>
                                <span className="text-sm text-gray-400">per sempre</span>
                            </div>

                            <p className="text-center text-gray-500 italic mb-6">"Guarda il gioco dagli spalti."</p>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2 text-sm text-gray-500">
                                    <Check size={16} className="text-gray-400" /> Dashboard View
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-500">
                                    <Check size={16} className="text-gray-400" /> Strategic Map (bloccata)
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-500">
                                    <X size={16} className="text-gray-300" /> AI illimitata
                                </li>
                            </ul>

                            <button className="w-full py-3 border border-gray-300 text-gray-400 font-sans text-sm uppercase tracking-widest rounded-sm hover:bg-gray-100 transition-colors">
                                Resta a guardare
                            </button>
                        </div>

                        {/* CARD 2: THE MERCENARY (€49) */}
                        <div className="bg-white border-2 border-gray-300 p-8 rounded-sm shadow-lg relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-sans px-3 py-1 uppercase tracking-widest rounded-sm">
                                Popolare
                            </div>

                            <div className="text-center mb-6">
                                <span className="text-[10px] font-sans text-blue-500 uppercase tracking-widest">Per Chi Vuole Risultati</span>
                                <h3 className="font-display font-bold text-2xl text-phoenix-ink mt-2">THE MERCENARY</h3>
                                <div className="text-4xl font-display font-bold text-phoenix-ink mt-4">€49<span className="text-lg text-gray-400">/mese</span></div>
                            </div>

                            <p className="text-center text-phoenix-ghost italic mb-6">"Armati per la battaglia."</p>

                            <p className="text-sm text-phoenix-ghost text-center mb-6 leading-relaxed">
                                Smetti di subire le riunioni. <strong className="text-phoenix-ink">Dominale.</strong> Hai 50 colpi al mese per riscrivere la tua reputazione.
                            </p>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2 text-sm text-phoenix-ink">
                                    <Check size={16} className="text-blue-500" /> 50 messaggi AI/mese
                                </li>
                                <li className="flex items-center gap-2 text-sm text-phoenix-ink">
                                    <Check size={16} className="text-blue-500" /> Vault Standard
                                </li>
                                <li className="flex items-center gap-2 text-sm text-phoenix-ink">
                                    <Check size={16} className="text-blue-500" /> Hacker Mode
                                </li>
                            </ul>

                            <button
                                onClick={onEnterApp}
                                className="w-full py-3 bg-blue-500 text-white font-sans text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-blue-600 transition-colors"
                            >
                                Diventa Operativo
                            </button>
                        </div>

                        {/* CARD 3: GOD MODE (€299) - IL FOCUS */}
                        <div className="bg-gradient-to-br from-amber-50 to-white border-2 border-phoenix-gold p-8 rounded-sm shadow-2xl relative overflow-hidden">
                            {/* Gold glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-phoenix-gold/5 to-transparent pointer-events-none"></div>

                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-phoenix-gold text-white text-[10px] font-sans px-3 py-1 uppercase tracking-widest rounded-sm flex items-center gap-1">
                                <Crown size={12} /> Elite
                            </div>

                            <div className="text-center mb-6 relative z-10">
                                <span className="text-[10px] font-sans text-phoenix-gold uppercase tracking-widest">Per Futuri Leader</span>
                                <h3 className="font-display font-bold text-2xl text-phoenix-ink mt-2">GOD MODE</h3>
                                <div className="text-4xl font-display font-bold text-phoenix-gold mt-4">€299<span className="text-lg text-gray-400">/mese</span></div>
                            </div>

                            <p className="text-center text-phoenix-gold font-bold italic mb-6">"Non chiedere il permesso. Prendilo."</p>

                            <p className="text-sm text-phoenix-ghost text-center mb-6 leading-relaxed relative z-10">
                                Questo non è un abbonamento. È un <strong className="text-phoenix-ink">investimento con ROI del 1000%.</strong>
                                <br /><br />
                                <span className="text-phoenix-gold">Se questo prezzo ti spaventa, non sei pronto per il livello C.</span>
                            </p>

                            <ul className="space-y-3 mb-8 relative z-10">
                                <li className="flex items-center gap-2 text-sm text-phoenix-ink font-semibold">
                                    <Check size={16} className="text-phoenix-gold" /> AI ILLIMITATA
                                </li>
                                <li className="flex items-center gap-2 text-sm text-phoenix-ink font-semibold">
                                    <Check size={16} className="text-phoenix-gold" /> Vault Completo
                                </li>
                                <li className="flex items-center gap-2 text-sm text-phoenix-ink font-semibold">
                                    <Check size={16} className="text-phoenix-gold" /> Out-of-Cycle Strategy
                                </li>
                                <li className="flex items-center gap-2 text-sm text-phoenix-ink font-semibold">
                                    <Check size={16} className="text-phoenix-gold" /> Priority Uplink (WhatsApp)
                                </li>
                            </ul>

                            <button
                                onClick={onEnterApp}
                                className="w-full py-4 bg-gradient-to-r from-phoenix-gold to-amber-600 text-white font-sans text-sm font-bold uppercase tracking-widest rounded-sm hover:from-amber-600 hover:to-phoenix-gold transition-all shadow-lg"
                            >
                                Richiedi Accesso Elitario
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== SECTION 5: LA DIPENDENZA (Lifetime Value) ========== */}
            <section className="py-24 md:py-32 bg-phoenix-navy text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-phoenix-gold font-sans text-[11px] tracking-[0.4em] uppercase font-bold">Lifetime Value</span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 tracking-tight">
                        LA TUA ASSICURAZIONE
                        <br />
                        <span className="text-phoenix-gold">SULLA VITA AZIENDALE</span>
                    </h2>

                    <div className="mt-12 space-y-6 text-lg text-gray-300 leading-relaxed">
                        <p>
                            Arrivare in cima è difficile. <span className="text-white font-semibold">Restarci è brutale.</span>
                        </p>
                        <p>
                            Luminel non ti serve solo per la promozione. Ti serve per:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        <div className="p-6 border border-white/10 rounded-sm bg-white/5">
                            <Shield size={32} className="text-phoenix-gold mx-auto mb-4" />
                            <h4 className="font-display font-bold text-white mb-2">Sopravvivere</h4>
                            <p className="text-sm text-gray-400">alle ristrutturazioni</p>
                        </div>
                        <div className="p-6 border border-white/10 rounded-sm bg-white/5">
                            <Target size={32} className="text-phoenix-gold mx-auto mb-4" />
                            <h4 className="font-display font-bold text-white mb-2">Gestire</h4>
                            <p className="text-sm text-gray-400">le crisi di team</p>
                        </div>
                        <div className="p-6 border border-white/10 rounded-sm bg-white/5">
                            <Zap size={32} className="text-phoenix-gold mx-auto mb-4" />
                            <h4 className="font-display font-bold text-white mb-2">Preparare</h4>
                            <p className="text-sm text-gray-400">la tua Exit Strategy milionaria</p>
                        </div>
                    </div>

                    <p className="mt-12 text-xl text-phoenix-gold font-display font-bold italic">
                        "Un Executive non viaggia mai senza la sua scorta. Noi siamo la tua scorta."
                    </p>
                </div>
            </section>

            {/* ========== SECTION 6: FOOTER ========== */}
            <footer className="py-16 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Crown size={24} className="text-phoenix-gold" />
                                <span className="font-display font-bold text-xl tracking-widest">LUMINEL</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Executive Intelligence per chi rifiuta la mediocrità.
                            </p>
                        </div>

                        {/* Referral */}
                        <div>
                            <h4 className="font-display font-bold text-phoenix-gold mb-4 uppercase tracking-widest text-sm">Referral Program</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Invita un collega fidato. <span className="text-white">Guadagna Capitale Politico (Tokens).</span>
                            </p>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="font-display font-bold text-phoenix-gold mb-4 uppercase tracking-widest text-sm">Legal</h4>
                            <div className="space-y-2">
                                <button onClick={() => setLegalModal('privacy')} className="block text-sm text-gray-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </button>
                                <button onClick={() => setLegalModal('terms')} className="block text-sm text-gray-400 hover:text-white transition-colors">
                                    Termini di Servizio
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                        <p className="text-gray-500 text-xs">
                            © 2024 LUMINEL EXECUTIVE. All rights reserved. Built for the ambitious.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Legal Modal */}
            {legalModal && (
                <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
            )}
        </div>
    );
};

export default LandingPage;

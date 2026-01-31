import React, { useState } from 'react';
import {
    Crown, Shield, Zap, Target, Brain, Lock,
    ChevronRight, Star, ArrowRight, Check, X,
    TrendingUp, Users, Award, Sparkles
} from 'lucide-react';
import { LegalModal } from '../Legal/LegalModal';

interface LandingPageProps {
    onEnterApp: () => void;
}

const TESTIMONIALS = [
    {
        name: "Marco R.",
        role: "Senior Manager → Director",
        quote: "In 8 mesi sono passato da 75k a 120k. La strategia Out-of-Cycle ha cambiato tutto.",
        result: "+60% salary",
        avatar: "MR"
    },
    {
        name: "Elena S.",
        role: "Team Lead → VP Engineering",
        quote: "Il Neural Codex mi ha dato le armi psicologiche per gestire la politica aziendale.",
        result: "2 promozioni in 1 anno",
        avatar: "ES"
    },
    {
        name: "Alessandro T.",
        role: "IC → People Manager",
        quote: "Finalmente ho capito come funziona il gioco. Non lavoro di più, lavoro meglio.",
        result: "First direct reports",
        avatar: "AT"
    }
];

const FEATURES = [
    {
        icon: Brain,
        title: "Mind Decoding",
        description: "18 strategie da 48 Leggi del Potere, Atomic Habits, Psicologia Oscura. Applicate al tuo caso specifico.",
        tier: "STRATEGIST+"
    },
    {
        icon: Target,
        title: "Simulation Engine",
        description: "Simulatore AI che calcola probabilità di successo di ogni mossa. Prima di agire, testa.",
        tier: "ALL TIERS"
    },
    {
        icon: TrendingUp,
        title: "Political Leverage",
        description: "La massa aspetta Dicembre. L'elite negozia a Marzo. Timing strategico per promozioni.",
        tier: "STRATEGIST+"
    },
    {
        icon: Lock,
        title: "Execution Directives",
        description: "Script di negoziazione, template email, protocolli testati. Valore €5,000+.",
        tier: "EXECUTIVE"
    }
];

const PRICING = [
    {
        id: 'GRINDER',
        name: 'THE GRINDER',
        price: '€0',
        period: 'forever',
        description: 'Per chi inizia la scalata',
        features: ['Dashboard View', 'Strategic Map', '3 AI chat/giorno'],
        cta: 'Accesso Grinder',
        style: 'border-corp-silver/30'
    },
    {
        id: 'STRATEGIST',
        name: 'THE STRATEGIST',
        price: '€49',
        period: '/mese',
        description: 'Per chi accelera',
        popular: true,
        features: ['AI illimitata', 'Neural Codex', 'Out-of-Cycle', 'Sandbox Simulator', 'Vault Base'],
        cta: 'Diventa Strategist',
        style: 'border-corp-blue/50 bg-corp-blue/5 scale-105 shadow-[0_0_40px_rgba(0,122,255,0.2)]'
    },
    {
        id: 'EXECUTIVE',
        name: 'THE EXECUTIVE',
        price: '€299',
        period: '/mese',
        description: 'Per chi gioca per vincere',
        features: ['Priority AI', 'Full Vault', 'WhatsApp Direct', 'Email 4h response', '1-on-1 Strategy'],
        cta: 'Richiedi Status Executive',
        style: 'border-corp-gold/50 bg-gradient-to-br from-corp-gold/10 to-transparent'
    }
];

// Imports moved to top

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
    const [legalType, setLegalType] = useState<'privacy' | 'terms' | 'cookies' | 'disclaimer' | null>(null);

    const [email, setEmail] = useState('');
    const [scrollY, setScrollY] = useState(0);

    const handleWaitlist = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Integrate with Resend/Supabase
        alert(`Email ${email} aggiunta alla waitlist! (Da integrare con Resend)`);
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-corp-onyx text-corp-platinum font-sans">

            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Deep Void Background - No Grid */}
                <div className="absolute inset-0 bg-corp-onyx"></div>

                {/* Golden Gradient Bloom */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-corp-gold/20 via-transparent to-transparent blur-[100px] opacity-60"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-corp-gold/10 border border-corp-gold/30 rounded-sm mb-8 animate-fade-in">
                        <Crown size={14} className="text-corp-gold" />
                        <span className="text-[10px] font-mono text-corp-gold uppercase tracking-widest">V5.0 // THE ARCHITECT</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 animate-fade-in drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                        <span className="text-corp-platinum">LUMINEL</span>
                        <span className="text-corp-gold font-serif italic"> EXECUTIVE</span>
                    </h1>

                    {/* Tagline */}
                    <p className="text-xl md:text-2xl font-mono text-corp-blue tracking-widest mb-4 animate-fade-in">
                        Career Intelligence for the 1%
                    </p>

                    {/* Sub-headline */}
                    <p className="text-lg text-corp-silver max-w-2xl mx-auto mb-12 animate-fade-in font-light leading-relaxed">
                        L'Intelligence che trasforma professionisti in <span className="text-corp-platinum font-medium">Architetti del Potere</span>.
                        <br />
                        <span className="text-corp-gold italic">L'Elite non compete. Domina.</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
                        <button
                            onClick={onEnterApp}
                            className="group px-8 py-4 bg-corp-gold text-corp-onyx font-serif font-bold uppercase tracking-[0.2em] text-sm hover:shadow-[0_0_40px_rgba(197,160,89,0.6)] hover:bg-white transition-all duration-500"
                        >
                            Accedi al Vault
                            <ArrowRight size={16} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <a
                            href="#pricing"
                            className="px-8 py-4 border border-corp-silver/30 text-corp-silver hover:border-corp-gold hover:text-corp-gold transition-colors uppercase tracking-widest text-sm"
                        >
                            Vedi i Piani
                        </a>
                    </div>

                    {/* Social Proof Mini */}
                    <div className="mt-16 flex items-center justify-center gap-8 text-corp-silver animate-fade-in">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-corp-platinum">2,847</div>
                            <div className="text-[10px] font-mono uppercase tracking-widest">Executives Attivi</div>
                        </div>
                        <div className="w-px h-10 bg-corp-border"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-corp-gold">+47%</div>
                            <div className="text-[10px] font-mono uppercase tracking-widest">Salary Increase Avg</div>
                        </div>
                        <div className="w-px h-10 bg-corp-border"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-corp-platinum">8.2</div>
                            <div className="text-[10px] font-mono uppercase tracking-widest">Mesi per Promo</div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronRight size={24} className="text-corp-silver rotate-90" />
                </div>
            </section>

            {/* MANIFESTO SECTION (VIRAL HOOK) */}
            <section className="py-20 px-6 bg-corp-platinum text-corp-onyx border-y border-corp-gold/30">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-corp-gold mb-8">The Rules of the Game</h2>
                    <div className="space-y-12">
                        <div className="group">
                            <h3 className="text-2xl md:text-4xl font-serif font-bold mb-2 group-hover:text-corp-gold transition-colors duration-300">"Competence is the baseline. Politics is the multiplier."</h3>
                            <p className="text-corp-silver font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Rule No. 1</p>
                        </div>
                        <div className="w-12 h-px bg-corp-gold/30 mx-auto"></div>
                        <div className="group">
                            <h3 className="text-2xl md:text-4xl font-serif font-bold mb-2 group-hover:text-corp-gold transition-colors duration-300">"Don't ask for permission. Create leverage."</h3>
                            <p className="text-corp-silver font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Rule No. 2</p>
                        </div>
                        <div className="w-12 h-px bg-corp-gold/30 mx-auto"></div>
                        <div className="group">
                            <h3 className="text-2xl md:text-4xl font-serif font-bold mb-2 group-hover:text-corp-gold transition-colors duration-300">"Nice guys finish last. Architects define the finish line."</h3>
                            <p className="text-corp-silver font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Rule No. 3</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROBLEM SECTION */}
            <section className="py-24 px-6 border-t border-corp-border">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
                        Il <span className="text-corp-danger">problema</span> che nessuno ti dice
                    </h2>
                    <p className="text-lg text-corp-silver leading-relaxed mb-12">
                        Lavori 60 ore. Eccelli tecnicamente. Eppure la promozione va sempre a <span className="text-corp-gold">quello che sa giocare</span>.
                        <br /><br />
                        La Meritocrazia è una favola. La <span className="text-corp-gold font-serif italic">Strategia Politica</span> è la realtà.
                        <br /><br />
                        Il sistema è truccato. <span className="text-corp-platinum font-bold">Impara a barare con classe.</span>
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 border border-corp-danger/30 bg-corp-danger/5 rounded-sm">
                            <X size={24} className="text-corp-danger mx-auto mb-4" />
                            <div className="text-sm text-corp-silver">Aspetti Dicembre per chiedere l'aumento</div>
                        </div>
                        <div className="p-6 border border-corp-danger/30 bg-corp-danger/5 rounded-sm">
                            <X size={24} className="text-corp-danger mx-auto mb-4" />
                            <div className="text-sm text-corp-silver">Credi che "il lavoro parli da solo"</div>
                        </div>
                        <div className="p-6 border border-corp-danger/30 bg-corp-danger/5 rounded-sm">
                            <X size={24} className="text-corp-danger mx-auto mb-4" />
                            <div className="text-sm text-corp-silver">Ignori la politica aziendale</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRAP VS ESCAPE (EDUCATION) */}
            <section className="py-24 px-6 bg-corp-bg">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Scegli il tuo <span className="text-corp-gold">Ruolo</span>
                        </h2>
                        <p className="text-corp-silver">Ci sono due modi di giocare. Solo uno vince.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-0 border border-corp-border/50 rounded-lg overflow-hidden shadow-2xl">
                        {/* THE TRAP */}
                        <div className="p-10 bg-corp-platinum/5 border-r border-corp-border/30">
                            <h3 className="text-xl font-mono text-corp-silver uppercase tracking-widest mb-8 text-center">The Employee</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-corp-silver/70">
                                    <X size={20} className="text-corp-silver" />
                                    <span>Aspetta la "Performance Review"</span>
                                </div>
                                <div className="flex items-center gap-4 text-corp-silver/70">
                                    <X size={20} className="text-corp-silver" />
                                    <span>Crede che HR sia amico</span>
                                </div>
                                <div className="flex items-center gap-4 text-corp-silver/70">
                                    <X size={20} className="text-corp-silver" />
                                    <span>Lavora 10h/giorno sperando notino</span>
                                </div>
                                <div className="flex items-center gap-4 text-corp-silver/70">
                                    <X size={20} className="text-corp-silver" />
                                    <span>Chiede permesso</span>
                                </div>
                            </div>
                        </div>

                        {/* THE ESCAPE */}
                        <div className="p-10 bg-corp-onyx relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-corp-gold/10 to-transparent pointer-events-none"></div>
                            <h3 className="text-xl font-mono text-corp-gold uppercase tracking-widest mb-8 text-center font-bold">The Architect</h3>
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-4 text-corp-platinum font-medium">
                                    <Check size={20} className="text-corp-gold" />
                                    <span>Negozia Off-Cycle (Marzo/Settembre)</span>
                                </div>
                                <div className="flex items-center gap-4 text-corp-platinum font-medium">
                                    <Check size={20} className="text-corp-gold" />
                                    <span>Usa HR come leva tattica</span>
                                </div>
                                <div className="flex items-center gap-4 text-corp-platinum font-medium">
                                    <Check size={20} className="text-corp-gold" />
                                    <span>Crea asset strategici visibili</span>
                                </div>
                                <div className="flex items-center gap-4 text-corp-platinum font-medium">
                                    <Check size={20} className="text-corp-gold" />
                                    <span>Crea opzioni</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-24 px-6 bg-gradient-to-b from-transparent via-corp-bg/50 to-transparent">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Le <span className="text-corp-gold">armi</span> dell'Elite
                        </h2>
                        <p className="text-corp-silver">Tecnologia + Psicologia + Strategia</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {FEATURES.map((feature, i) => (
                            <div
                                key={i}
                                className="group p-8 border border-corp-border bg-corp-bg/50 rounded-sm hover:border-corp-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-corp-gold/10 border border-corp-gold/30 text-corp-gold group-hover:bg-corp-gold group-hover:text-corp-onyx transition-colors">
                                        <feature.icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg font-bold text-corp-platinum">{feature.title}</h3>
                                            <span className="text-[8px] font-mono px-2 py-0.5 bg-corp-blue/20 text-corp-blue border border-corp-blue/30 rounded-sm">
                                                {feature.tier}
                                            </span>
                                        </div>
                                        <p className="text-sm text-corp-silver leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className="py-24 px-6 border-t border-corp-border">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Risultati <span className="text-corp-gold">reali</span>
                        </h2>
                        <p className="text-corp-silver">Da professionisti come te</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((testimonial, i) => (
                            <div
                                key={i}
                                className="p-6 border border-corp-border bg-corp-bg/30 rounded-sm hover:border-corp-gold/30 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-corp-gold/20 border border-corp-gold/30 rounded-full flex items-center justify-center text-corp-gold font-bold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-corp-platinum">{testimonial.name}</div>
                                        <div className="text-xs text-corp-silver">{testimonial.role}</div>
                                    </div>
                                </div>
                                <p className="text-sm text-corp-silver italic mb-4">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-2">
                                    <TrendingUp size={14} className="text-emerald-500" />
                                    <span className="text-sm font-bold text-emerald-500">{testimonial.result}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING SECTION */}
            <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-transparent via-corp-gold/5 to-transparent">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Scegli il tuo <span className="text-corp-gold">livello</span>
                        </h2>
                        <p className="text-corp-silver">Investi in te stesso. Il ROI medio è 12x.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {PRICING.map((tier) => (
                            <div
                                key={tier.id}
                                className={`relative p-6 border rounded-sm transition-all ${tier.style}`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-corp-blue text-white text-[9px] font-bold uppercase tracking-widest">
                                        Più Popolare
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className={`font-display font-bold text-sm tracking-widest uppercase mb-2 ${tier.id === 'EXECUTIVE' ? 'text-corp-gold' :
                                        tier.id === 'STRATEGIST' ? 'text-corp-blue' : 'text-corp-silver'
                                        }`}>
                                        {tier.name}
                                    </h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-3xl font-bold text-corp-platinum">{tier.price}</span>
                                        <span className="text-xs text-corp-silver">{tier.period}</span>
                                    </div>
                                    <p className="text-xs text-corp-silver mt-2">{tier.description}</p>
                                </div>

                                <div className="space-y-3 mb-6">
                                    {tier.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-corp-platinum/80">
                                            <Check size={14} className="text-emerald-500 shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={onEnterApp}
                                    className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition-all ${tier.id === 'EXECUTIVE'
                                        ? 'bg-corp-gold text-corp-onyx hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]'
                                        : tier.id === 'STRATEGIST'
                                            ? 'bg-corp-blue text-white hover:shadow-[0_0_20px_rgba(0,122,255,0.5)]'
                                            : 'bg-corp-bg border border-corp-silver/30 text-corp-silver hover:border-corp-gold hover:text-corp-gold'
                                        }`}
                                >
                                    {tier.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className="py-24 px-6 border-t border-corp-border">
                <div className="max-w-3xl mx-auto text-center">
                    <Crown size={48} className="text-corp-gold mx-auto mb-8 animate-float" />
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                        La massa aspetta il momento giusto.
                        <br />
                        <span className="text-corp-gold">L'Elite crea il momento.</span>
                    </h2>
                    <p className="text-corp-silver mb-12">
                        Ogni giorno che aspetti, qualcun altro sta negoziando la tua promozione.
                    </p>

                    <button
                        onClick={onEnterApp}
                        className="group px-12 py-5 bg-corp-gold text-corp-onyx font-serif font-bold uppercase tracking-[0.25em] text-lg hover:shadow-[0_0_60px_rgba(197,160,89,0.8)] hover:scale-105 transition-all duration-500 animate-golden-pulse"
                    >
                        Richiedi Accesso
                        <Sparkles size={20} className="inline ml-3" />
                    </button>

                    <p className="text-[10px] text-corp-silver mt-6 font-mono">
                        No credit card required • Cancel anytime • 30-day money-back guarantee
                    </p>
                </div>
            </section>

            {/* FOOTER - FIXED CONTRAST */}
            <footer className="py-12 px-6 border-t border-corp-border bg-corp-platinum text-corp-onyx">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Crown size={16} className="text-corp-gold" />
                        <span className="font-display font-bold text-corp-platinum">LUMINEL EXECUTIVE</span>
                        <span className="text-[10px] font-mono text-corp-silver">V5.0</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-corp-silver/60">
                        <p>&copy; 2026 LUMINEL EXECUTIVE. Tutti i diritti riservati.</p>
                        <div className="flex gap-6">
                            <button onClick={() => setLegalType('privacy')} className="hover:text-corp-gold transition-colors">Privacy Policy</button>
                            <button onClick={() => setLegalType('terms')} className="hover:text-corp-gold transition-colors">Termini di Servizio</button>
                            <button onClick={() => setLegalType('cookies')} className="hover:text-corp-gold transition-colors">Cookie Policy</button>
                            <button onClick={() => setLegalType('disclaimer')} className="hover:text-corp-gold transition-colors">Disclaimer</button>
                        </div>
                    </div>
                </div>
            </footer>

            <LegalModal
                isOpen={!!legalType}
                type={legalType}
                onClose={() => setLegalType(null)}
            />
        </div>
    );
};

export default LandingPage;

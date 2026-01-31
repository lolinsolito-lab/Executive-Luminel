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

const Navbar = ({ onEnterApp }: { onEnterApp: () => void }) => {
    const [scrolled, setScrolled] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-corp-onyx/80 backdrop-blur-md shadow-sm border-b border-corp-gold/20' : 'py-6 bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/luminel-logo.png" alt="LUMINEL EXECUTIVE" className="h-8 md:h-10 w-auto object-contain" />
                </div>

                <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-corp-silver">
                    <a href="#manifesto" className="hover:text-corp-gold transition-colors">Manifesto</a>
                    <a href="#features" className="hover:text-corp-gold transition-colors">Arsenale</a>
                    <a href="#pricing" className="hover:text-corp-gold transition-colors">Status</a>
                </div>

                <button
                    onClick={onEnterApp}
                    className={`px-6 py-2 border text-xs font-bold uppercase tracking-widest transition-all ${scrolled ? 'bg-corp-gold text-corp-onyx border-corp-gold' : 'bg-transparent text-corp-platinum border-corp-platinum/30 hover:border-corp-gold hover:text-corp-gold'}`}
                >
                    Accesso
                </button>
            </div>
        </nav>
    );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
    const [legalType, setLegalType] = useState<'privacy' | 'terms' | 'cookies' | 'disclaimer' | null>(null);
    const [email, setEmail] = useState('');

    const handleWaitlist = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Email ${email} aggiunta alla waitlist!`);
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-corp-onyx text-corp-platinum font-sans selection:bg-corp-gold selection:text-white">
            <Navbar onEnterApp={onEnterApp} />

            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Deep Void Background - No Grid */}
                <div className="absolute inset-0 bg-corp-onyx"></div>

                {/* Golden Gradient Bloom */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-corp-gold/20 via-transparent to-transparent blur-[100px] opacity-60"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-corp-gold/10 to-transparent border-l-2 border-corp-gold rounded-sm mb-8 animate-fade-in shadow-sm">
                        <Crown size={14} className="text-corp-gold" />
                        <span className="text-[10px] font-mono text-corp-platinum uppercase tracking-widest font-bold">V5.0 // THE ARCHITECT</span>
                    </div>

                    {/* Main Headline - VOGUE STYLE */}
                    <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight mb-8 animate-fade-in leading-[1.1]">
                        <span className="text-corp-platinum drop-shadow-xl">LUMINEL</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-corp-gold via-[#D4AF37] to-corp-gold font-serif italic relative">
                            EXECUTIVE
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-corp-gold to-transparent opacity-50"></span>
                        </span>
                    </h1>

                    {/* Tagline */}
                    <p className="text-xl md:text-2xl font-mono text-corp-blue tracking-widest mb-6 animate-fade-in">
                        Career Intelligence for the 1%
                    </p>

                    {/* Sub-headline */}
                    <p className="text-lg md:text-xl text-corp-silver max-w-2xl mx-auto mb-12 animate-fade-in font-light leading-relaxed">
                        L'Intelligence che trasforma professionisti in <span className="text-corp-platinum font-bold border-b border-corp-gold/50">Architetti del Potere</span>.
                        <br className="hidden md:block" />
                        <span className="text-corp-platinum italic mt-2 block">"L'Elite non compete. Domina."</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in">
                        <button
                            onClick={onEnterApp}
                            className="group px-10 py-5 bg-corp-platinum text-corp-bg font-serif font-bold uppercase tracking-[0.2em] text-sm hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 border border-transparent hover:border-corp-gold"
                        >
                            Accedi al Vault
                            <ArrowRight size={16} className="inline ml-2 group-hover:translate-x-1 transition-transform text-corp-gold" />
                        </button>
                        <a
                            href="#pricing"
                            className="group px-10 py-5 border border-corp-platinum/20 text-corp-platinum hover:border-corp-gold hover:text-corp-gold transition-all uppercase tracking-widest text-sm bg-white/50 backdrop-blur-sm"
                        >
                            Vedi i Piani
                        </a>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronRight size={24} className="text-corp-silver rotate-90" />
                </div>
            </section>

            {/* MANIFESTO SECTION (VIRAL HOOK) - ITALIANO */}
            <section id="manifesto" className="py-24 px-6 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#C5A059_0.5px,transparent_0.5px)] [background-size:20px_20px] opacity-20"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-corp-gold mb-12 flex items-center justify-center gap-4">
                        <span className="w-8 h-px bg-corp-gold"></span>
                        Le Regole del Gioco
                        <span className="w-8 h-px bg-corp-gold"></span>
                    </h2>
                    <div className="space-y-16">
                        <div className="group">
                            <h3 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-corp-platinum group-hover:text-corp-gold transition-colors duration-500">
                                "La competenza è la base. <br /><span className="italic font-light">La politica è il moltiplicatore.</span>"
                            </h3>
                            <p className="text-corp-silver font-mono text-[10px] uppercase tracking-[0.3em] opacity-50 group-hover:opacity-100 transition-opacity">Regola N. 1</p>
                        </div>
                        <div className="group">
                            <h3 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-corp-platinum group-hover:text-corp-gold transition-colors duration-500">
                                "Non chiedere il permesso. <br /><span className="italic font-light">Crea una Leva.</span>"
                            </h3>
                            <p className="text-corp-silver font-mono text-[10px] uppercase tracking-[0.3em] opacity-50 group-hover:opacity-100 transition-opacity">Regola N. 2</p>
                        </div>
                        <div className="group">
                            <h3 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-corp-platinum group-hover:text-corp-gold transition-colors duration-500">
                                "I bravi ragazzi arrivano ultimi. <br /><span className="italic font-light">Gli Architetti disegnano il traguardo.</span>"
                            </h3>
                            <p className="text-corp-silver font-mono text-[10px] uppercase tracking-[0.3em] opacity-50 group-hover:opacity-100 transition-opacity">Regola N. 3</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROBLEM SECTION */}
            <section className="py-24 px-6 bg-corp-onyx">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-corp-platinum">
                        Il <span className="text-corp-danger relative inline-block">
                            problema
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-corp-danger opacity-50"></span>
                        </span> che nessuno ti dice
                    </h2>
                    <p className="text-lg text-corp-platinum/80 leading-relaxed mb-12 font-light">
                        Lavori 60 ore. Eccelli tecnicamente. Eppure la promozione va sempre a <span className="text-corp-gold font-bold">quello che sa giocare</span>.
                        <br /><br />
                        La Meritocrazia è una favola. La <span className="text-corp-platinum font-serif italic text-2xl">Strategia Politica</span> è la realtà.
                    </p>
                </div>
            </section>

            {/* TRAP VS ESCAPE (EDUCATION) - ITALIANO */}
            <section className="py-24 px-6 bg-corp-bg/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-corp-platinum">
                            Scegli il tuo <span className="text-transparent bg-clip-text bg-gradient-to-r from-corp-gold to-[#D4AF37]">Ruolo</span>
                        </h2>
                        <p className="text-corp-silver font-mono text-xs uppercase tracking-widest">Ci sono due modi di vivere la carriera.</p>
                    </div>

                    <div className="grid md:grid-cols-2 shadow-2xl rounded-sm overflow-hidden border border-corp-platinum/10">
                        {/* THE TRAP */}
                        <div className="p-12 bg-white relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gray-200"></div>
                            <h3 className="text-xl font-mono text-gray-400 uppercase tracking-[0.2em] mb-12 text-center">Il Dipendente</h3>
                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                                        <X size={16} className="text-gray-400 group-hover:text-red-500" />
                                    </div>
                                    <span className="text-gray-500 font-light text-lg">Aspetta la "Valutazione Annuale"</span>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                                        <X size={16} className="text-gray-400 group-hover:text-red-500" />
                                    </div>
                                    <span className="text-gray-500 font-light text-lg">Si fida delle Risorse Umane</span>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                                        <X size={16} className="text-gray-400 group-hover:text-red-500" />
                                    </div>
                                    <span className="text-gray-500 font-light text-lg">Lavora di più sperando venga notato</span>
                                </div>
                            </div>
                        </div>

                        {/* THE ESCAPE */}
                        <div className="p-12 bg-corp-platinum relative overflow-hidden text-white">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-corp-gold/20 via-transparent to-transparent"></div>
                            <h3 className="text-xl font-mono text-corp-gold uppercase tracking-[0.2em] mb-12 text-center font-bold relative z-10">L'Architetto</h3>
                            <div className="space-y-8 relative z-10">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-8 h-8 rounded-full bg-corp-gold/20 flex items-center justify-center border border-corp-gold/50">
                                        <Check size={16} className="text-corp-gold" />
                                    </div>
                                    <span className="text-white font-serif text-xl italic">Negozia Fuori Ciclo</span>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-8 h-8 rounded-full bg-corp-gold/20 flex items-center justify-center border border-corp-gold/50">
                                        <Check size={16} className="text-corp-gold" />
                                    </div>
                                    <span className="text-white font-serif text-xl italic">Usa HR come leva tattica</span>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-8 h-8 rounded-full bg-corp-gold/20 flex items-center justify-center border border-corp-gold/50">
                                        <Check size={16} className="text-corp-gold" />
                                    </div>
                                    <span className="text-white font-serif text-xl italic">Costruisce Asset di Potere</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section id="features" className="py-24 px-6 bg-gradient-to-b from-transparent via-white/50 to-transparent">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-corp-platinum">
                            L'Arsenale <span className="text-corp-gold italic">Elite</span>
                        </h2>
                        <p className="text-corp-silver font-light uppercase tracking-widest text-sm">Tecnologia + Psicologia + Strategia</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {FEATURES.map((feature, i) => (
                            <div
                                key={i}
                                className="group p-10 border border-corp-platinum/10 bg-white rounded-sm hover:border-corp-gold/50 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="p-4 bg-corp-onyx text-corp-gold rounded-sm shadow-md group-hover:scale-110 transition-transform">
                                        <feature.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-xl font-serif font-bold text-corp-platinum group-hover:text-corp-gold transition-colors">{feature.title}</h3>
                                            <span className="text-[10px] font-mono px-2 py-0.5 bg-corp-platinum text-white uppercase tracking-wider rounded-sm">
                                                {feature.tier}
                                            </span>
                                        </div>
                                        <p className="text-sm text-corp-silver/80 leading-relaxed font-light">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING SECTION - MAGAZINE STYLE */}
            <section id="pricing" className="py-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20 relative">
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-serif text-corp-platinum/5 pointer-events-none">STATUS</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 relative z-10 text-corp-platinum">
                            Scegli il tuo <span className="text-corp-gold italic">Livello</span>
                        </h2>
                        <p className="text-corp-silver font-mono text-xs uppercase tracking-[0.2em] relative z-10">Il ROI medio è 12x.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        {PRICING.map((tier) => (
                            <div
                                key={tier.id}
                                className={`relative p-8 rounded-sm transition-all duration-500 group ${tier.id === 'STRATEGIST' ? 'bg-corp-platinum text-white scale-110 shadow-2xl z-10 border-0' :
                                    'bg-white border border-corp-platinum/10 hover:border-corp-gold/30'
                                    }`}
                            >
                                <div className="text-center mb-8">
                                    <h3 className={`font-mono font-bold text-xs tracking-[0.3em] uppercase mb-4 ${tier.id === 'STRATEGIST' ? 'text-corp-gold' : 'text-corp-silver'
                                        }`}>
                                        {tier.name}
                                    </h3>
                                    <div className="flex items-baseline justify-center gap-1 mb-2">
                                        <span className={`text-4xl font-serif font-bold ${tier.id === 'STRATEGIST' ? 'text-white' : 'text-corp-platinum'
                                            }`}>{tier.price}</span>
                                        <span className={`text-xs ${tier.id === 'STRATEGIST' ? 'text-white/50' : 'text-corp-silver/50'
                                            }`}>{tier.period}</span>
                                    </div>
                                    <p className={`text-xs font-light italic ${tier.id === 'STRATEGIST' ? 'text-white/70' : 'text-corp-silver'
                                        }`}>{tier.description}</p>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className={`flex items-center gap-3 text-sm ${tier.id === 'STRATEGIST' ? 'text-white/90' : 'text-corp-platinum/80'
                                            }`}>
                                            <Check size={14} className={tier.id === 'STRATEGIST' ? 'text-corp-gold' : 'text-corp-platinum'} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={onEnterApp}
                                    className={`w-full py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all border ${tier.id === 'STRATEGIST'
                                        ? 'bg-corp-gold border-corp-gold text-corp-onyx hover:bg-white hover:text-corp-platinum'
                                        : 'bg-transparent border-corp-platinum/20 text-corp-platinum hover:border-corp-platinum hover:bg-corp-platinum hover:text-white'
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
            <section className="py-24 px-6 border-t border-corp-gold/20 bg-corp-onyx relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-corp-gold/10 via-transparent to-transparent"></div>
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <Crown size={64} className="text-corp-gold mx-auto mb-10 animate-float drop-shadow-lg" />
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight text-corp-platinum">
                        La massa aspetta.<br />
                        <span className="text-corp-gold italic">L'Elite crea.</span>
                    </h2>

                    <button
                        onClick={onEnterApp}
                        className="group px-14 py-6 bg-corp-gold text-corp-onyx font-serif font-bold uppercase tracking-[0.25em] text-lg hover:shadow-[0_0_80px_rgba(197,160,89,0.6)] hover:scale-105 transition-all duration-500 animate-golden-pulse"
                    >
                        Richiedi Accesso
                        <Sparkles size={20} className="inline ml-3" />
                    </button>

                    <p className="text-[10px] text-corp-silver/50 mt-8 font-mono tracking-widest uppercase">
                        Protocollo V5.0 // Accesso Limitato
                    </p>
                </div>
            </section>

            {/* FOOTER - LUMINEL MAGAZINE STYLE */}
            <footer className="py-16 px-6 bg-white border-t border-corp-platinum/10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img src="/luminel-logo.png" alt="LUMINEL EXECUTIVE" className="h-8 w-auto object-contain" />
                        </div>
                        <p className="text-xs text-corp-silver max-w-xs leading-relaxed">
                            Piattaforma avanzata di intelligenza strategica per la carriera.
                            <br />
                            Costruita per chi non accetta il secondo posto.
                        </p>
                        <p className="text-[10px] text-corp-silver/50 font-mono uppercase tracking-widest">
                            &copy; 2026 LUMINEL EXECUTIVE.
                        </p>
                    </div>

                    <div className="flex gap-8 text-xs font-bold text-corp-platinum uppercase tracking-widest">
                        <button onClick={() => setLegalType('privacy')} className="hover:text-corp-gold transition-colors decoration-corp-gold underline-offset-4 hover:underline">Privacy</button>
                        <button onClick={() => setLegalType('terms')} className="hover:text-corp-gold transition-colors decoration-corp-gold underline-offset-4 hover:underline">Termini</button>
                        <button onClick={() => setLegalType('disclaimer')} className="hover:text-corp-gold transition-colors decoration-corp-gold underline-offset-4 hover:underline">Info Legali</button>
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

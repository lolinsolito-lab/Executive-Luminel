import React from 'react';
import { Crown, Shield, Zap, Check, ArrowRight, Sparkles, Star, Mail } from 'lucide-react';

type Tier = 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE';

interface ThankYouPageProps {
    tier: Tier;
    userName: string;
    userEmail: string;
    onEnterApp: () => void;
}

const TIER_CONFIG = {
    GRINDER: {
        title: 'Benvenuto, Soldato',
        subtitle: 'La scalata inizia oggi.',
        icon: Shield,
        color: 'corp-silver',
        bgGradient: 'from-corp-silver/10 to-transparent',
        features: [
            'Account attivato',
            'Dashboard accessibile',
            '3 messaggi AI/giorno',
            'Strategic Map view'
        ],
        cta: 'Inizia la Scalata'
    },
    STRATEGIST: {
        title: "Benvenuto nell'Elite",
        subtitle: 'Hai accesso al Neural Codex.',
        icon: Zap,
        color: 'corp-blue',
        bgGradient: 'from-corp-blue/10 to-transparent',
        features: [
            'Account Elite attivato',
            'Neural Codex sbloccato',
            'AI Coach illimitato',
            'Sandbox Simulator attivo',
            'The Vault (Basic) accessibile'
        ],
        cta: 'Entra nella War Room'
    },
    EXECUTIVE: {
        title: 'Benvenuto nel Consiglio',
        subtitle: 'Hai il controllo totale.',
        icon: Crown,
        color: 'corp-gold',
        bgGradient: 'from-corp-gold/10 to-transparent',
        features: [
            'Account Executive attivato',
            'Full Neural Codex access',
            'Priority AI (risposta rapida)',
            'The Vault Premium completo',
            'WhatsApp Direct attivo',
            'Email support 4h'
        ],
        cta: 'Prendi il Comando'
    }
};

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
    tier,
    userName,
    userEmail,
    onEnterApp
}) => {
    const config = TIER_CONFIG[tier];
    const IconComponent = config.icon;
    const firstName = userName.split(' ')[0] || 'Executive';

    return (
        <div className="min-h-screen bg-corp-onyx flex items-center justify-center p-6">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial ${config.bgGradient} blur-3xl opacity-50`}></div>

            <div className="relative z-10 max-w-lg w-full">
                {/* Success Animation */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-${config.color}/20 border border-${config.color}/30 mb-6 animate-float`}>
                        <IconComponent size={40} className={`text-${config.color}`} />
                    </div>

                    <div className={`inline-block px-4 py-1 bg-${config.color}/10 border border-${config.color}/30 text-${config.color} text-[10px] font-mono uppercase tracking-widest mb-4`}>
                        {tier === 'GRINDER' ? '✓ FREE ACCOUNT' : '✓ PAYMENT CONFIRMED'}
                    </div>
                </div>

                {/* Main Card */}
                <div className={`bg-gradient-to-br from-[#111] to-corp-bg border border-${config.color}/30 rounded-sm p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-fade-in`}>

                    {/* Sparkle effect */}
                    <div className="absolute top-4 right-4">
                        <Sparkles size={20} className={`text-${config.color} animate-pulse`} />
                    </div>

                    {/* Greeting */}
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-corp-platinum mb-2">
                        {config.title}, <span className={`text-${config.color}`}>{firstName}</span>
                    </h1>
                    <p className="text-corp-silver mb-8">{config.subtitle}</p>

                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-2 bg-${config.color}/10 border border-${config.color}/30 rounded-sm mb-8`}>
                        <div className={`w-2 h-2 bg-${config.color} rounded-full animate-pulse`}></div>
                        <span className={`text-${config.color} text-sm font-bold font-mono`}>
                            THE {tier}
                        </span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                        {config.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className={`w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center`}>
                                    <Check size={12} className="text-emerald-400" />
                                </div>
                                <span className="text-corp-platinum text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>

                    {/* Email Confirmation */}
                    <div className="flex items-center gap-3 p-3 bg-corp-bg/50 border border-corp-border rounded-sm mb-8">
                        <Mail size={16} className="text-corp-silver" />
                        <div className="text-xs">
                            <span className="text-corp-silver">Conferma inviata a </span>
                            <span className="text-corp-platinum font-mono">{userEmail}</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={onEnterApp}
                        className={`w-full py-4 bg-${config.color} text-corp-onyx font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all group`}
                    >
                        {config.cta}
                        <ArrowRight size={16} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Footer Note */}
                <p className="text-center text-[10px] text-corp-silver font-mono mt-6">
                    LUMINEL EXECUTIVE V5.0 // Your journey to the top 1% starts now
                </p>
            </div>
        </div>
    );
};

export default ThankYouPage;

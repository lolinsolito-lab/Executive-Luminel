import React from 'react';
import { Crown, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
    onEnterApp: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEnterApp }) => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-white">

            {/* BACKGROUND: Pure White with subtle 'God Rays' */}
            <div className="absolute inset-0 bg-phoenix-marble"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]"></div>

            <div className="relative z-10 px-6 max-w-5xl mx-auto space-y-8">

                {/* LOGO: Rising Phoenix */}
                <div className="animate-fadeInUp opacity-0">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-phoenix-gold to-amber-600 rounded-lg flex items-center justify-center shadow-phoenix-shadow-levitate mb-6 transform hover:scale-105 transition-transform duration-700">
                        <Crown size={48} className="text-white" strokeWidth={1.5} />
                    </div>
                    <p className="font-sans text-sm tracking-[0.4em] text-phoenix-gold uppercase font-bold mb-4">
                        LUMINEL V7.7
                    </p>
                </div>

                {/* HEADLINE: Playfair Display */}
                <h1 className="animate-fadeInUp delay-200 opacity-0 font-display text-5xl md:text-7xl font-bold text-phoenix-ink leading-tight tracking-tight">
                    SMETTI DI SPERARE.<br />
                    <span className="text-phoenix-gold-gradient">INIZIA A CALCOLARE.</span>
                </h1>

                {/* SUB-HEADLINE */}
                <p className="animate-fadeInUp delay-500 opacity-0 font-sans text-lg md:text-xl text-phoenix-ghost font-light max-w-2xl mx-auto leading-relaxed">
                    Il Sistema Operativo che trasforma l'ambizione in matematica.<br />
                    Usato segretamente da Senior Manager in Big 4.
                </p>

                {/* CTA: Gold Button */}
                <div className="animate-fadeInUp delay-1000 opacity-0 pt-8">
                    <button onClick={onEnterApp} className="group relative px-8 py-5 bg-phoenix-gold-gradient text-white rounded-sm font-sans font-bold tracking-widest uppercase shadow-phoenix-shadow-levitate hover:shadow-phoenix-glow transition-all transform hover:-translate-y-1 overflow-hidden">
                        <span className="relative z-10 flex items-center gap-3">
                            Calcola il tuo Gap Salariale <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        {/* Shine Effect */}
                        <div className="absolute top-0 -left-full w-full h-full bg-white/30 transform skew-x-12 group-hover:animate-shine"></div>
                    </button>
                    <p className="mt-4 text-[10px] text-gray-400 font-sans tracking-wide uppercase">
                        Solo 14 licenze Tier B rimaste per Milano
                    </p>
                </div>
            </div>

            {/* SCROLL INDICATOR */}
            <div className="absolute bottom-10 animate-bounce text-phoenix-gold opacity-50">
                <span className="text-[10px] uppercase tracking-widest font-sans">Scorri verso la verità</span>
            </div>
        </section>
    );
};

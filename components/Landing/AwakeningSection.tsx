import React, { useEffect, useState } from 'react';
import { Users, Lock } from 'lucide-react';

export const AwakeningSection: React.FC = () => {
    const [scrolled, setScrolled] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative py-32 bg-slate-50 overflow-hidden">

            {/* PARALLAX BLUR BACKGROUND */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ transform: `translateY(${scrolled * 0.2}px)` }}>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop')] bg-cover bg-center grayscale filter blur-sm"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6">

                {/* THE HOOK */}
                <div className="md:flex gap-12 items-center">

                    {/* LEFT: THE STORY */}
                    <div className="flex-1 space-y-6">
                        <h2 className="font-display text-4xl font-bold text-phoenix-ink leading-tight">
                            LA NEBBIA DI GUERRA <br />
                            <span className="text-gray-400 font-sans text-xl uppercase tracking-widest block mt-2">(THE FOG)</span>
                        </h2>

                        <div className="prose prose-lg text-phoenix-ink/80 font-sans leading-relaxed border-l-4 border-phoenix-gold pl-6">
                            <p className="italic">
                                "Lavori 10 ore al giorno. Consegni tutto in tempo. Eppure, alla riunione di fine anno, la promozione va a Stefano."
                            </p>
                            <p className="font-bold text-phoenix-ink">
                                Perché?
                            </p>
                            <p>
                                Perché Stefano gioca a scacchi, tu giochi a dama. Il problema non è la tua competenza tecnica. <br />
                                <span className="bg-amber-100 px-1 text-amber-900 font-bold">Il problema è la tua cecità politica.</span>
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: LIVE COUNTER */}
                    <div className="mt-12 md:mt-0 px-8 py-10 bg-white border border-gray-200 rounded-sm shadow-phoenix-shadow-levitate text-center relative overflow-hidden group hover:border-phoenix-gold transition-colors">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full blur-2xl opacity-50"></div>

                        <Lock size={32} className="mx-auto text-red-400 mb-4" />

                        <div className="text-5xl font-display font-bold text-phoenix-ink mb-2 tabular-nums">
                            {1428 + Math.floor(scrolled / 5)}
                        </div>

                        <p className="font-sans text-[10px] uppercase tracking-widest text-red-500 font-bold mb-4">
                            Middle Managers Bloccati Oggi
                        </p>

                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-3/4 animate-pulse"></div>
                        </div>
                        <p className="text-[9px] text-gray-400 mt-2 text-left">
                            *Dati basati su analisi algoritmi HR Big 4.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

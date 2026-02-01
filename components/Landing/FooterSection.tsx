import React from 'react';
import { Crown, Linkedin, Instagram } from 'lucide-react';

export const FooterSection: React.FC = () => {
    return (
        <footer className="bg-phoenix-navy text-white py-16 border-t border-phoenix-gold/20">
            <div className="max-w-6xl mx-auto px-6">

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">

                    {/* LOGO */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-phoenix-gold rounded-sm flex items-center justify-center">
                            <Crown size={20} className="text-phoenix-navy" />
                        </div>
                        <div>
                            <h2 className="font-display font-bold text-xl tracking-widest text-white">LUMINEL</h2>
                            <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-phoenix-gold">Executive</p>
                        </div>
                    </div>

                    {/* LINKS */}
                    <div className="flex gap-8 font-sans text-xs font-bold uppercase tracking-widest text-gray-400">
                        <a href="#" className="hover:text-phoenix-gold transition-colors">Manifesto</a>
                        <a href="#" className="hover:text-phoenix-gold transition-colors">Pricing</a>
                        <a href="#" className="hover:text-phoenix-gold transition-colors">Login</a>
                    </div>

                    {/* SOCIAL */}
                    <div className="flex gap-4">
                        <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-phoenix-gold hover:text-phoenix-navy transition-colors">
                            <Linkedin size={18} />
                        </a>
                        <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-phoenix-gold hover:text-phoenix-navy transition-colors">
                            <Instagram size={18} />
                        </a>
                    </div>
                </div>

                {/* THE SEAL */}
                <div className="text-center pt-16 border-t border-white/5">
                    <p className="font-display text-2xl font-bold text-white mb-4">
                        "Entra nell'1%. O lavora per loro."
                    </p>
                    <p className="font-sans text-[10px] text-gray-600 uppercase tracking-wider">
                        © 2026 Insolito Lab. All rights reserved. <br />
                        System Status: <span className="text-emerald-500">Online</span>
                    </p>
                </div>

            </div>
        </footer>
    );
};

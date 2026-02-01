import React, { useState, useEffect } from 'react';

interface SmartNavbarProps {
    onLoginClick: () => void;
    onGenesisClick: () => void;
}

export const SmartNavbar: React.FC<SmartNavbarProps> = ({ onLoginClick, onGenesisClick }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* BRANDING */}
                <div className="flex items-center gap-3">
                    <img
                        src="/favicon.png"
                        alt="Luminel Logo"
                        className="w-8 h-8 object-contain"
                    />
                    <span className={`font-display font-bold tracking-widest uppercase text-sm ${scrolled ? 'text-phoenix-ink' : 'text-phoenix-ink' // Always dark as bg is white/transparent on white
                        }`}>
                        Executive Luminel
                    </span>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={onLoginClick}
                        className={`font-sans text-xs font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-phoenix-ghost hover:text-phoenix-gold' : 'text-phoenix-ghost hover:text-phoenix-ink'
                            }`}
                    >
                        Login
                    </button>

                    <button
                        onClick={onGenesisClick}
                        className="hidden md:block px-5 py-2 bg-phoenix-navy text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-phoenix-gold transition-colors"
                    >
                        Accesso Elitario
                    </button>

                    {/* Mobile Menu Trigger (Optional) */}
                </div>
            </div>
        </nav>
    );
};

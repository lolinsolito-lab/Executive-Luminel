import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, Lock, User, ArrowRight, Loader, Building2, Fingerprint } from 'lucide-react';

interface AuthPageProps {
    mode: 'login' | 'register' | 'recover';
    onSuccess: () => void;
    onSwitchMode: (mode: 'login' | 'register' | 'recover') => void;
    genesisData?: {
        currentSalary: number;
        targetSalary: number;
        mainEnemy: string;
        companyName: string;
    };
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode, onSuccess, onSwitchMode, genesisData }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (mode === 'recover') {
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin
                });
                if (error) throw error;
                setMessage("Protocollo di ripristino avviato. Controlla la posta crittografata.");
            } else if (mode === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                if (error) throw error;
                onSuccess();
            } else {
                // REGISTER with Genesis Data
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                            company_name: genesisData?.companyName || null,
                            // Genesis specific metadata can be stored in user_metadata too
                            genesis_enemy: genesisData?.mainEnemy,
                            genesis_gap: genesisData ? (genesisData.targetSalary - genesisData.currentSalary) : 0
                        }
                    }
                });
                if (error) throw error;
                onSuccess();
            }
        } catch (err: any) {
            setError(err.message || "Errore di autenticazione. Riprovare.");
        } finally {
            setLoading(false);
        }
    };

    // Calculate Gap for Register View
    const gap = genesisData ? (genesisData.targetSalary - genesisData.currentSalary) : 0;

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative bg-corp-onyx overflow-hidden">
            {/* Background Assets */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-corp-onyx via-transparent to-corp-onyx z-0"></div>

            {/* Main Terminal Card */}
            <div className="relative z-10 w-full max-w-md bg-corp-onyx/80 backdrop-blur-xl border border-corp-border/50 p-8 shadow-2xl animate-scale-in">
                {/* Header Decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-corp-gold to-transparent opacity-50"></div>
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-corp-gold/10 rounded-full flex items-center justify-center border border-corp-gold/30 animate-pulse">
                        <Fingerprint className="text-corp-gold" size={24} />
                    </div>
                </div>

                {/* Dynamic Headlines */}
                <div className="text-center mb-8">
                    <h1 className="font-display font-bold text-2xl text-corp-platinum tracking-widest uppercase mb-2">
                        {mode === 'login' && "TERMINALE ESECUTIVO"}
                        {mode === 'register' && "INIZIA L'ASCESA"}
                        {mode === 'recover' && "RIPRISTINO ACCESSO"}
                    </h1>

                    {/* GAP REVEAL (The Hook) */}
                    {mode === 'register' && gap > 0 && (
                        <div className="mb-4 inline-block px-3 py-1 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-xs font-mono">
                            GAP ATTUALE: -€{gap.toLocaleString()} / ANNO
                        </div>
                    )}

                    <p className="text-xs text-corp-silver font-sans tracking-wide">
                        {mode === 'login' && "Identificazione richiesta. Inserire credenziali."}
                        {mode === 'register' && "Salva il protocollo Genesis. Neutralizza il gap."}
                        {mode === 'recover' && "Inserire email per token di recupero."}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleAuth} className="space-y-5">
                    {mode === 'register' && (
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-corp-silver tracking-wider">Identità (Nome)</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver group-focus-within:text-corp-gold transition-colors" size={16} />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    placeholder="Nome Cognome"
                                    className="w-full bg-black/40 border-b border-corp-border focus:border-corp-gold py-3 pl-10 text-corp-platinum placeholder-corp-silver/30 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-corp-silver tracking-wider">Email Aziendale</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver group-focus-within:text-corp-gold transition-colors" size={16} />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full bg-black/40 border-b border-corp-border focus:border-corp-gold py-3 pl-10 text-corp-platinum placeholder-corp-silver/30 focus:outline-none transition-colors"
                                required
                            />
                        </div>
                    </div>

                    {mode !== 'recover' && (
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-corp-silver tracking-wider">Chiave di Accesso</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver group-focus-within:text-corp-gold transition-colors" size={16} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-black/40 border-b border-corp-border focus:border-corp-gold py-3 pl-10 text-corp-platinum placeholder-corp-silver/30 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 bg-red-900/20 border-l-2 border-red-500 text-red-400 text-xs">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="p-3 bg-emerald-900/20 border-l-2 border-emerald-500 text-emerald-400 text-xs">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-corp-gold hover:bg-amber-500 text-corp-onyx font-bold uppercase tracking-widest text-sm transition-all shadow-lg hover:shadow-corp-gold/20 flex items-center justify-center gap-2 group"
                    >
                        {loading ? <Loader className="animate-spin" size={18} /> : (
                            <>
                                {mode === 'login' ? 'ACCESSO AL TERMINALE' : (mode === 'register' ? 'ESEGUI PROTOCOLLO' : 'INVIA TOKEN')}
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Links */}
                <div className="mt-8 flex justify-between items-center text-xs border-t border-white/5 pt-4">
                    {mode === 'login' ? (
                        <>
                            <button onClick={() => onSwitchMode('recover')} className="text-corp-silver hover:text-white transition-colors">Recupero Password</button>
                            <button onClick={() => onSwitchMode('register')} className="text-corp-gold hover:text-white transition-colors">Nuovo Agente?</button>
                        </>
                    ) : (
                        <button onClick={() => onSwitchMode('login')} className="w-full text-center text-corp-silver hover:text-gold transition-colors">
                            Torna al Login Esecutivo
                        </button>
                    )}
                </div>
            </div>

            {/* Disclaimer Footer */}
            <div className="absolute bottom-4 text-[10px] text-white/20 font-mono text-center w-full">
                SECURE CONNECTION // 256-BIT ENCRYPTION // LUMINEL CORP v7.9
            </div>
        </div>
    );
};

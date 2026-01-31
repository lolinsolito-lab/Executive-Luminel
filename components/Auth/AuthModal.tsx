
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { X, Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialMode?: 'login' | 'signup' | 'recover' | 'update';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, initialMode = 'login' }) => {
    const [isLogin, setIsLogin] = useState(initialMode === 'login');
    const [isRecover, setIsRecover] = useState(initialMode === 'recover');
    const [isUpdate, setIsUpdate] = useState(initialMode === 'update');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (isRecover) {
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin
                });
                if (error) throw error;
                setMessage("Link di recupero inviato. Controlla la tua email.");
            } else if (isUpdate) {
                const { error } = await supabase.auth.updateUser({ password: password });
                if (error) throw error;
                setMessage("Password aggiornata con successo.");
                setTimeout(() => {
                    onSuccess();
                    onClose();
                }, 1500);
            } else if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                if (error) throw error;
                onSuccess();
                onClose();
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        }
                    }
                });
                if (error) throw error;
                onSuccess();
                onClose();
            }
        } catch (err: any) {
            setError(err.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="bg-corp-onyx border border-corp-border/50 rounded-lg w-full max-w-md shadow-2xl animate-scale-in relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-corp-gold to-transparent opacity-50"></div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-corp-silver hover:text-corp-gold transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    <h2 className="text-2xl font-display font-bold text-center text-corp-platinum mb-2">
                        {isUpdate ? 'Nuova Password' : (isRecover ? 'Recupero Password' : (isLogin ? 'Bentornato, Executive' : 'Inizia la scalata'))}
                    </h2>
                    <p className="text-center text-corp-silver/60 text-sm mb-8">
                        {isUpdate ? 'Imposta la tua nuova password sicura' : (isRecover ? 'Inserisci la tua email aziendale' : (isLogin ? 'Accedi al tuo terminale strategico' : 'Crea il tuo profilo e accedi al vault'))}
                    </p>

                    <form onSubmit={handleAuth} className="space-y-4">
                        {!isLogin && !isRecover && !isUpdate && (
                            <div className="space-y-1">
                                <label className="text-xs font-mono text-corp-silver uppercase tracking-wider">Nome Completo</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver/50" size={16} />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full bg-white border border-corp-border/30 rounded p-2 pl-10 text-corp-platinum placeholder:text-corp-silver/40 focus:border-corp-gold focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                        required={!isLogin && !isRecover && !isUpdate}
                                    />
                                </div>
                            </div>
                        )}

                        {!isUpdate && (
                            <div className="space-y-1">
                                <label className="text-xs font-mono text-corp-silver uppercase tracking-wider">Email Aziendale</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver/50" size={16} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white border border-corp-border/30 rounded p-2 pl-10 text-corp-platinum placeholder:text-corp-silver/40 focus:border-corp-gold focus:outline-none transition-colors"
                                        placeholder="name@company.com"
                                        required={!isUpdate}
                                    />
                                </div>
                            </div>
                        )}

                        {!isRecover && (
                            <div className="space-y-1">
                                <label className="text-xs font-mono text-corp-silver uppercase tracking-wider">{isUpdate ? 'Nuova Password' : 'Password'}</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver/50" size={16} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white border border-corp-border/30 rounded p-2 pl-10 text-corp-platinum placeholder:text-corp-silver/40 focus:border-corp-gold focus:outline-none transition-colors"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-red-600 text-xs text-center font-medium">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="p-3 bg-emerald-900/10 border border-emerald-500/30 rounded text-emerald-600 text-xs text-center font-medium">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-corp-gold hover:bg-corp-gold-hover text-black font-bold rounded flex items-center justify-center gap-2 transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? <Loader className="animate-spin" size={18} /> : (
                                <>
                                    {isUpdate ? 'AGGIORNA PASSWORD' : (isRecover ? 'INVIA LINK DI RECUPERO' : (isLogin ? 'ACCEDI AL SISTEMA' : 'REGISTRA ACCOUNT'))}
                                    {!isRecover && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 flex flex-col gap-2 text-center">
                        {!isRecover ? (
                            <>
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-xs text-corp-silver hover:text-corp-gold transition-colors underline decoration-dotted"
                                >
                                    {isLogin ? 'Non hai un account? Registrati' : 'Hai già un account? Accedi'}
                                </button>
                                {isLogin && (
                                    <button
                                        onClick={() => setIsRecover(true)}
                                        className="text-[10px] text-corp-silver/60 hover:text-corp-platinum transition-colors"
                                    >
                                        Password dimenticata?
                                    </button>
                                )}
                            </>
                        ) : (
                            <button
                                onClick={() => { setIsRecover(false); setIsLogin(true); }}
                                className="text-xs text-corp-silver hover:text-corp-gold transition-colors"
                            >
                                Torna al login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

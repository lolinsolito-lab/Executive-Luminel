
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { X, Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                if (error) throw error;
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
            }
            onSuccess();
            onClose();
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
                        {isLogin ? 'Bentornato, Executive' : 'inizia la scalata'}
                    </h2>
                    <p className="text-center text-corp-silver/60 text-sm mb-8">
                        {isLogin ? 'Accedi al tuo terminale strategico' : 'Crea il tuo profilo e accedi al vault'}
                    </p>

                    <form onSubmit={handleAuth} className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-1">
                                <label className="text-xs font-mono text-corp-silver uppercase tracking-wider">Nome Completo</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver/50" size={16} />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full bg-black/40 border border-corp-border rounded p-2 pl-10 text-corp-platinum focus:border-corp-gold focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-mono text-corp-silver uppercase tracking-wider">Email Aziendale</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver/50" size={16} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/40 border border-corp-border rounded p-2 pl-10 text-corp-platinum focus:border-corp-gold focus:outline-none transition-colors"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-mono text-corp-silver uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver/50" size={16} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/40 border border-corp-border rounded p-2 pl-10 text-corp-platinum focus:border-corp-gold focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-red-400 text-xs text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-corp-gold hover:bg-corp-gold-hover text-black font-bold rounded flex items-center justify-center gap-2 transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? <Loader className="animate-spin" size={18} /> : (
                                <>
                                    {isLogin ? 'ACCEDI AL SISTEMA' : 'REGISTRA ACCOUNT'}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-xs text-corp-silver hover:text-corp-gold transition-colors underline decoration-dotted"
                        >
                            {isLogin ? 'Non hai un account? Registrati' : 'Hai già un account? Accedi'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

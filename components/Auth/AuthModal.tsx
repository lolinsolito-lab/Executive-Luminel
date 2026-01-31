import React, { useState } from 'react';
import { X, Mail, Lock, User, Crown, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSignIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    onSignUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
    isOpen,
    onClose,
    onSignIn,
    onSignUp
}) => {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if (mode === 'signin') {
                const { error } = await onSignIn(email, password);
                if (error) throw error;
            } else {
                const { error } = await onSignUp(email, password, fullName);
                if (error) throw error;
            }
            onClose();
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setMode(mode === 'signin' ? 'signup' : 'signin');
        setError(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-corp-onyx/95 backdrop-blur-xl"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-md bg-[#0A0A0A] border border-corp-border shadow-[0_0_60px_rgba(212,175,55,0.1)] rounded-sm overflow-hidden animate-fade-in">

                {/* Header */}
                <div className="p-6 border-b border-corp-border bg-gradient-to-r from-corp-gold/10 to-transparent">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-corp-gold/20 border border-corp-gold/30 rounded-sm">
                                <Crown size={20} className="text-corp-gold" />
                            </div>
                            <div>
                                <h2 className="font-display font-bold text-lg tracking-widest text-corp-platinum uppercase">
                                    {mode === 'signin' ? 'War Room Access' : 'Join the Elite'}
                                </h2>
                                <p className="text-[10px] font-mono text-corp-silver mt-1">
                                    {mode === 'signin' ? 'Enter your credentials' : 'Create your account'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/5 rounded-full text-corp-silver hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-corp-danger/10 border border-corp-danger/30 text-corp-danger text-sm rounded-sm">
                            {error}
                        </div>
                    )}

                    {mode === 'signup' && (
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-corp-silver uppercase tracking-widest">
                                Full Name
                            </label>
                            <div className="relative">
                                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver" />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Michael Jara"
                                    className="w-full pl-10 pr-4 py-3 bg-corp-bg border border-corp-border text-corp-platinum placeholder:text-corp-silver/50 focus:border-corp-gold focus:outline-none text-sm"
                                    required={mode === 'signup'}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-corp-silver uppercase tracking-widest">
                            Email
                        </label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="w-full pl-10 pr-4 py-3 bg-corp-bg border border-corp-border text-corp-platinum placeholder:text-corp-silver/50 focus:border-corp-gold focus:outline-none text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-corp-silver uppercase tracking-widest">
                            Password
                        </label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-12 py-3 bg-corp-bg border border-corp-border text-corp-platinum placeholder:text-corp-silver/50 focus:border-corp-gold focus:outline-none text-sm"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-corp-silver hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-corp-gold text-corp-onyx font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-corp-onyx/30 border-t-corp-onyx rounded-full animate-spin"></div>
                        ) : (
                            <>
                                {mode === 'signin' ? 'Enter War Room' : 'Create Account'}
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="p-4 border-t border-corp-border bg-black/40 text-center">
                    <p className="text-xs text-corp-silver">
                        {mode === 'signin' ? (
                            <>
                                Non hai un account?{' '}
                                <button onClick={toggleMode} className="text-corp-gold hover:underline">
                                    Registrati ora
                                </button>
                            </>
                        ) : (
                            <>
                                Hai già un account?{' '}
                                <button onClick={toggleMode} className="text-corp-gold hover:underline">
                                    Accedi
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;

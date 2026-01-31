import React, { useState } from 'react';
import { X, Lock, Zap, Crown, Check, ArrowRight, Loader2 } from 'lucide-react';
import { isStripeConfigured, STRIPE_PRICES } from '../../lib/stripe';


interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentTier: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE';
    featureRequested?: string;
    userId?: string;
    userEmail?: string;
}

const TIERS = [
    {
        id: 'GRINDER',
        name: 'THE GRINDER',
        price: '€0',
        period: 'forever',
        tagline: 'La massa aspetta.',
        features: [
            'Dashboard View',
            'Strategic Map (View Only)',
            '3 messaggi AI/giorno',
        ],
        notIncluded: [
            'Out-of-Cycle Window',
            'Neural Codex Cards',
            'The Vault Templates',
        ],
        cta: 'Piano Attuale',
        disabled: true,
        style: 'border-gray-200 bg-gray-50',
        headerColor: 'text-gray-600',
    },
    {
        id: 'STRATEGIST',
        name: 'THE STRATEGIST',
        price: '€49',
        period: '/mese',
        tagline: 'Accelera la scalata.',
        popular: true,
        features: [
            'Tutto di Grinder +',
            'Out-of-Cycle Window UNLOCKED',
            'AI Chat illimitata',
            'Sandbox Simulator',
            'Neural Codex (1 card/giorno)',
            'Vault Templates Base',
        ],
        notIncluded: [],
        cta: 'Upgrade Now',
        disabled: false,
        style: 'border-blue-300 bg-blue-50 shadow-lg',
        headerColor: 'text-blue-600',
    },
    {
        id: 'EXECUTIVE',
        name: 'THE EXECUTIVE',
        price: '€299',
        period: '/mese',
        tagline: 'Per chi gioca per vincere.',
        features: [
            'Tutto di Strategist +',
            'Priority AI Support',
            'Full Neural Codex Access',
            'Premium Vault Templates',
            'Email Support 4h',
            'WhatsApp Direct Line',
        ],
        notIncluded: [],
        cta: 'Go Elite',
        disabled: false,
        style: 'border-amber-300 bg-gradient-to-br from-amber-50 to-white shadow-xl',
        headerColor: 'text-amber-600',
    },
];

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
    isOpen,
    onClose,
    currentTier,
    featureRequested,
    userId,
    userEmail
}) => {
    const [isLoading, setIsLoading] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleUpgrade = async (tierId: 'STRATEGIST' | 'EXECUTIVE') => {
        setIsLoading(tierId);

        try {
            const response = await fetch('/api/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tier: tierId,
                    userId: userId,
                    userEmail: userEmail
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Checkout creation failed:', data.error);
                alert('Errore inizializzazione checkout: ' + data.error);
                setIsLoading(null);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Errore di connessione. Riprova.');
            setIsLoading(null);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-4xl bg-white border border-amber-200 shadow-2xl rounded-sm overflow-hidden animate-fade-in">

                {/* Header - Amber instead of Red "ACCESS DENIED" */}
                <div className="p-5 border-b border-amber-200 bg-gradient-to-r from-amber-50 to-white">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 border border-amber-300 rounded-sm">
                                <Lock size={20} className="text-amber-600" />
                            </div>
                            <div>
                                <h2 className="font-display font-bold text-lg tracking-widest text-amber-700 uppercase">
                                    UPGRADE REQUIRED
                                </h2>
                                <p className="text-[10px] font-mono text-gray-500 mt-1">
                                    {featureRequested
                                        ? `Feature richiesta: ${featureRequested}`
                                        : 'Questa funzionalità richiede un upgrade'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Message */}
                <div className="p-4 border-b border-amber-100 bg-[#F9F8F2]">
                    <p className="text-center text-gray-800 font-mono text-sm">
                        <span className="text-amber-600 font-bold">La massa aspetta Dicembre.</span>
                        <br />
                        <span className="text-blue-600 font-bold">L'Elite agisce ORA.</span>
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F9F8F2]">
                    {TIERS.map((tier) => (
                        <div
                            key={tier.id}
                            className={`relative p-5 border rounded-sm transition-all duration-300 hover:scale-[1.02] ${tier.style} ${tier.id === currentTier ? 'ring-2 ring-blue-400' : ''
                                }`}
                        >
                            {/* Popular Badge */}
                            {tier.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-[9px] font-bold uppercase tracking-widest rounded-sm shadow-md">
                                    Più Popolare
                                </div>
                            )}

                            {/* Header */}
                            <div className="text-center mb-4">
                                <h3 className={`font-display font-bold text-sm tracking-widest uppercase ${tier.headerColor}`}>
                                    {tier.name}
                                </h3>
                                <div className="flex items-baseline justify-center gap-1 mt-2">
                                    <span className="text-2xl font-bold text-gray-900">{tier.price}</span>
                                    <span className="text-xs text-gray-500">{tier.period}</span>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1 italic">{tier.tagline}</p>
                            </div>

                            {/* Features */}
                            <div className="space-y-2 mb-4">
                                {tier.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                                        <Check size={12} className="text-emerald-500 shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                                {tier.notIncluded.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-gray-400 line-through">
                                        <X size={12} className="text-gray-300 shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => !tier.disabled && tier.id !== 'GRINDER' && handleUpgrade(tier.id as 'STRATEGIST' | 'EXECUTIVE')}
                                disabled={tier.disabled || tier.id === currentTier || isLoading === tier.id}
                                className={`w-full py-2.5 text-xs font-bold uppercase tracking-widest transition-all rounded-sm ${tier.id === currentTier
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : tier.disabled
                                        ? 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                                        : tier.id === 'EXECUTIVE'
                                            ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-md'
                                            : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
                                    }`}
                            >
                                {isLoading === tier.id ? (
                                    <Loader2 size={14} className="inline animate-spin" />
                                ) : (
                                    <>
                                        {tier.id === currentTier ? 'Piano Attuale' : tier.cta}
                                        {!tier.disabled && tier.id !== currentTier && (
                                            <ArrowRight size={14} className="inline ml-2" />
                                        )}
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-amber-100 bg-white text-center">
                    <p className="text-[9px] font-mono text-gray-500">
                        Pagamento sicuro via Stripe • Cancella quando vuoi • Fattura italiana disponibile
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UpgradeModal;

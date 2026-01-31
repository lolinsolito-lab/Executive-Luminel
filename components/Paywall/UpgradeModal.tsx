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

// Stripe Payment Links (created via API)
const PAYMENT_LINKS = {
    STRATEGIST: 'https://buy.stripe.com/test_eVq00ievT88MgE10GkeLv0YZe7m01',
    EXECUTIVE: 'https://buy.stripe.com/test_aFacN4gE10GkeLv0YZe7m01'
};

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
        style: 'border-corp-silver/30 bg-corp-bg/50',
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
        style: 'border-corp-blue/50 bg-corp-blue/5 shadow-[0_0_30px_rgba(0,122,255,0.15)]',
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
        style: 'border-corp-gold/50 bg-gradient-to-br from-corp-gold/10 to-transparent shadow-[0_0_40px_rgba(212,175,55,0.2)]',
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

        // For now, open Stripe Payment Link (replace URLs when you create them)
        let paymentLink = PAYMENT_LINKS[tierId];

        if (paymentLink.includes('PLACEHOLDER')) {
            alert(`⚠️ Stripe Payment Link non configurato per ${tierId}.\n\nCrea un Payment Link in Stripe Dashboard e aggiorna PAYMENT_LINKS nel codice.`);
            setIsLoading(null);
            return;
        }

        // Add tracking params
        if (userId) paymentLink += `?client_reference_id=${userId}`;
        if (userEmail) paymentLink += `${userId ? '&' : '?'}prefilled_email=${encodeURIComponent(userEmail)}`;

        // Redirect to Stripe
        window.open(paymentLink, '_blank');
        setIsLoading(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-corp-onyx/95 backdrop-blur-xl"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-4xl bg-[#0A0A0A] border border-corp-danger/30 shadow-[0_0_60px_rgba(255,59,48,0.2)] rounded-sm overflow-hidden animate-fade-in">

                {/* ACCESS DENIED Header */}
                <div className="p-6 border-b border-corp-danger/30 bg-gradient-to-r from-corp-danger/10 to-transparent">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-corp-danger/20 border border-corp-danger/30 rounded-sm">
                                <Lock size={20} className="text-corp-danger" />
                            </div>
                            <div>
                                <h2 className="font-display font-bold text-lg tracking-widest text-corp-danger uppercase">
                                    ACCESS DENIED
                                </h2>
                                <p className="text-[10px] font-mono text-corp-silver mt-1">
                                    {featureRequested
                                        ? `Feature richiesta: ${featureRequested}`
                                        : 'Questa funzionalità richiede un upgrade'}
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

                {/* Message */}
                <div className="p-6 border-b border-corp-border bg-corp-bg/50">
                    <p className="text-center text-corp-platinum font-mono text-sm">
                        <span className="text-corp-gold">La massa aspetta Dicembre.</span>
                        <br />
                        <span className="text-corp-blue font-bold">L'Elite agisce ORA.</span>
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {TIERS.map((tier) => (
                        <div
                            key={tier.id}
                            className={`relative p-5 border rounded-sm transition-all duration-300 hover:scale-[1.02] ${tier.style} ${tier.id === currentTier ? 'ring-2 ring-corp-blue' : ''
                                }`}
                        >
                            {/* Popular Badge */}
                            {tier.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-corp-blue text-white text-[9px] font-bold uppercase tracking-widest rounded-sm">
                                    Più Popolare
                                </div>
                            )}

                            {/* Header */}
                            <div className="text-center mb-4">
                                <h3 className={`font-display font-bold text-sm tracking-widest uppercase ${tier.id === 'EXECUTIVE' ? 'text-corp-gold' :
                                    tier.id === 'STRATEGIST' ? 'text-corp-blue' : 'text-corp-silver'
                                    }`}>
                                    {tier.name}
                                </h3>
                                <div className="flex items-baseline justify-center gap-1 mt-2">
                                    <span className="text-2xl font-bold text-corp-platinum">{tier.price}</span>
                                    <span className="text-xs text-corp-silver">{tier.period}</span>
                                </div>
                                <p className="text-[10px] text-corp-silver mt-1 italic">{tier.tagline}</p>
                            </div>

                            {/* Features */}
                            <div className="space-y-2 mb-4">
                                {tier.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-corp-platinum/80">
                                        <Check size={12} className="text-emerald-500 shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                                {tier.notIncluded.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-corp-silver/50 line-through">
                                        <X size={12} className="text-corp-danger/50 shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => !tier.disabled && tier.id !== 'GRINDER' && handleUpgrade(tier.id as 'STRATEGIST' | 'EXECUTIVE')}
                                disabled={tier.disabled || tier.id === currentTier}
                                className={`w-full py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${tier.id === currentTier
                                    ? 'bg-corp-silver/20 text-corp-silver cursor-not-allowed'
                                    : tier.disabled
                                        ? 'bg-corp-bg border border-corp-silver/30 text-corp-silver cursor-not-allowed'
                                        : tier.id === 'EXECUTIVE'
                                            ? 'bg-corp-gold text-corp-onyx hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]'
                                            : 'bg-corp-blue text-white hover:shadow-[0_0_20px_rgba(0,122,255,0.5)]'
                                    }`}
                            >
                                {tier.id === currentTier ? 'Piano Attuale' : tier.cta}
                                {!tier.disabled && tier.id !== currentTier && (
                                    <ArrowRight size={14} className="inline ml-2" />
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-corp-border bg-black/40 text-center">
                    <p className="text-[9px] font-mono text-corp-silver">
                        Pagamento sicuro via Stripe • Cancella quando vuoi • Fattura italiana disponibile
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UpgradeModal;

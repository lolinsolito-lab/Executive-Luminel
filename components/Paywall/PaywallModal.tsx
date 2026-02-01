import React from 'react';
import { X, Crown, Zap, Lock, ArrowRight } from 'lucide-react';

interface PaywallModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'token-depleted' | 'free-limit' | 'vault-locked' | 'feature-locked';
    currentTier: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE';
    onUpgrade?: () => void;
}

// V7 PHOENIX - Paywall Modal
export const PaywallModal: React.FC<PaywallModalProps> = ({
    isOpen,
    onClose,
    type,
    currentTier,
    onUpgrade
}) => {
    if (!isOpen) return null;

    const getContent = () => {
        switch (type) {
            case 'free-limit':
                return {
                    icon: Lock,
                    title: 'VISIONE OSCURATA',
                    subtitle: 'Limite giornaliero raggiunto',
                    message: 'Hai esaurito i tuoi 3 messaggi gratuiti. Per vedere oltre la nebbia, acquista Token.',
                    cta: 'Diventa Operativo (€49/mese)',
                    ctaStyle: 'bg-phoenix-tier-operative hover:bg-blue-600',
                };
            case 'token-depleted':
                return {
                    icon: Zap,
                    title: 'MUNIZIONI ESAURITE',
                    subtitle: 'Token mensili terminati',
                    message: 'Hai usato tutti i 50 colpi di questo mese. Ricarica o passa a Executive per accesso illimitato.',
                    cta: 'Passa a God Mode (€299/mese)',
                    ctaStyle: 'bg-phoenix-gold hover:bg-amber-600',
                };
            case 'vault-locked':
                return {
                    icon: Lock,
                    title: 'VAULT BLOCCATO',
                    subtitle: 'Accesso riservato',
                    message: 'I documenti classificati sono riservati ai membri Executive. Sblocca il Vault completo.',
                    cta: 'Sblocca Vault (€299/mese)',
                    ctaStyle: 'bg-phoenix-gold hover:bg-amber-600',
                };
            case 'feature-locked':
            default:
                return {
                    icon: Crown,
                    title: 'ACCESSO NEGATO',
                    subtitle: 'Funzionalità riservata',
                    message: 'Questa funzionalità è disponibile solo per i membri di livello superiore.',
                    cta: currentTier === 'GRINDER' ? 'Diventa Operativo (€49/mese)' : 'Passa a God Mode (€299/mese)',
                    ctaStyle: currentTier === 'GRINDER' ? 'bg-phoenix-tier-operative hover:bg-blue-600' : 'bg-phoenix-gold hover:bg-amber-600',
                };
        }
    };

    const content = getContent();
    const Icon = content.icon;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-phoenix-ink/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white border border-gray-200 shadow-2xl rounded-sm overflow-hidden animate-fade-in">
                {/* Red/Gold Accent Bar */}
                <div className={`h-1 w-full ${type === 'token-depleted' || type === 'vault-locked' ? 'bg-phoenix-gold' : 'bg-red-500'}`}></div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-sm text-phoenix-ghost hover:text-phoenix-ink transition-colors"
                >
                    <X size={18} />
                </button>

                {/* Content */}
                <div className="p-8 text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-6 bg-phoenix-navy rounded-full flex items-center justify-center">
                        <Icon size={32} className="text-phoenix-gold" />
                    </div>

                    {/* Title */}
                    <h2 className="font-display font-bold text-2xl text-phoenix-ink tracking-wide mb-2">
                        {content.title}
                    </h2>
                    <p className="text-sm text-phoenix-ghost uppercase tracking-widest mb-6">
                        {content.subtitle}
                    </p>

                    {/* Message */}
                    <p className="text-phoenix-ghost leading-relaxed mb-8">
                        {content.message}
                    </p>

                    {/* CTA */}
                    <button
                        onClick={onUpgrade}
                        className={`w-full py-4 text-white font-sans text-sm font-bold uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 ${content.ctaStyle}`}
                    >
                        {content.cta}
                        <ArrowRight size={16} />
                    </button>

                    {/* Secondary Action */}
                    <button
                        onClick={onClose}
                        className="mt-4 text-sm text-phoenix-ghost hover:text-phoenix-ink transition-colors"
                    >
                        Continua con il piano attuale
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaywallModal;

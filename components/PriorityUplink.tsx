import React from 'react';
import { MessageCircle, Crown } from 'lucide-react';

interface PriorityUplinkProps {
    isVisible: boolean;
    whatsappNumber?: string;
}

// V7 PHOENIX - Priority Uplink Button (Executive Only)
export const PriorityUplink: React.FC<PriorityUplinkProps> = ({
    isVisible,
    whatsappNumber = '+393000000000' // Placeholder - replace with real number
}) => {
    if (!isVisible) return null;

    const handleClick = () => {
        const message = encodeURIComponent('Ciao, sono un membro Executive di Luminel. Ho bisogno di supporto prioritario.');
        window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 left-6 z-40 flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-phoenix-gold to-amber-600 text-white font-sans text-sm font-bold uppercase tracking-widest rounded-sm shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-phoenix-gold transition-all animate-pulse-slow"
        >
            <MessageCircle size={18} />
            <span>Priority Uplink</span>
            <Crown size={14} className="opacity-70" />
        </button>
    );
};

export default PriorityUplink;

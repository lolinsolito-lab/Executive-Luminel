
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'privacy' | 'terms' | 'cookies' | 'disclaimer' | null;
}

const LEGAL_CONTENT = {
    privacy: {
        title: "Privacy Policy",
        content: `
            <p><strong>Ultimo aggiornamento: Gennaio 2026</strong></p>
            <p>La tua privacy è fondamentale per LUMINEL EXECUTIVE. Questa informativa descrive come raccogliamo, utilizziamo e proteggiamo i tuoi dati.</p>
            
            <h3>1. Raccolta Dati</h3>
            <p>Raccogliamo solo i dati essenziali per fornire il servizio: email, nome, e dati di utilizzo della piattaforma per migliorare l'esperienza strategica.</p>
            
            <h3>2. Utilizzo</h3>
            <p>I dati vengono utilizzati per personalizzare il coaching AI, gestire l'abbonamento e garantire la sicurezza dell'account.</p>
            
            <h3>3. Protezione</h3>
            <p>Utilizziamo crittografia di livello bancario per proteggere tutte le comunicazioni e i dati archiviati.</p>
        `
    },
    terms: {
        title: "Termini di Servizio",
        content: `
            <p><strong>Ultimo aggiornamento: Gennaio 2026</strong></p>
            <p>Benvenuto nell'elite. L'utilizzo di LUMINEL EXECUTIVE è soggetto ai seguenti termini.</p>
            
            <h3>1. Accesso</h3>
            <p>L'accesso è strettamente personale. La condivisione delle credenziali comporterà la sospensione immediata dell'account senza rimborso.</p>
            
            <h3>2. Responsabilità</h3>
            <p>LUMINEL fornisce consulenza strategica basata su AI. Le decisioni finali restano esclusiva responsabilità dell'utente.</p>
            
            <h3>3. Condotta</h3>
            <p>Ci aspettiamo un comportamento professionale e rispettoso all'interno della piattaforma.</p>
        `
    },
    cookies: {
        title: "Cookie Policy",
        content: `
            <p>Utilizziamo cookie tecnici essenziali per il funzionamento della piattaforma e cookie analitici anonimi per migliorare le prestazioni.</p>
            <p>Non utilizziamo cookie di profilazione pubblicitaria di terze parti.</p>
        `
    },
    disclaimer: {
        title: "Disclaimer Legale",
        content: `
            <p>LUMINEL EXECUTIVE è uno strumento di supporto decisionale basato sull'Intelligenza Artificiale.</p>
            <p>Non fornisce consulenza legale, finanziaria o medica certificata. Per questioni critiche, consultare sempre un professionista qualificato nel settore specifico.</p>
        `
    }
};

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !type) return null;

    const data = LEGAL_CONTENT[type];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div
                ref={modalRef}
                className="bg-corp-onyx border border-corp-border/50 rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-scale-in"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-corp-border/30">
                    <h2 className="text-xl font-display font-medium text-corp-platinum tracking-wide">
                        {data.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-corp-silver hover:text-corp-gold transition-colors p-2 rounded-full hover:bg-white/5"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto custom-scrollbar text-corp-silver/80 leading-relaxed space-y-4">
                    <div dangerouslySetInnerHTML={{ __html: data.content }} className="prose prose-invert prose-p:font-light prose-headings:text-corp-platinum prose-headings:font-display prose-headings:font-normal" />
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-corp-border/30 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-transparent border border-corp-border rounded hover:border-corp-gold text-corp-silver hover:text-corp-gold transition-all duration-300 text-sm tracking-wider uppercase font-medium"
                    >
                        Chiudi
                    </button>
                </div>
            </div>
        </div>
    );
};

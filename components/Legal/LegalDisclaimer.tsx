import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckSquare, ArrowRight, FileText } from 'lucide-react';

interface LegalDisclaimerProps {
    onAccept: () => void;
}

export const LegalDisclaimer: React.FC<LegalDisclaimerProps> = ({ onAccept }) => {
    const [accepted, setAccepted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const hasAccepted = localStorage.getItem('luminel_legal_accepted');
        if (!hasAccepted) {
            setVisible(true);
        }
    }, []);

    const handleConfirm = () => {
        if (accepted) {
            localStorage.setItem('luminel_legal_accepted', new Date().toISOString());
            setVisible(false);
            onAccept();
        }
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
            <div className="bg-corp-onyx border border-red-500/30 rounded-lg max-w-lg w-full p-8 shadow-[0_0_50px_rgba(255,0,0,0.1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>

                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20 animate-pulse">
                        <ShieldAlert size={32} className="text-red-500" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-corp-platinum tracking-wide">
                        PROTOCOLLO DI RESPONSABILITÀ
                    </h2>
                    <p className="text-corp-silver text-sm mt-2">
                        ATTENZIONE: Stai entrando in un simulatore strategico.
                    </p>
                </div>

                <div className="bg-black/40 border border-corp-border p-4 rounded text-xs text-corp-silver mb-6 text-left space-y-3 font-mono h-40 overflow-y-auto custom-scrollbar">
                    <p>
                        <strong>1. FINALITÀ EDUCATIVA:</strong> Luminel è un AI Strategic Coach. I contenuti, le strategie e le simulazioni fornite hanno esclusivamente scopo educativo, di intrattenimento e di sviluppo del pensiero critico.
                    </p>
                    <p>
                        <strong>2. ESCLUSIONE DI RESPONSABILITÀ:</strong> Il servizio NON sostituisce in alcun modo la consulenza professionale legale, finanziaria, lavoristica, psicologica o medica. L'uso delle strategie suggerite è a completa discrezione e rischio dell'utente.
                    </p>
                    <p>
                        <strong>3. NATURA SPERIMENTALE:</strong> L'utente riconosce che i suggerimenti sono generati da intelligenza artificiale e potrebbero non essere appropriati per ogni specifica situazione aziendale o personale. L'azienda declina ogni responsabilità per azioni intraprese sulla base di tali output.
                    </p>
                </div>

                <div className="flex items-start gap-3 mb-6 p-3 bg-red-500/5 rounded border border-transparent hover:border-red-500/20 transition-colors cursor-pointer" onClick={() => setAccepted(!accepted)}>
                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${accepted ? 'bg-red-500 border-red-500' : 'border-corp-silver/50'}`}>
                        {accepted && <CheckSquare size={14} className="text-white" />}
                    </div>
                    <p className="text-xs text-corp-silver text-left select-none">
                        Dichiaro di aver letto, compreso e accettato i <span className="text-corp-gold underline">Termini di Servizio</span> e l'esclusione di responsabilità. Confermo di procedere a mio rischio e pericolo.
                    </p>
                </div>

                <button
                    onClick={handleConfirm}
                    disabled={!accepted}
                    className={`w-full py-4 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all rounded ${accepted
                            ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg cursor-pointer'
                            : 'bg-corp-border/20 text-corp-silver/40 cursor-not-allowed'
                        }`}
                >
                    {accepted ? (
                        <>ACCETTO E ENTRO <ArrowRight size={16} /></>
                    ) : (
                        <>ACCETTAZIONE RICHIESTA <FileText size={16} /></>
                    )}
                </button>
            </div>
        </div>
    );
};

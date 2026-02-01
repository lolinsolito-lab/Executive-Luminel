import React from 'react';
import { X, AlertTriangle, RefreshCw, MessageCircle } from 'lucide-react';

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    errorType: 'network' | 'ai-overload' | 'session-expired' | 'generic';
    errorMessage?: string;
    onRetry?: () => void;
}

// V7 PHOENIX - Error Modal
export const ErrorModal: React.FC<ErrorModalProps> = ({
    isOpen,
    onClose,
    errorType,
    errorMessage,
    onRetry
}) => {
    if (!isOpen) return null;

    const getContent = () => {
        switch (errorType) {
            case 'network':
                return {
                    title: 'CONNESSIONE PERSA',
                    subtitle: 'Network Error',
                    message: 'Impossibile raggiungere i server. Verifica la tua connessione internet.',
                    canRetry: true,
                };
            case 'ai-overload':
                return {
                    title: 'ARCHITECT SOVRACCARICO',
                    subtitle: 'AI Processing Error',
                    message: 'L\'Architect sta elaborando troppe richieste. Riprova tra qualche secondo.',
                    canRetry: true,
                };
            case 'session-expired':
                return {
                    title: 'SESSIONE SCADUTA',
                    subtitle: 'Session Expired',
                    message: 'La tua sessione è scaduta per inattività. Ricarica la pagina per continuare.',
                    canRetry: false,
                };
            case 'generic':
            default:
                return {
                    title: 'ERRORE DI SISTEMA',
                    subtitle: 'System Error',
                    message: errorMessage || 'Si è verificato un errore imprevisto. Il team è stato notificato.',
                    canRetry: true,
                };
        }
    };

    const content = getContent();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-phoenix-ink/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-sm bg-white border border-gray-200 shadow-2xl rounded-sm overflow-hidden animate-fade-in">
                {/* Red Accent Bar */}
                <div className="h-1 w-full bg-red-500"></div>

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
                    <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center border-2 border-red-200">
                        <AlertTriangle size={32} className="text-red-500" />
                    </div>

                    {/* Title */}
                    <h2 className="font-display font-bold text-xl text-phoenix-ink tracking-wide mb-2">
                        {content.title}
                    </h2>
                    <p className="text-[10px] text-phoenix-ghost uppercase tracking-widest mb-6">
                        // {content.subtitle} //
                    </p>

                    {/* Message */}
                    <p className="text-phoenix-ghost leading-relaxed mb-8 text-sm">
                        {content.message}
                    </p>

                    {/* Actions */}
                    <div className="space-y-3">
                        {content.canRetry && onRetry && (
                            <button
                                onClick={onRetry}
                                className="w-full py-3 bg-phoenix-navy text-white font-sans text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCw size={16} />
                                Riprova
                            </button>
                        )}

                        {errorType === 'session-expired' && (
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-3 bg-phoenix-navy text-white font-sans text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCw size={16} />
                                Ricarica Pagina
                            </button>
                        )}

                        <button
                            onClick={onClose}
                            className="w-full py-2 text-sm text-phoenix-ghost hover:text-phoenix-ink transition-colors"
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;

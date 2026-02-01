import React, { useState } from 'react';
import { Crown, ArrowRight, ShieldAlert, Target, DollarSign, Building2, Lock, MapPin } from 'lucide-react';

interface GenesisModalProps {
    isOpen: boolean;
    onComplete: (data: { currentSalary: number; targetSalary: number; mainEnemy: string; companyName: string; location: string }) => void;
}

export const GenesisModal: React.FC<GenesisModalProps> = ({ isOpen, onComplete }) => {
    const [step, setStep] = useState(1);
    const [currentSalary, setCurrentSalary] = useState('');
    const [targetSalary, setTargetSalary] = useState('');
    const [mainEnemy, setMainEnemy] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');

    if (!isOpen) return null;

    const gap = (parseInt(targetSalary) || 0) - (parseInt(currentSalary) || 0);

    const handleNext = () => {
        if (step < 6) {
            setStep(prev => prev + 1);
        } else {
            onComplete({
                currentSalary: parseInt(currentSalary) || 0,
                targetSalary: parseInt(targetSalary) || 0,
                mainEnemy: mainEnemy || 'The System',
                companyName: companyName || 'Unknown Corp',
                location: location || 'Milan'
            });
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-phoenix-navy/95 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-md bg-phoenix-canvas border border-phoenix-gold p-8 rounded-sm relative shadow-2xl animate-fade-in">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-phoenix-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-phoenix-gold animate-pulse">
                        <Crown size={24} className="text-phoenix-gold" />
                    </div>
                    <h2 className="font-display font-bold text-2xl text-phoenix-ink tracking-widest uppercase">
                        Genesis Protocol
                    </h2>
                    <p className="font-sans text-xs text-phoenix-ghost mt-2 tracking-wide uppercase">
                        Configuration Sequence // Step {step} of 6
                    </p>
                </div>

                {/* STEPS */}
                <div className="min-h-[140px]">
                    {step === 1 && (
                        <div className="space-y-4 animate-fade-in">
                            <label className="block font-display font-bold text-phoenix-ink text-lg">
                                Stipendio Annuo Attuale?
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-phoenix-gold" size={20} />
                                <input
                                    type="number"
                                    value={currentSalary}
                                    onChange={(e) => setCurrentSalary(e.target.value)}
                                    className="w-full bg-phoenix-snow border-b-2 border-gray-200 focus:border-phoenix-gold p-4 pl-10 text-xl font-bold text-phoenix-ink focus:outline-none transition-colors placeholder-gray-300"
                                    placeholder="45000"
                                    autoFocus
                                />
                            </div>
                            <p className="text-xs text-phoenix-ghost font-sans italic">
                                *Dati criptati. Usati per il calcolo del Costo Opportunità.
                            </p>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-fade-in">
                            <label className="block font-display font-bold text-phoenix-ink text-lg">
                                Obiettivo Salariale (Tier C)?
                            </label>
                            <div className="relative">
                                <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-phoenix-gold" size={20} />
                                <input
                                    type="number"
                                    value={targetSalary}
                                    onChange={(e) => setTargetSalary(e.target.value)}
                                    className="w-full bg-phoenix-snow border-b-2 border-gray-200 focus:border-phoenix-gold p-4 pl-10 text-xl font-bold text-phoenix-ink focus:outline-none transition-colors placeholder-gray-300"
                                    placeholder="85000"
                                    autoFocus
                                />
                            </div>
                            <p className="text-xs text-phoenix-ghost font-sans italic">
                                *Definisci il prezzo della tua ambizione.
                            </p>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4 animate-fade-in">
                            <label className="block font-display font-bold text-phoenix-ink text-lg">
                                Per quale Azienda Lavori?
                            </label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-phoenix-gold" size={20} />
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full bg-phoenix-snow border-b-2 border-gray-200 focus:border-phoenix-gold p-4 pl-10 text-xl font-bold text-phoenix-ink focus:outline-none transition-colors placeholder-gray-300"
                                    placeholder="Es. Deloitte, Accenture..."
                                    autoFocus
                                />
                            </div>
                            <p className="text-xs text-phoenix-ghost font-sans italic">
                                *Necessario per l'intelligence aziendale (Billing vs Revenue).
                            </p>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-4 animate-fade-in">
                            <label className="block font-display font-bold text-phoenix-ink text-lg">
                                Città Operativa (HQ)?
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-phoenix-gold" size={20} />
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full bg-phoenix-snow border-b-2 border-gray-200 focus:border-phoenix-gold p-4 pl-10 text-xl font-bold text-phoenix-ink focus:outline-none transition-colors placeholder-gray-300"
                                    placeholder="Es. Milano, Roma, Londra..."
                                    autoFocus
                                />
                            </div>
                            <p className="text-xs text-phoenix-ghost font-sans italic">
                                *Milano = Relazioni. Estero = Merito. L'AI si adatterà.
                            </p>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-4 animate-fade-in">
                            <label className="block font-display font-bold text-phoenix-ink text-lg">
                                Chi è il tuo Nemico Principale?
                            </label>
                            <div className="relative">
                                <ShieldAlert className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
                                <input
                                    type="text"
                                    value={mainEnemy}
                                    onChange={(e) => setMainEnemy(e.target.value)}
                                    className="w-full bg-phoenix-snow border-b-2 border-gray-200 focus:border-red-500 p-4 pl-10 text-xl font-bold text-phoenix-ink focus:outline-none transition-colors placeholder-gray-300"
                                    placeholder="Stefano? HR? Il CEO?"
                                    autoFocus
                                />
                            </div>
                            <p className="text-xs text-phoenix-ghost font-sans italic">
                                *Il Phoenix Briefing ti aiuterà a neutralizzarlo.
                            </p>
                        </div>
                    )}

                    {/* THE REVEAL STEP */}
                    {step === 6 && (
                        <div className="space-y-6 animate-fade-in text-center">
                            <label className="block font-display font-bold text-red-600 text-lg uppercase tracking-widest">
                                Report Vulnerabilità
                            </label>

                            <div className="bg-red-50 border border-red-200 p-6 rounded-sm">
                                <p className="text-xs font-mono text-gray-500 mb-2">COSTO OPPORTUNITÀ ANNUALE</p>
                                <div className="text-4xl font-bold text-red-600 font-display">
                                    -€{gap.toLocaleString()}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Stai perdendo €{Math.floor(gap / 12).toLocaleString()} al mese rimanendo nel tuo stato attuale.
                                </p>
                            </div>

                            <div className="text-left text-sm text-phoenix-ink space-y-2 font-mono bg-gray-50 p-4 rounded border border-gray-200">
                                <p>STATUS: <span className="text-red-600 font-bold">CRITICO</span></p>
                                <p>LOCATION: <span className="font-bold">{location}</span></p>
                                <p>NEMICO: <span className="font-bold">{mainEnemy}</span></p>
                                <p>SOLUZIONE: <span className="text-phoenix-gold font-bold">PROTOCOLLO PHOENIX</span></p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleNext}
                        disabled={
                            (step === 1 && !currentSalary) ||
                            (step === 2 && !targetSalary) ||
                            (step === 3 && !companyName) ||
                            (step === 4 && !location) ||
                            (step === 5 && !mainEnemy)
                        }
                        className={`flex items-center gap-2 px-6 py-4 rounded-sm font-bold uppercase tracking-widest transition-all w-full justify-center shadow-lg
                            ${step === 6
                                ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse-slow'
                                : 'bg-phoenix-gold hover:bg-amber-600 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                            }`}
                    >
                        {step === 6 ? (
                            <>
                                <Lock size={16} /> SALVA PROTOCOLLO & INIZIA
                            </>
                        ) : (
                            <>
                                PROSSIMO STEP <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};

import React, { useState } from 'react';
import { Crown, ArrowRight, ShieldAlert, Target, DollarSign } from 'lucide-react';

interface GenesisModalProps {
    isOpen: boolean;
    onComplete: (data: { currentSalary: number; targetSalary: number; mainEnemy: string }) => void;
}

export const GenesisModal: React.FC<GenesisModalProps> = ({ isOpen, onComplete }) => {
    const [step, setStep] = useState(1);
    const [currentSalary, setCurrentSalary] = useState('');
    const [targetSalary, setTargetSalary] = useState('');
    const [mainEnemy, setMainEnemy] = useState('');

    if (!isOpen) return null;

    const handleNext = () => {
        if (step < 3) {
            setStep(prev => prev + 1);
        } else {
            onComplete({
                currentSalary: parseInt(currentSalary) || 0,
                targetSalary: parseInt(targetSalary) || 0,
                mainEnemy: mainEnemy || 'The System'
            });
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-phoenix-navy/95 backdrop-blur-md">
            <div className="w-full max-w-md bg-phoenix-canvas border border-phoenix-gold p-8 rounded-sm relative shadow-2xl animate-fade-in-up">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-phoenix-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-phoenix-gold animate-pulse">
                        <Crown size={24} className="text-phoenix-gold" />
                    </div>
                    <h2 className="font-display font-bold text-2xl text-phoenix-ink tracking-widest uppercase">
                        Genesis Protocol
                    </h2>
                    <p className="font-sans text-xs text-phoenix-ghost mt-2 tracking-wide uppercase">
                        Configuration Sequence // Step {step} of 3
                    </p>
                </div>

                {/* STEPS */}
                <div className="min-h-[120px]">
                    {step === 1 && (
                        <div className="space-y-4 animate-fade-in">
                            <label className="block font-display font-bold text-phoenix-ink text-lg">
                                What is your Current Annual Salary?
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
                                *Data encrypted. Used for Opportunity Cost calculation.
                            </p>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-fade-in">
                            <label className="block font-display font-bold text-phoenix-ink text-lg">
                                What is your Target Salary (Tier C)?
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
                                *Define the price of your ambition.
                            </p>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4 animate-fade-in">
                            <label className="block font-display font-bold text-phoenix-ink text-lg">
                                Who is your Main Enemy?
                            </label>
                            <div className="relative">
                                <ShieldAlert className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
                                <input
                                    type="text"
                                    value={mainEnemy}
                                    onChange={(e) => setMainEnemy(e.target.value)}
                                    className="w-full bg-phoenix-snow border-b-2 border-gray-200 focus:border-red-500 p-4 pl-10 text-xl font-bold text-phoenix-ink focus:outline-none transition-colors placeholder-gray-300"
                                    placeholder="Stefano? The HR Manager?"
                                    autoFocus
                                />
                            </div>
                            <p className="text-xs text-phoenix-ghost font-sans italic">
                                *The Phoenix Briefing will help you neutralize them.
                            </p>
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
                            (step === 3 && !mainEnemy)
                        }
                        className="flex items-center gap-2 bg-phoenix-gold text-white px-6 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {step === 3 ? 'Initialize Dashboard' : 'Next Step'}
                        <ArrowRight size={16} />
                    </button>
                </div>

            </div>
        </div>
    );
};

import React from 'react';
import { UserProfile } from '../types';
import { TIER_GROUPS } from '../data/levels';
import { X, Lock, CheckCircle2, Crown, Zap, Shield, Target } from 'lucide-react';

interface StrategicMapModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserProfile;
}

// V7 PHOENIX - HIERARCHY MAP Modal
export const StrategicMapModal: React.FC<StrategicMapModalProps> = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    const tiers = [
        { key: 'F', group: TIER_GROUPS.F, color: 'phoenix-gold', bgClass: 'bg-amber-50', borderClass: 'border-phoenix-gold', locked: true, icon: Crown },
        { key: 'D', group: TIER_GROUPS.D, color: 'gray-400', bgClass: 'bg-gray-50', borderClass: 'border-gray-200', locked: true, icon: Lock, faded: true },
        { key: 'C', group: TIER_GROUPS.C, color: 'purple-500', bgClass: 'bg-purple-50', borderClass: 'border-purple-200', locked: true, isNext: true, icon: Target },
        { key: 'B', group: TIER_GROUPS.B, color: 'blue-500', bgClass: 'bg-blue-50', borderClass: 'border-blue-400', isCurrent: true, icon: Shield },
        { key: 'A', group: TIER_GROUPS.A, color: 'emerald-500', bgClass: 'bg-emerald-50', borderClass: 'border-emerald-200', completed: true, icon: CheckCircle2, faded: true },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-phoenix-ink/30 backdrop-blur-md transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-xl bg-phoenix-canvas border border-gray-200 shadow-2xl rounded-sm overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-5 border-b border-gray-100 bg-phoenix-snow flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="font-display font-bold text-lg tracking-widest text-phoenix-ink uppercase">Hierarchy Map</h2>
                        <p className="text-[10px] font-sans text-phoenix-gold tracking-widest mt-1 uppercase">Your Strategic Ladder</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-sm text-phoenix-ghost hover:text-phoenix-ink transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Ladder */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-phoenix-canvas">
                    {tiers.map((tier, idx) => (
                        <div
                            key={tier.key}
                            className={`
                                relative p-5 border rounded-sm transition-all duration-500
                                ${tier.borderClass} ${tier.bgClass}
                                ${tier.faded ? 'opacity-50 hover:opacity-80' : ''}
                                ${tier.isCurrent ? 'ring-2 ring-blue-400 shadow-lg' : ''}
                                ${tier.isNext ? 'hover:shadow-md hover:border-purple-400' : ''}
                                animate-ladder-rise
                            `}
                            style={{ animationDelay: `${(tiers.length - idx) * 0.1}s` }}
                        >
                            {/* Left Accent Bar */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${tier.color} rounded-l-sm`}></div>

                            <div className="flex justify-between items-start pl-4">
                                <div className="flex items-center gap-3">
                                    <tier.icon size={18} className={`text-${tier.color}`} />
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] font-bold font-sans tracking-widest border px-2 py-0.5 rounded-sm bg-white text-${tier.color}`}>
                                                TIER {tier.key}
                                            </span>
                                            {tier.isCurrent && (
                                                <span className="text-[9px] font-sans text-blue-600 font-bold bg-blue-100 px-2 py-0.5 rounded-sm">
                                                    ATTUALE
                                                </span>
                                            )}
                                            {tier.isNext && (
                                                <span className="text-[9px] font-sans text-purple-600 font-bold bg-purple-100 px-2 py-0.5 rounded-sm flex items-center gap-1">
                                                    <Lock size={10} /> PROSSIMO
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-display font-bold text-phoenix-ink text-lg">{tier.group.subtitle}</h3>
                                        {tier.group.mission && (
                                            <p className="text-sm text-phoenix-ghost font-sans italic mt-1">"{tier.group.mission}"</p>
                                        )}
                                    </div>
                                </div>

                                {tier.locked && !tier.isCurrent && !tier.completed && (
                                    <Lock size={16} className="text-phoenix-ghost" />
                                )}
                                {tier.completed && (
                                    <CheckCircle2 size={18} className="text-emerald-500" />
                                )}
                            </div>

                            {/* Requirements & Rewards for Next Tier */}
                            {tier.isNext && tier.group.unlockReqs && (
                                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-purple-200 pl-4">
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-sans text-phoenix-ghost uppercase font-bold">Requirements</div>
                                        {tier.group.unlockReqs.map((req, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-phoenix-ink font-sans">
                                                <Target size={12} className="text-red-500" />
                                                {req}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-sans text-phoenix-ghost uppercase font-bold">Rewards</div>
                                        {tier.group.rewards?.map((rew, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-phoenix-gold font-sans">
                                                <Zap size={12} />
                                                {rew}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
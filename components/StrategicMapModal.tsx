import React from 'react';
import { UserProfile } from '../types';
import { TIER_GROUPS } from '../data/levels';
import { X, Lock, CheckCircle2, Crown, Zap, Shield, Target, Gem } from 'lucide-react';

interface StrategicMapModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserProfile;
}

export const StrategicMapModal: React.FC<StrategicMapModalProps> = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-corp-onyx/95 backdrop-blur-xl transition-opacity"
                onClick={onClose}
            ></div>

            {/* Main Container - Holographic Style */}
            <div className="relative w-full max-w-2xl bg-[#0A0A0A] border border-corp-blue/30 shadow-[0_0_50px_rgba(0,122,255,0.15)] rounded-sm overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-corp-border bg-gradient-to-r from-corp-bg to-[#111] flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="font-display font-bold text-lg tracking-[0.2em] text-corp-platinum uppercase">Strategic Clearance</h2>
                        <p className="text-[10px] font-mono text-corp-blue tracking-widest mt-1">LADDER VISUALIZATION // HOLOGRAPHIC</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-corp-silver hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">

                    {/* TIER F - GOD MODE (GOLD FOG) */}
                    <div className="relative pl-8 p-6 border border-corp-gold/20 bg-gradient-to-r from-corp-gold/5 to-transparent rounded-sm gold-fog animate-float">
                        <div className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-corp-gold shadow-[0_0_20px_rgba(212,175,55,0.8)] animate-glow"></div>

                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] font-bold text-corp-gold font-mono tracking-widest border border-corp-gold/30 px-2 py-0.5 bg-black animate-golden-pulse">TIER F</span>
                                    <Crown size={12} className="text-corp-gold animate-pulse" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-corp-gold tracking-tight mb-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.7)]">
                                    {TIER_GROUPS.F.subtitle}
                                </h3>
                                <p className="text-xs text-corp-gold/80 font-mono italic">"The End Game. You make the rules."</p>
                            </div>
                            <Lock size={16} className="text-corp-gold/50 lock-tremble" />
                        </div>
                    </div>

                    {/* TIER D - GENERAL */}
                    <div className="relative pl-8 opacity-50 hover:opacity-100 transition-opacity">
                        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-corp-silver/30"></div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-bold text-corp-silver font-mono tracking-widest border border-corp-silver/30 px-2 py-0.5">TIER D</span>
                            <Lock size={12} className="text-corp-silver" />
                        </div>
                        <h3 className="text-lg font-bold text-corp-silver mb-1">{TIER_GROUPS.D.subtitle}</h3>
                    </div>

                    {/* TIER C - OFFICER (NEXT TARGET) */}
                    <div className="relative pl-8 group">
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-corp-silver shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>
                        <div className="bg-corp-bg/80 border border-corp-border p-5 rounded-sm hover:border-corp-silver/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-corp-platinum font-mono tracking-widest border border-corp-silver px-2 py-0.5 bg-corp-silver/10">TIER C</span>
                                    <Lock size={12} className="text-corp-platinum lock-tremble cursor-pointer" />
                                </div>
                                <span className="text-[9px] text-corp-danger font-mono animate-pulse font-bold">🔒 LOCKED // NEXT OBJECTIVE</span>
                            </div>
                            <h3 className="text-xl font-bold text-corp-platinum mb-4">{TIER_GROUPS.C.subtitle}</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="text-[9px] font-mono text-corp-silver uppercase">Requirements</div>
                                    {TIER_GROUPS.C.unlockReqs?.map((req, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-corp-platinum/70">
                                            <Target size={10} className="text-corp-danger" />
                                            {req}
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <div className="text-[9px] font-mono text-corp-silver uppercase">Rewards</div>
                                    {TIER_GROUPS.C.rewards?.map((req, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-corp-gold">
                                            <Zap size={10} />
                                            {req}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TIER B - SPECIALIST (CURRENT) */}
                    <div className="relative pl-8">
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-corp-blue shadow-[0_0_20px_rgba(0,122,255,0.8)]"></div>
                        <div className="absolute -left-[5px] top-6 w-3 h-3 bg-corp-blue rounded-full shadow-[0_0_10px_rgba(0,122,255,1)]"></div>

                        <div className="bg-corp-blue/5 border border-corp-blue/20 p-6 rounded-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-20">
                                <Shield size={40} className="text-corp-blue" />
                            </div>

                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[10px] font-bold text-corp-blue font-mono tracking-widest border border-corp-blue px-2 py-0.5 bg-corp-blue/10">TIER B</span>
                                <span className="text-[9px] text-corp-blue font-bold tracking-widest animate-pulse">CURRENT STATUS</span>
                            </div>

                            <h3 className="text-3xl font-display font-bold text-corp-platinum mb-2">{TIER_GROUPS.B.subtitle}</h3>
                            <p className="text-sm text-corp-blue/80 italic mb-4 font-mono">"{TIER_GROUPS.B.mission}"</p>
                        </div>
                    </div>

                    {/* TIER A - GRINDER (LEGACY) */}
                    <div className="relative pl-8 opacity-30 grayscale hover:grayscale-0 hover:opacity-60 transition-all">
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-emerald-500"></div>
                        <div className="mb-1 flex items-center gap-2">
                            <span className="text-[10px] font-bold text-emerald-500 font-mono tracking-widest border border-emerald-500/30 px-2 py-0.5">TIER A</span>
                            <CheckCircle2 size={10} className="text-emerald-500" />
                        </div>
                        <h3 className="text-lg font-bold text-corp-silver">{TIER_GROUPS.A.subtitle}</h3>
                    </div>

                </div>
            </div>
        </div>
    );
};
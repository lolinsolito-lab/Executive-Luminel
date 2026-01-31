import React from 'react';
import { UserProfile } from '../types';
import { Shield, Lock, Crown, ChevronRight, LayoutGrid, Clock, Gem, FileText, Briefcase, BookOpen, Sparkles } from 'lucide-react';
import { DailyBriefing } from './NeuralCodex/DailyBriefing';

interface SidebarProps {
    user: UserProfile;
    onOpenMap: () => void;
    onOpenUpgrade?: (feature?: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, onOpenMap, onOpenUpgrade }) => {
    return (
        <div className="w-full md:w-[320px] flex-shrink-0 war-room-panel border-r border-white/10 flex flex-col h-full font-sans relative z-30 bg-[#050505]/90 backdrop-blur-xl">

            {/* 1. BRAND HEADER - V5.0 */}
            <div className="p-8 border-b border-corp-border bg-corp-onyx">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="font-display font-bold text-xl tracking-tight text-corp-platinum mb-1">
                            LUMINEL EXECUTIVE
                        </h1>
                        <p className="font-mono text-[9px] text-corp-gold tracking-[0.2em] uppercase">
                            Career Intelligence for the 1%
                        </p>
                    </div>
                    <div
                        onClick={() => onOpenUpgrade?.()}
                        className="px-2 py-1 bg-corp-gold text-corp-onyx rounded-sm text-[9px] font-bold font-mono tracking-widest flex items-center gap-1 cursor-pointer hover:bg-corp-gold/80 transition-colors"
                        title="Click to upgrade"
                    >
                        <Crown size={10} />
                        {user.subscription}
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-8 flex-1 overflow-y-auto">

                {/* 2. THE COCKPIT BADGE (Click to Open Map) */}
                <div onClick={onOpenMap} className="group cursor-pointer">
                    <div className="relative p-6 bg-gradient-to-br from-[#111] to-corp-bg border border-corp-border rounded-sm transition-all duration-300 group-hover:border-corp-blue group-hover:shadow-[0_0_30px_rgba(0,122,255,0.15)]">

                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-corp-blue/10 border border-corp-blue/30 flex items-center justify-center text-corp-blue">
                                <Shield size={24} />
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-mono text-corp-silver uppercase tracking-widest mb-1">Status</span>
                                <span className="flex items-center gap-1.5 text-[9px] font-bold text-corp-blue">
                                    <span className="w-1.5 h-1.5 bg-corp-blue rounded-full animate-pulse"></span>
                                    ACTIVE
                                </span>
                            </div>
                        </div>

                        <div>
                            <div className="text-[10px] text-corp-silver font-mono tracking-widest uppercase mb-1">Clearance Level</div>
                            <div className="text-3xl font-display font-bold text-corp-platinum tracking-tight">
                                {user.level}
                            </div>
                            <div className="text-sm font-medium text-corp-blue mt-1">{user.role}</div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-corp-border flex items-center justify-between text-[10px] text-corp-silver font-mono transition-colors group-hover:text-corp-platinum">
                            <span>OPEN STRATEGIC MAP</span>
                            <ChevronRight size={14} className="text-corp-blue group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>

                {/* 3. METRICS (War Room Style) */}
                <div className="space-y-5">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-corp-silver uppercase tracking-widest">
                        <LayoutGrid size={12} /> Live Assets
                    </div>

                    <div className="space-y-4">
                        {/* Performance */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-corp-platinum">
                                <span>Technical Mastery</span>
                                <span className="text-corp-blue">{Math.round((user.performanceXP / user.maxPerformanceXP) * 100)}%</span>
                            </div>
                            <div className="h-1 bg-corp-bg rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-corp-blue w-full shadow-[0_0_10px_rgba(0,122,255,0.5)]"></div>
                            </div>
                        </div>

                        {/* Politics */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-corp-platinum">
                                <span>Political Capital</span>
                                <span className="text-corp-gold">{Math.round((user.politicalCapital / user.maxPoliticalCapital) * 100)}%</span>
                            </div>
                            <div className="h-1 bg-corp-bg rounded-full overflow-hidden border border-white/5">
                                <div style={{ width: `${(user.politicalCapital / user.maxPoliticalCapital) * 100}%` }} className="h-full bg-corp-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                            </div>
                            <div className="text-[9px] text-corp-danger text-right font-mono mt-1 animate-pulse">
                                CRITICAL LEVEL
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. THE VAULT (The €299 Feature) */}
                <div className="mt-8">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-corp-gold uppercase tracking-widest mb-3">
                        <Lock size={12} /> The Vault <span className="text-corp-silver opacity-50">// EXECUTIVE</span>
                    </div>

                    <div className="bg-gradient-to-r from-corp-gold/5 to-transparent border-l-2 border-corp-gold p-4 space-y-3">
                        <div
                            onClick={() => user.subscription === 'EXECUTIVE' ? alert('Access Granted: Opening Vault Resource...') : onOpenUpgrade?.('Salary Negotiation Script')}
                            className="flex items-center gap-3 text-xs text-corp-platinum/80 hover:text-corp-gold cursor-pointer transition-colors group"
                        >
                            <FileText size={14} className="text-corp-gold group-hover:scale-110 transition-transform" />
                            <span>Salary Negotiation Script v5.0</span>
                        </div>
                        <div
                            onClick={() => user.subscription === 'EXECUTIVE' ? alert('Access Granted: Opening Vault Resource...') : onOpenUpgrade?.('Job Title Hack Protocol')}
                            className="flex items-center gap-3 text-xs text-corp-platinum/80 hover:text-corp-gold cursor-pointer transition-colors group"
                        >
                            <Briefcase size={14} className="text-corp-gold group-hover:scale-110 transition-transform" />
                            <span>Job Title Hack Protocol</span>
                        </div>
                        <div
                            onClick={() => user.subscription === 'EXECUTIVE' ? alert('Access Granted: Opening Vault Resource...') : onOpenUpgrade?.('Exit Strategy Blueprint')}
                            className="flex items-center gap-3 text-xs text-corp-platinum/80 hover:text-corp-gold cursor-pointer transition-colors group"
                        >
                            <Gem size={14} className="text-corp-gold group-hover:scale-110 transition-transform" />
                            <span>Exit Strategy Blueprint</span>
                        </div>
                    </div>
                </div>

                {/* 5. NEURAL CODEX - Daily Intel */}
                <div className="mt-8">
                    <DailyBriefing userTier={user.subscription as 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE'} />
                </div>

            </div>

            {/* Footer */}
            <div className="mt-auto p-6 border-t border-corp-border bg-black/40">
                <div className="flex justify-between items-center text-[9px] font-mono text-corp-silver uppercase tracking-widest">
                    <span>V5.0 // ARCHITECT</span>
                    <span className="flex items-center gap-1 text-emerald-500"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> ENCRYPTED</span>
                </div>
            </div>
        </div>
    );
};
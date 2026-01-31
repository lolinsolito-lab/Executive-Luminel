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
        <div className="w-full md:w-[260px] lg:w-[300px] flex-shrink-0 border-r border-amber-200/50 flex flex-col h-full font-sans relative z-30 bg-[#F9F8F2] overflow-hidden">

            {/* 1. BRAND HEADER - COMPACT */}
            <div className="shrink-0 p-4 lg:p-5 border-b border-amber-200/50 bg-white">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="font-display font-bold text-base lg:text-lg tracking-tight text-gray-900 mb-0.5">
                            LUMINEL EXECUTIVE
                        </h1>
                        <p className="font-mono text-[8px] text-amber-600 tracking-[0.15em] uppercase">
                            Career Intelligence for the 1%
                        </p>
                    </div>
                    <div
                        onClick={() => onOpenUpgrade?.()}
                        className="px-1.5 py-0.5 bg-amber-500 text-white rounded-sm text-[8px] font-bold font-mono tracking-widest flex items-center gap-1 cursor-pointer hover:bg-amber-600 transition-colors shadow-sm"
                        title="Click to upgrade"
                    >
                        <Crown size={9} />
                        {user.subscription}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-4 bg-[#F9F8F2] min-h-0">

                {/* 2. THE COCKPIT BADGE (Click to Open Map) */}
                <div onClick={onOpenMap} className="group cursor-pointer">
                    <div className="relative p-3 lg:p-4 bg-white border border-amber-200 rounded-sm transition-all duration-300 group-hover:border-amber-400 group-hover:shadow-md">

                        <div className="flex justify-between items-start mb-3">
                            <div className="w-9 h-9 bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-600">
                                <Shield size={18} />
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest mb-0.5">Status</span>
                                <span className="flex items-center gap-1 text-[8px] font-bold text-emerald-600">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                    ACTIVE
                                </span>
                            </div>
                        </div>

                        <div>
                            <div className="text-[9px] text-gray-500 font-mono tracking-widest uppercase mb-0.5">Clearance</div>
                            <div className="text-xl lg:text-2xl font-display font-bold text-gray-900 tracking-tight">
                                {user.level}
                            </div>
                            <div className="text-xs font-medium text-amber-600 mt-0.5">{user.role}</div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-amber-100 flex items-center justify-between text-[9px] text-gray-500 font-mono transition-colors group-hover:text-gray-900">
                            <span>OPEN STRATEGIC MAP</span>
                            <ChevronRight size={12} className="text-amber-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>

                {/* 3. METRICS (Pearl Style) */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                        <LayoutGrid size={11} /> Live Assets
                    </div>

                    <div className="space-y-2">
                        {/* Performance */}
                        <div className="space-y-1">
                            <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-gray-800">
                                <span>Technical Mastery</span>
                                <span className="text-blue-600">{Math.round((user.performanceXP / user.maxPerformanceXP) * 100)}%</span>
                            </div>
                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-full"></div>
                            </div>
                        </div>

                        {/* Politics */}
                        <div className="space-y-1">
                            <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider text-gray-800">
                                <span>Political Capital</span>
                                <span className="text-amber-600">{Math.round((user.politicalCapital / user.maxPoliticalCapital) * 100)}%</span>
                            </div>
                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div style={{ width: `${(user.politicalCapital / user.maxPoliticalCapital) * 100}%` }} className="h-full bg-amber-500"></div>
                            </div>
                            <div className="text-[8px] text-red-500 text-right font-mono font-bold">
                                CRITICAL
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. THE VAULT */}
                <div className="mt-3">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-amber-600 uppercase tracking-widest mb-2 font-bold">
                        <Lock size={10} /> The Vault <span className="text-gray-400">// EXEC</span>
                    </div>

                    <div className="bg-amber-50 border-l-2 border-amber-500 p-2 space-y-1.5 text-[10px]">
                        <div
                            onClick={() => user.subscription === 'EXECUTIVE' ? alert('Access Granted') : onOpenUpgrade?.('Salary Negotiation Script')}
                            className="flex items-center gap-2 text-gray-700 hover:text-amber-600 cursor-pointer transition-colors group"
                        >
                            <FileText size={12} className="text-amber-500" />
                            <span>Salary Negotiation v5.0</span>
                        </div>
                        <div
                            onClick={() => user.subscription === 'EXECUTIVE' ? alert('Access Granted') : onOpenUpgrade?.('Job Title Hack Protocol')}
                            className="flex items-center gap-2 text-gray-700 hover:text-amber-600 cursor-pointer transition-colors group"
                        >
                            <Briefcase size={12} className="text-amber-500" />
                            <span>Job Title Hack</span>
                        </div>
                        <div
                            onClick={() => user.subscription === 'EXECUTIVE' ? alert('Access Granted') : onOpenUpgrade?.('Exit Strategy Blueprint')}
                            className="flex items-center gap-2 text-gray-700 hover:text-amber-600 cursor-pointer transition-colors group"
                        >
                            <Gem size={12} className="text-amber-500" />
                            <span>Exit Strategy</span>
                        </div>
                    </div>
                </div>

                {/* 5. NEURAL CODEX - Daily Intel */}
                <div className="mt-3">
                    <DailyBriefing userTier={user.subscription as 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE'} />
                </div>

            </div>

            {/* Footer */}
            <div className="shrink-0 mt-auto p-3 border-t border-amber-200/50 bg-white">
                <div className="flex justify-between items-center text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                    <span>V6.0 // ARCHITECT</span>
                    <span className="flex items-center gap-1 text-emerald-600"><div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div> ENCRYPTED</span>
                </div>
            </div>
        </div>
    );
};
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
        <div className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0 border-r border-amber-200/50 flex flex-col h-full font-sans relative z-30 bg-[#F9F8F2] overflow-hidden">

            {/* 1. BRAND HEADER */}
            <div className="shrink-0 p-5 lg:p-6 border-b border-amber-200/50 bg-white">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="font-display font-bold text-lg lg:text-xl tracking-tight text-gray-900 mb-1">
                            LUMINEL EXECUTIVE
                        </h1>
                        <p className="font-mono text-[9px] text-amber-600 tracking-[0.2em] uppercase">
                            Career Intelligence for the 1%
                        </p>
                    </div>
                    <div
                        onClick={() => onOpenUpgrade?.()}
                        className="px-2 py-1 bg-amber-500 text-white rounded-sm text-[9px] font-bold font-mono tracking-widest flex items-center gap-1 cursor-pointer hover:bg-amber-600 transition-colors shadow-sm"
                        title="Click to upgrade"
                    >
                        <Crown size={10} />
                        {user.subscription}
                    </div>
                </div>
            </div>

            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto p-5 lg:p-6 space-y-6 bg-[#F9F8F2] min-h-0">

                {/* 2. THE COCKPIT BADGE (Click to Open Map) */}
                <div onClick={onOpenMap} className="group cursor-pointer">
                    <div className="relative p-5 lg:p-6 bg-white border border-amber-200 rounded-sm transition-all duration-300 group-hover:border-amber-400 group-hover:shadow-lg">

                        <div className="flex justify-between items-start mb-5">
                            <div className="w-12 h-12 bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-600 rounded-sm">
                                <Shield size={24} />
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">Status</span>
                                <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                    ACTIVE
                                </span>
                            </div>
                        </div>

                        <div>
                            <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Clearance Level</div>
                            <div className="text-3xl font-display font-bold text-gray-900 tracking-tight">
                                {user.level}
                            </div>
                            <div className="text-sm font-medium text-amber-600 mt-1">{user.role}</div>
                        </div>

                        <div className="mt-5 pt-4 border-t border-amber-100 flex items-center justify-between text-[10px] text-gray-500 font-mono transition-colors group-hover:text-gray-900">
                            <span>OPEN STRATEGIC MAP</span>
                            <ChevronRight size={14} className="text-amber-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>

                {/* 3. LIVE METRICS */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        <LayoutGrid size={12} /> Live Assets
                    </div>

                    <div className="space-y-4">
                        {/* Technical Mastery */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-800">
                                <span>Technical Mastery</span>
                                <span className="text-blue-600">{Math.round((user.performanceXP / user.maxPerformanceXP) * 100)}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-full rounded-full"></div>
                            </div>
                        </div>

                        {/* Political Capital */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-800">
                                <span>Political Capital</span>
                                <span className="text-amber-600">{Math.round((user.politicalCapital / user.maxPoliticalCapital) * 100)}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                <div style={{ width: `${(user.politicalCapital / user.maxPoliticalCapital) * 100}%` }} className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                            </div>
                            <div className="text-[9px] text-red-500 text-right font-mono font-bold flex items-center justify-end gap-1">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                                CRITICAL LEVEL
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. THE VAULT */}
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-amber-600 uppercase tracking-widest mb-3 font-bold">
                        <Lock size={12} /> The Vault <span className="text-gray-400">// EXECUTIVE</span>
                    </div>

                    <div className="bg-amber-50 border-l-2 border-amber-500 p-4 space-y-3 rounded-r-sm">
                        <div
                            onClick={() => user.subscription === 'EXECUTIVE' ? alert('Access Granted: Opening Vault Resource...') : onOpenUpgrade?.('Salary Negotiation Script')}
                            className="flex items-center gap-3 text-sm text-gray-700 hover:text-amber-600 cursor-pointer transition-colors group"
                        >
                            <FileText size={16} className="text-amber-500 group-hover:scale-110 transition-transform" />
                            <span>Salary Negotiation Script v5.0</span>
                        </div>
                        <div
                            onClick={() => user.subscription === 'EXECUTIVE' ? alert('Access Granted: Opening Vault Resource...') : onOpenUpgrade?.('Job Title Hack Protocol')}
                            className="flex items-center gap-3 text-sm text-gray-700 hover:text-amber-600 cursor-pointer transition-colors group"
                        >
                            <Briefcase size={16} className="text-amber-500 group-hover:scale-110 transition-transform" />
                            <span>Job Title Hack Protocol</span>
                        </div>
                        <div
                            onClick={() => user.subscription === 'EXECUTIVE' ? alert('Access Granted: Opening Vault Resource...') : onOpenUpgrade?.('Exit Strategy Blueprint')}
                            className="flex items-center gap-3 text-sm text-gray-700 hover:text-amber-600 cursor-pointer transition-colors group"
                        >
                            <Gem size={16} className="text-amber-500 group-hover:scale-110 transition-transform" />
                            <span>Exit Strategy Blueprint</span>
                        </div>
                    </div>
                </div>

                {/* 5. DAILY INTEL */}
                <div>
                    <DailyBriefing userTier={user.subscription as 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE'} />
                </div>

            </div>

            {/* FOOTER */}
            <div className="shrink-0 mt-auto p-4 border-t border-amber-200/50 bg-white">
                <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                    <span>V6.0 // ARCHITECT</span>
                    <span className="flex items-center gap-1.5 text-emerald-600">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        ENCRYPTED
                    </span>
                </div>
            </div>
        </div>
    );
};
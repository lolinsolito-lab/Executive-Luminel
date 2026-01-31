import React from 'react';
import { UserProfile } from '../types';
import { TrendingUp, Clock, AlertTriangle, ChevronRight, Crown } from 'lucide-react';

interface DataStreamProps {
    user: UserProfile;
    onOpenHierarchy?: () => void;
}

export const DataStream: React.FC<DataStreamProps> = ({ user, onOpenHierarchy }) => {
    return (
        <div className="w-72 xl:w-80 h-full bg-[#0B1019] border-l border-yellow-500/30 flex flex-col p-4 xl:p-6 z-30 shrink-0 hidden lg:flex">

            {/* 0. INTERACTIVE BADGE [HUD] */}
            <div className="mb-6 p-3 bg-gray-900/80 border border-blue-500/40 rounded-sm flex items-center justify-between cursor-pointer hover:bg-gray-800 hover:border-yellow-500/60 transition-all group" onClick={onOpenHierarchy}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 border-2 border-blue-500 text-blue-400 flex items-center justify-center rounded-sm font-display font-bold text-sm group-hover:scale-110 transition-transform">
                        B1
                    </div>
                    <div>
                        <h3 className="font-display text-white text-sm font-bold tracking-wide group-hover:text-yellow-400 transition-colors">THE SPECIALIST</h3>
                        <p className="font-mono text-[10px] text-gray-400">Level 2 Clearance</p>
                    </div>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
            </div>

            <h2 className="font-mono text-[11px] text-yellow-400 uppercase tracking-[0.25em] mb-6 border-b border-yellow-500/30 pb-2 font-bold">
                LIVE ASSETS
            </h2>

            <div className="space-y-6 flex-1 overflow-y-auto pr-1 custom-scrollbar">

                {/* 1. POLITICAL CAPITAL METER */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <span className="font-display font-bold text-white text-sm">Political Capital</span>
                        <span className="font-mono text-red-400 text-xs font-bold">{user.politicalCapital / 10}%</span>
                    </div>
                    <div className="h-28 w-full bg-gray-900 border border-gray-700 rounded-sm relative p-1">
                        {/* Fill */}
                        <div
                            className="absolute bottom-1 left-1 right-1 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-400 opacity-90 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                            style={{ height: `${user.politicalCapital / 10}%`, transition: 'height 1s ease' }}
                        ></div>
                    </div>
                    <div className="flex items-center gap-2 text-red-400 text-[10px] font-mono animate-pulse font-bold">
                        <AlertTriangle size={12} />
                        <span>CRITICAL LEVEL</span>
                    </div>
                </div>

                {/* 2. PERFORMANCE KPI */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <span className="font-display font-bold text-white text-sm">Performance</span>
                        <span className="font-mono text-emerald-400 text-xs font-bold">85%</span>
                    </div>
                    {/* Compact Circular Viz */}
                    <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="56" cy="56" r="50" stroke="#1f2937" strokeWidth="8" fill="transparent" />
                            <circle cx="56" cy="56" r="50" stroke="#10B981" strokeWidth="8" fill="transparent" strokeDasharray="314" strokeDashoffset="47" strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                        </svg>
                        <div className="absolute text-center">
                            <span className="block text-2xl font-bold text-white font-display">A-</span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Optimal</span>
                        </div>
                    </div>
                </div>

                {/* 3. PROMOTION COUNTDOWN */}
                <div className="space-y-3 pt-4 border-t border-yellow-500/20">
                    <span className="font-display font-bold text-white text-sm block">Next Review</span>
                    <div className="flex items-center justify-between p-3 bg-gray-900/80 border border-gray-700 rounded-sm">
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-gray-400" />
                            <span className="text-gray-300 text-xs">Standard ETA</span>
                        </div>
                        <span className="font-mono text-gray-300 text-xs font-bold">14 MO</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-sm cursor-pointer hover:bg-yellow-500/20 transition-colors group">
                        <div className="flex items-center gap-2">
                            <TrendingUp size={14} className="text-yellow-400 group-hover:animate-bounce" />
                            <span className="text-yellow-400 text-xs font-bold">HACKER MODE</span>
                        </div>
                        <span className="font-mono text-yellow-400 text-xs font-bold">4 MO</span>
                    </div>
                </div>

                {/* 4. DAILY INTEL CARD (V6 HUD) */}
                <div className="mt-auto pt-4">
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/40 p-4 rounded-sm relative overflow-hidden group hover:border-yellow-400 transition-colors cursor-help">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/15 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2"></div>

                        <div className="flex items-center gap-2 mb-2">
                            <Crown size={14} className="text-yellow-400" />
                            <span className="font-mono text-[10px] text-yellow-400 tracking-widest uppercase font-bold">DAILY INTEL</span>
                        </div>
                        <p className="font-display font-bold text-white text-sm leading-snug">
                            "Never Outshine the Master."
                        </p>
                        <p className="font-mono text-[10px] text-gray-400 mt-1">
                            Law 1 // 48 Laws of Power
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

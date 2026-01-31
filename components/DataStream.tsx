import React from 'react';
import { UserProfile } from '../types';
import { TrendingUp, Clock, AlertTriangle, ChevronRight, Crown } from 'lucide-react';

interface DataStreamProps {
    user: UserProfile;
    onOpenHierarchy?: () => void;
}

export const DataStream: React.FC<DataStreamProps> = ({ user, onOpenHierarchy }) => {
    return (
        <div className="w-64 lg:w-72 xl:w-80 h-full bg-[#F9F8F2] border-l border-amber-200/50 flex flex-col p-3 lg:p-4 xl:p-6 z-30 shrink-0 hidden lg:flex">

            {/* 0. INTERACTIVE BADGE [HUD] */}
            <div className="mb-4 lg:mb-6 p-3 bg-white border border-amber-200 rounded-sm flex items-center justify-between cursor-pointer hover:bg-amber-50 hover:border-amber-400 transition-all group shadow-sm" onClick={onOpenHierarchy}>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 lg:w-10 lg:h-10 bg-amber-100 border-2 border-amber-400 text-amber-700 flex items-center justify-center rounded-sm font-display font-bold text-sm group-hover:scale-110 transition-transform">
                        B1
                    </div>
                    <div>
                        <h3 className="font-display text-gray-900 text-xs lg:text-sm font-bold tracking-wide group-hover:text-amber-600 transition-colors">THE SPECIALIST</h3>
                        <p className="font-mono text-[9px] lg:text-[10px] text-gray-500">Level 2 Clearance</p>
                    </div>
                </div>
                <ChevronRight size={14} className="text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
            </div>

            <h2 className="font-mono text-[10px] lg:text-[11px] text-amber-600 uppercase tracking-[0.25em] mb-4 lg:mb-6 border-b border-amber-200 pb-2 font-bold">
                LIVE ASSETS
            </h2>

            <div className="space-y-5 lg:space-y-6 flex-1 overflow-y-auto pr-1 custom-scrollbar">

                {/* 1. POLITICAL CAPITAL METER */}
                <div className="space-y-2">
                    <div className="flex justify-between items-end">
                        <span className="font-display font-bold text-gray-900 text-xs lg:text-sm">Political Capital</span>
                        <span className="font-mono text-red-500 text-[10px] lg:text-xs font-bold">{user.politicalCapital / 10}%</span>
                    </div>
                    <div className="h-24 lg:h-28 w-full bg-white border border-gray-200 rounded-sm relative p-1 shadow-inner">
                        {/* Fill */}
                        <div
                            className="absolute bottom-1 left-1 right-1 bg-gradient-to-t from-red-500 via-orange-400 to-amber-400 opacity-90 rounded-sm shadow-lg"
                            style={{ height: `${user.politicalCapital / 10}%`, transition: 'height 1s ease' }}
                        ></div>
                    </div>
                    <div className="flex items-center gap-2 text-red-500 text-[9px] lg:text-[10px] font-mono font-bold">
                        <AlertTriangle size={11} />
                        <span>CRITICAL LEVEL</span>
                    </div>
                </div>

                {/* 2. PERFORMANCE KPI */}
                <div className="space-y-2">
                    <div className="flex justify-between items-end">
                        <span className="font-display font-bold text-gray-900 text-xs lg:text-sm">Performance</span>
                        <span className="font-mono text-emerald-600 text-[10px] lg:text-xs font-bold">85%</span>
                    </div>
                    {/* Compact Circular Viz */}
                    <div className="relative w-24 h-24 lg:w-28 lg:h-28 mx-auto flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="50%" cy="50%" r="45%" stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
                            <circle cx="50%" cy="50%" r="45%" stroke="#10B981" strokeWidth="8" fill="transparent" strokeDasharray="283" strokeDashoffset="42" strokeLinecap="round" className="drop-shadow-md" />
                        </svg>
                        <div className="absolute text-center">
                            <span className="block text-xl lg:text-2xl font-bold text-gray-900 font-display">A-</span>
                            <span className="text-[9px] lg:text-[10px] text-gray-500 uppercase tracking-widest">Optimal</span>
                        </div>
                    </div>
                </div>

                {/* 3. PROMOTION COUNTDOWN */}
                <div className="space-y-2 pt-3 lg:pt-4 border-t border-amber-100">
                    <span className="font-display font-bold text-gray-900 text-xs lg:text-sm block">Next Review</span>
                    <div className="flex items-center justify-between p-2 lg:p-3 bg-white border border-gray-200 rounded-sm shadow-sm">
                        <div className="flex items-center gap-2">
                            <Clock size={12} className="text-gray-400" />
                            <span className="text-gray-600 text-[10px] lg:text-xs">Standard ETA</span>
                        </div>
                        <span className="font-mono text-gray-600 text-[10px] lg:text-xs font-bold">14 MO</span>
                    </div>
                    <div className="flex items-center justify-between p-2 lg:p-3 bg-amber-50 border border-amber-300 rounded-sm cursor-pointer hover:bg-amber-100 transition-colors group shadow-sm">
                        <div className="flex items-center gap-2">
                            <TrendingUp size={12} className="text-amber-600 group-hover:animate-bounce" />
                            <span className="text-amber-700 text-[10px] lg:text-xs font-bold">HACKER MODE</span>
                        </div>
                        <span className="font-mono text-amber-700 text-[10px] lg:text-xs font-bold">4 MO</span>
                    </div>
                </div>

                {/* 4. DAILY INTEL CARD (V6 HUD) */}
                <div className="mt-auto pt-3 lg:pt-4">
                    <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-300 p-3 lg:p-4 rounded-sm relative overflow-hidden group hover:border-amber-400 transition-colors cursor-help shadow-md">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-16 h-16 lg:w-20 lg:h-20 bg-amber-200/30 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2"></div>

                        <div className="flex items-center gap-2 mb-2">
                            <Crown size={12} className="text-amber-600" />
                            <span className="font-mono text-[9px] lg:text-[10px] text-amber-600 tracking-widest uppercase font-bold">DAILY INTEL</span>
                        </div>
                        <p className="font-display font-bold text-gray-900 text-xs lg:text-sm leading-snug">
                            "Never Outshine the Master."
                        </p>
                        <p className="font-mono text-[9px] lg:text-[10px] text-gray-500 mt-1">
                            Law 1 // 48 Laws of Power
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

import React from 'react';
import { UserProfile } from '../types';
import { TrendingUp, Clock, AlertTriangle, ChevronRight, Crown } from 'lucide-react';

interface DataStreamProps {
    user: UserProfile;
    onOpenHierarchy?: () => void;
}

export const DataStream: React.FC<DataStreamProps> = ({ user, onOpenHierarchy }) => {
    return (
        <div className="w-56 lg:w-64 xl:w-72 h-full bg-[#F9F8F2] border-l border-amber-200/50 flex flex-col p-2 lg:p-3 xl:p-4 z-30 shrink-0 hidden lg:flex overflow-hidden">

            {/* 0. INTERACTIVE BADGE [HUD] */}
            <div className="shrink-0 mb-3 p-2 lg:p-3 bg-white border border-amber-200 rounded-sm flex items-center justify-between cursor-pointer hover:bg-amber-50 hover:border-amber-400 transition-all group shadow-sm" onClick={onOpenHierarchy}>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-100 border-2 border-amber-400 text-amber-700 flex items-center justify-center rounded-sm font-display font-bold text-xs group-hover:scale-105 transition-transform">
                        B1
                    </div>
                    <div>
                        <h3 className="font-display text-gray-900 text-xs font-bold tracking-wide group-hover:text-amber-600 transition-colors">THE SPECIALIST</h3>
                        <p className="font-mono text-[9px] text-gray-500">Level 2</p>
                    </div>
                </div>
                <ChevronRight size={12} className="text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
            </div>

            <h2 className="shrink-0 font-mono text-[9px] lg:text-[10px] text-amber-600 uppercase tracking-[0.2em] mb-2 border-b border-amber-200 pb-1 font-bold">
                LIVE ASSETS
            </h2>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">

                {/* 1. POLITICAL CAPITAL METER */}
                <div className="space-y-1">
                    <div className="flex justify-between items-end">
                        <span className="font-display font-bold text-gray-900 text-[10px] lg:text-xs">Political Capital</span>
                        <span className="font-mono text-red-500 text-[9px] font-bold">{user.politicalCapital / 10}%</span>
                    </div>
                    <div className="h-16 lg:h-20 w-full bg-white border border-gray-200 rounded-sm relative p-0.5 shadow-inner">
                        <div
                            className="absolute bottom-0.5 left-0.5 right-0.5 bg-gradient-to-t from-red-500 via-orange-400 to-amber-400 opacity-90 rounded-sm"
                            style={{ height: `${user.politicalCapital / 10}%`, transition: 'height 1s ease' }}
                        ></div>
                    </div>
                    <div className="flex items-center gap-1 text-red-500 text-[8px] font-mono font-bold">
                        <AlertTriangle size={9} />
                        <span>CRITICAL</span>
                    </div>
                </div>

                {/* 2. PERFORMANCE KPI */}
                <div className="space-y-1">
                    <div className="flex justify-between items-end">
                        <span className="font-display font-bold text-gray-900 text-[10px] lg:text-xs">Performance</span>
                        <span className="font-mono text-emerald-600 text-[9px] font-bold">85%</span>
                    </div>
                    <div className="relative w-16 h-16 lg:w-20 lg:h-20 mx-auto flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="50%" cy="50%" r="40%" stroke="#e5e7eb" strokeWidth="6" fill="transparent" />
                            <circle cx="50%" cy="50%" r="40%" stroke="#10B981" strokeWidth="6" fill="transparent" strokeDasharray="200" strokeDashoffset="30" strokeLinecap="round" />
                        </svg>
                        <div className="absolute text-center">
                            <span className="block text-lg font-bold text-gray-900 font-display">A-</span>
                            <span className="text-[8px] text-gray-500 uppercase">Optimal</span>
                        </div>
                    </div>
                </div>

                {/* 3. PROMOTION COUNTDOWN */}
                <div className="space-y-1 pt-2 border-t border-amber-100">
                    <span className="font-display font-bold text-gray-900 text-[10px] lg:text-xs block">Next Review</span>
                    <div className="flex items-center justify-between p-1.5 bg-white border border-gray-200 rounded-sm text-[9px]">
                        <div className="flex items-center gap-1">
                            <Clock size={10} className="text-gray-400" />
                            <span className="text-gray-600">Standard</span>
                        </div>
                        <span className="font-mono text-gray-600 font-bold">14 MO</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 bg-amber-50 border border-amber-300 rounded-sm cursor-pointer hover:bg-amber-100 transition-colors group text-[9px]">
                        <div className="flex items-center gap-1">
                            <TrendingUp size={10} className="text-amber-600" />
                            <span className="text-amber-700 font-bold">HACKER</span>
                        </div>
                        <span className="font-mono text-amber-700 font-bold">4 MO</span>
                    </div>
                </div>

                {/* 4. DAILY INTEL CARD */}
                <div className="pt-2">
                    <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-300 p-2 rounded-sm relative overflow-hidden group hover:border-amber-400 transition-colors cursor-help shadow-sm">
                        <div className="flex items-center gap-1 mb-1">
                            <Crown size={10} className="text-amber-600" />
                            <span className="font-mono text-[8px] text-amber-600 tracking-widest uppercase font-bold">DAILY INTEL</span>
                        </div>
                        <p className="font-display font-bold text-gray-900 text-[10px] lg:text-xs leading-snug">
                            "Never Outshine the Master."
                        </p>
                        <p className="font-mono text-[8px] text-gray-500 mt-0.5">
                            Law 1 // 48 Laws
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

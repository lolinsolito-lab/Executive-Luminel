import React from 'react';
import { UserProfile } from '../types';
import { TrendingUp, Clock, AlertTriangle, ChevronRight, Crown } from 'lucide-react';

interface DataStreamProps {
    user: UserProfile;
    onOpenHierarchy?: () => void;
}

export const DataStream: React.FC<DataStreamProps> = ({ user, onOpenHierarchy }) => {
    return (
        <div className="w-72 lg:w-80 xl:w-96 h-full bg-[#F9F8F2] border-l border-amber-200/50 flex flex-col p-5 lg:p-6 z-30 shrink-0 hidden lg:flex overflow-hidden">

            {/* 0. INTERACTIVE BADGE [HUD] */}
            <div className="shrink-0 mb-6 p-4 bg-white border border-amber-200 rounded-sm flex items-center justify-between cursor-pointer hover:bg-amber-50 hover:border-amber-400 transition-all group shadow-sm" onClick={onOpenHierarchy}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 border-2 border-amber-400 text-amber-700 flex items-center justify-center rounded-sm font-display font-bold text-sm group-hover:scale-105 transition-transform">
                        B1
                    </div>
                    <div>
                        <h3 className="font-display text-gray-900 text-sm font-bold tracking-wide group-hover:text-amber-600 transition-colors">THE SPECIALIST</h3>
                        <p className="font-mono text-[10px] text-gray-500">Level 2 // Active</p>
                    </div>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
            </div>

            <h2 className="shrink-0 font-mono text-[10px] text-amber-600 uppercase tracking-[0.2em] mb-4 border-b border-amber-200 pb-2 font-bold">
                LIVE ASSETS
            </h2>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 min-h-0">

                {/* 1. POLITICAL CAPITAL METER */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <span className="font-display font-bold text-gray-900 text-sm">Political Capital</span>
                        <span className="font-mono text-red-500 text-sm font-bold">{user.politicalCapital / 10}%</span>
                    </div>
                    <div className="h-24 w-full bg-white border border-gray-200 rounded-sm relative p-1 shadow-inner">
                        <div
                            className="absolute bottom-1 left-1 right-1 bg-gradient-to-t from-red-500 via-orange-400 to-amber-400 rounded-sm transition-all duration-1000"
                            style={{ height: `${user.politicalCapital / 10}%` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 pointer-events-none"></div>
                    </div>
                    <div className="flex items-center gap-2 text-red-500 text-[10px] font-mono font-bold">
                        <AlertTriangle size={12} />
                        <span>CRITICAL - Immediate action required</span>
                    </div>
                </div>

                {/* 2. PERFORMANCE KPI */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <span className="font-display font-bold text-gray-900 text-sm">Performance</span>
                        <span className="font-mono text-emerald-600 text-sm font-bold">85%</span>
                    </div>
                    <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="50%" cy="50%" r="42%" stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
                            <circle cx="50%" cy="50%" r="42%" stroke="#10B981" strokeWidth="8" fill="transparent" strokeDasharray="240" strokeDashoffset="36" strokeLinecap="round" />
                        </svg>
                        <div className="absolute text-center">
                            <span className="block text-2xl font-bold text-gray-900 font-display">A-</span>
                            <span className="text-[9px] text-gray-500 uppercase tracking-wider">Optimal</span>
                        </div>
                    </div>
                </div>

                {/* 3. PROMOTION COUNTDOWN */}
                <div className="space-y-3 pt-4 border-t border-amber-100">
                    <span className="font-display font-bold text-gray-900 text-sm block">Next Review</span>
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-sm text-sm shadow-sm">
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-gray-400" />
                            <span className="text-gray-600">Standard Path</span>
                        </div>
                        <span className="font-mono text-gray-800 font-bold">14 MONTHS</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-300 rounded-sm cursor-pointer hover:bg-amber-100 transition-colors group text-sm shadow-sm">
                        <div className="flex items-center gap-2">
                            <TrendingUp size={14} className="text-amber-600" />
                            <span className="text-amber-700 font-bold">HACKER MODE</span>
                        </div>
                        <span className="font-mono text-amber-700 font-bold">4 MONTHS</span>
                    </div>
                </div>

                {/* 4. DAILY INTEL CARD */}
                <div className="pt-4">
                    <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-300 p-4 rounded-sm relative overflow-hidden group hover:border-amber-400 transition-colors cursor-help shadow-sm">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-200/20 rounded-full blur-xl"></div>
                        <div className="flex items-center gap-2 mb-2">
                            <Crown size={14} className="text-amber-600" />
                            <span className="font-mono text-[9px] text-amber-600 tracking-widest uppercase font-bold">DAILY INTEL</span>
                        </div>
                        <p className="font-display font-bold text-gray-900 text-sm leading-snug relative z-10">
                            "Never Outshine the Master."
                        </p>
                        <p className="font-mono text-[10px] text-gray-500 mt-2">
                            Law 1 // 48 Laws of Power
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

import React from 'react';
import { UserProfile } from '../types';
import { TrendingUp, Clock, AlertTriangle, ChevronRight, Crown } from 'lucide-react';

interface DataStreamProps {
    user: UserProfile;
    onOpenHierarchy?: () => void;
}

export const DataStream: React.FC<DataStreamProps> = ({ user, onOpenHierarchy }) => {
    return (
        <div className="w-80 h-full bg-corp-onyx border-l border-corp-border flex flex-col p-6 z-30 shrink-0 hidden lg:flex">

            {/* 0. INTERACTIVE BADGE [HUD] */}
            <div className="mb-8 p-3 bg-corp-bg/50 border border-corp-border/30 rounded-sm flex items-center justify-between cursor-pointer hover:bg-corp-bg hover:border-corp-gold/50 transition-all group" onClick={onOpenHierarchy}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-corp-blue/10 border border-corp-blue/30 text-corp-blue flex items-center justify-center rounded-sm font-display font-bold text-xs group-hover:scale-110 transition-transform">
                        B1
                    </div>
                    <div>
                        <h3 className="font-display text-corp-platinum text-xs font-bold tracking-wide group-hover:text-corp-gold transition-colors">THE SPECIALIST</h3>
                        <p className="font-mono text-[9px] text-corp-silver">Level 2 Clearance</p>
                    </div>
                </div>
                <ChevronRight size={14} className="text-corp-silver group-hover:text-corp-gold group-hover:translate-x-1 transition-all" />
            </div>

            <h2 className="font-mono text-[10px] text-corp-gold uppercase tracking-[0.2em] mb-6 border-b border-corp-border/30 pb-2">
                LIVE ASSETS
            </h2>

            <div className="space-y-8 flex-1 overflow-y-auto pr-1 custom-scrollbar">

                {/* 1. POLITICAL CAPITAL METER */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <span className="font-display font-bold text-corp-platinum text-xs">Political Capital</span>
                        <span className="font-mono text-corp-danger text-[10px] font-bold">{user.politicalCapital / 10}%</span>
                    </div>
                    <div className="h-32 w-full bg-corp-bg border border-corp-border/30 rounded-sm relative p-1">
                        {/* Fill */}
                        <div
                            className="absolute bottom-1 left-1 right-1 bg-gradient-to-t from-corp-danger via-orange-500 to-corp-gold opacity-80 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                            style={{ height: `${user.politicalCapital / 10}%`, transition: 'height 1s ease' }}
                        ></div>
                        {/* Grid Lines Overlay */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Z24=')] pointer-events-none"></div>
                    </div>
                    <div className="flex items-center gap-2 text-corp-danger text-[9px] font-mono animate-pulse">
                        <AlertTriangle size={10} />
                        <span>CRITICAL LEVEL</span>
                    </div>
                </div>

                {/* 2. PERFORMANCE KPI */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <span className="font-display font-bold text-corp-platinum text-xs">Performance</span>
                        <span className="font-mono text-emerald-500 text-[10px] font-bold">85%</span>
                    </div>
                    {/* Compact Circular Viz */}
                    <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="48" cy="48" r="44" stroke="#111827" strokeWidth="6" fill="transparent" />
                            <circle cx="48" cy="48" r="44" stroke="#10B981" strokeWidth="6" fill="transparent" strokeDasharray="276" strokeDashoffset="41" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        </svg>
                        <div className="absolute text-center">
                            <span className="block text-lg font-bold text-corp-platinum font-display">A-</span>
                            <span className="text-[8px] text-corp-silver uppercase tracking-widest">Optimal</span>
                        </div>
                    </div>
                </div>

                {/* 3. PROMOTION COUNTDOWN */}
                <div className="space-y-3 pt-4 border-t border-corp-border/20">
                    <span className="font-display font-bold text-corp-platinum text-xs block">Next Review</span>
                    <div className="flex items-center justify-between p-2 bg-corp-bg/50 border border-corp-border/30 rounded-sm">
                        <div className="flex items-center gap-2">
                            <Clock size={12} className="text-corp-silver" />
                            <span className="text-corp-silver text-[10px]">Standard ETA</span>
                        </div>
                        <span className="font-mono text-corp-silver text-[10px]">14 MO</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-corp-gold/10 border border-corp-gold/50 rounded-sm cursor-pointer hover:bg-corp-gold/20 transition-colors group">
                        <div className="flex items-center gap-2">
                            <TrendingUp size={12} className="text-corp-gold group-hover:animate-bounce" />
                            <span className="text-corp-gold text-[10px] font-bold">HACKER MODE</span>
                        </div>
                        <span className="font-mono text-corp-gold text-[10px] font-bold">4 MO</span>
                    </div>
                </div>

                {/* 4. DAILY INTEL CARD (V6 HUD) */}
                <div className="mt-auto pt-4">
                    <div className="bg-gradient-to-br from-corp-bg to-black border border-corp-border/40 p-3 rounded-sm relative overflow-hidden group hover:border-corp-gold/60 transition-colors cursor-help">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-corp-gold/10 blur-xl rounded-full -translate-y-1/2 translate-x-1/2"></div>

                        <div className="flex items-center gap-2 mb-2">
                            <Crown size={12} className="text-corp-gold" />
                            <span className="font-mono text-[9px] text-corp-gold tracking-widest uppercase">DAILY INTEL</span>
                        </div>
                        <p className="font-display font-bold text-corp-platinum text-xs leading-snug">
                            "Never Outshine the Master."
                        </p>
                        <p className="font-mono text-[9px] text-corp-silver mt-1 opacity-80">
                            Law 1 // 48 Laws of Power
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

import React from 'react';
import { UserProfile } from '../types';
import { TrendingUp, Clock, AlertTriangle } from 'lucide-react';

interface DataStreamProps {
    user: UserProfile;
}

export const DataStream: React.FC<DataStreamProps> = ({ user }) => {
    return (
        <div className="w-80 h-full bg-corp-onyx border-l border-corp-border flex flex-col p-6 z-30 shrink-0 hidden lg:flex">
            <h2 className="font-mono text-[10px] text-corp-gold uppercase tracking-[0.2em] mb-8 border-b border-corp-border/30 pb-2">
                Live Assets
            </h2>

            <div className="space-y-10">

                {/* 1. POLITICAL CAPITAL METER */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <span className="font-display font-bold text-corp-platinum text-sm">Political Capital</span>
                        <span className="font-mono text-corp-danger text-xs font-bold">{user.politicalCapital / 10}%</span>
                    </div>
                    <div className="h-48 w-full bg-corp-bg border border-corp-border/30 rounded-sm relative p-1">
                        {/* Fill */}
                        <div
                            className="absolute bottom-1 left-1 right-1 bg-gradient-to-t from-corp-danger via-orange-500 to-corp-gold opacity-80"
                            style={{ height: `${user.politicalCapital / 10}%`, transition: 'height 1s ease' }}
                        ></div>
                        {/* Grid Lines Overlay */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] pointer-events-none"></div>
                    </div>
                    <div className="flex items-center gap-2 text-corp-danger text-[10px] font-mono animate-pulse">
                        <AlertTriangle size={12} />
                        <span>CRITICAL LEVEL</span>
                    </div>
                </div>

                {/* 2. PERFORMANCE KPI */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <span className="font-display font-bold text-corp-platinum text-sm">Performance</span>
                        <span className="font-mono text-emerald-500 text-xs font-bold">85%</span>
                    </div>
                    {/* Simple Circular Viz */}
                    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="60" stroke="#111827" strokeWidth="8" fill="transparent" />
                            <circle cx="64" cy="64" r="60" stroke="#10B981" strokeWidth="8" fill="transparent" strokeDasharray="377" strokeDashoffset="56" strokeLinecap="round" />
                        </svg>
                        <div className="absolute text-center">
                            <span className="block text-2xl font-bold text-corp-platinum font-display">A-</span>
                            <span className="text-[9px] text-corp-silver uppercase tracking-widest">Optimal</span>
                        </div>
                    </div>
                </div>

                {/* 3. PROMOTION COUNTDOWN */}
                <div className="space-y-4 border-t border-corp-border/30 pt-8">
                    <span className="font-display font-bold text-corp-platinum text-sm block">Next Review</span>

                    <div className="flex items-center justify-between p-3 bg-corp-bg border border-corp-border/30 rounded-sm">
                        <div className="flex items-center gap-3">
                            <Clock size={16} className="text-corp-silver" />
                            <span className="text-corp-silver text-xs">Standard ETA</span>
                        </div>
                        <span className="font-mono text-corp-silver text-xs">14 MO</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-corp-gold/10 border border-corp-gold/50 rounded-sm cursor-pointer hover:bg-corp-gold/20 transition-colors group">
                        <div className="flex items-center gap-3">
                            <TrendingUp size={16} className="text-corp-gold group-hover:animate-bounce" />
                            <span className="text-corp-gold text-xs font-bold">HACKER MODE</span>
                        </div>
                        <span className="font-mono text-corp-gold text-xs font-bold">4 MO</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

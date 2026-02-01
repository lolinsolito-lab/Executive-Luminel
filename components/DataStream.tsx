import React from 'react';
import { UserProfile } from '../types';
import { TrendingUp, Clock, AlertTriangle, ChevronRight, Crown, Zap, Lock } from 'lucide-react';

interface DataStreamProps {
    user: UserProfile;
    onOpenHierarchy?: () => void;
}

// V7 PHOENIX - THE HUD
export const DataStream: React.FC<DataStreamProps> = ({ user, onOpenHierarchy }) => {

    // Calculate Political Flame percentage
    const flamePercent = (user.politicalCapital / user.maxPoliticalCapital) * 100;

    // Tier accent
    const getTierAccent = () => {
        switch (user.subscription) {
            case 'EXECUTIVE': return { color: 'text-phoenix-gold', border: 'border-phoenix-gold', bg: 'bg-amber-50' };
            case 'STRATEGIST': return { color: 'text-phoenix-tier-operative', border: 'border-phoenix-tier-operative', bg: 'bg-blue-50' };
            default: return { color: 'text-phoenix-ghost', border: 'border-gray-300', bg: 'bg-gray-50' };
        }
    };

    const tierStyle = getTierAccent();

    return (
        <div className="w-full h-full bg-phoenix-canvas flex flex-col p-5 lg:p-6 overflow-hidden">

            {/* A. THE BADGE (Clickable) */}
            <div className="shrink-0 mb-6">
                <div
                    onClick={onOpenHierarchy}
                    className={`p-5 bg-phoenix-snow border ${tierStyle.border} rounded-sm flex items-center justify-between cursor-pointer hover:shadow-phoenix-gold transition-all group`}
                >
                    {/* Badge Circle */}
                    <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full border-2 ${tierStyle.border} flex items-center justify-center ${tierStyle.bg} shadow-sm`}>
                            <span className="font-display font-bold text-lg text-phoenix-ink">{user.level}</span>
                        </div>
                        <div>
                            <h3 className={`font-display text-phoenix-ink text-sm font-bold tracking-wide ${tierStyle.color}`}>
                                {user.role?.toUpperCase()}
                            </h3>
                            <p className="font-sans text-[10px] text-phoenix-ghost uppercase tracking-widest">
                                Level 2 // Active
                            </p>
                        </div>
                    </div>
                    <ChevronRight size={18} className="text-phoenix-ghost group-hover:text-phoenix-gold group-hover:translate-x-1 transition-all" />
                </div>
            </div>

            <h2 className="shrink-0 font-display text-[11px] text-phoenix-gold uppercase tracking-[0.2em] mb-4 border-b border-gray-100 pb-2 font-bold">
                LIVE ASSETS
            </h2>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 min-h-0">

                {/* B. POLITICAL FLAME (Vertical Bar) */}
                <div className="space-y-3 relative group">
                    <div className="flex justify-between items-end">
                        <span className="font-display font-bold text-phoenix-ink text-sm tracking-wide">Political Flame</span>

                        {/* Value or Mask */}
                        {user.subscription !== 'GRINDER' ? (
                            <span className={`font-sans text-sm font-bold ${flamePercent < 40 ? 'text-red-500' : 'text-phoenix-gold'}`}>
                                {Math.round(flamePercent)}%
                                {user.subscription === 'EXECUTIVE' && <span className="text-[9px] ml-2 text-emerald-600">▲ +15% Trend</span>}
                            </span>
                        ) : (
                            <span className="font-sans text-[10px] text-gray-400 font-bold uppercase">Locked</span>
                        )}
                    </div>

                    {/* Flame Bar Container */}
                    <div className={`
                        h-32 w-full bg-phoenix-snow border border-gray-200 rounded-sm relative p-1 shadow-inner
                        ${user.subscription === 'GRINDER' ? 'grayscale opacity-50' : ''}
                    `}>
                        {/* Blur Overlay for Free Tier */}
                        {user.subscription === 'GRINDER' && (
                            <div className="absolute inset-0 z-20 backdrop-blur-[2px] flex items-center justify-center bg-white/20">
                                <div className="text-center px-4">
                                    <Lock size={16} className="mx-auto text-gray-500 mb-1" />
                                    <span className="text-[9px] font-sans font-bold text-gray-600 uppercase tracking-wider block">
                                        Upgrade to view
                                    </span>
                                </div>
                            </div>
                        )}

                        <div
                            className="absolute bottom-1 left-1 right-1 bg-gradient-to-t from-amber-700 via-amber-500 to-amber-400 rounded-sm transition-all duration-1000 phoenix-flame-breathe"
                            style={{ height: `${user.subscription === 'GRINDER' ? 40 : flamePercent}%` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 pointer-events-none rounded-sm"></div>
                    </div>

                    {flamePercent < 40 && user.subscription !== 'GRINDER' && (
                        <div className="flex items-center gap-2 text-red-500 text-[10px] font-sans font-bold">
                            <AlertTriangle size={12} />
                            <span>CRITICAL - Azione immediata richiesta</span>
                        </div>
                    )}
                </div>

                {/* C. PERFORMANCE KPI */}
                <div className="space-y-3 relative">
                    <div className="flex justify-between items-end">
                        <span className="font-display font-bold text-phoenix-ink text-sm tracking-wide">Performance</span>
                        <span className="font-sans text-sm font-bold text-emerald-600">
                            {user.subscription === 'GRINDER' ? '??%' : '85%'}
                        </span>
                    </div>
                    <div className={`relative w-24 h-24 mx-auto flex items-center justify-center ${user.subscription === 'GRINDER' ? 'tier-locked-blur' : ''}`}>
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="50%" cy="50%" r="42%" stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
                            <circle cx="50%" cy="50%" r="42%" stroke="#D4AF37" strokeWidth="8" fill="transparent" strokeDasharray="240" strokeDashoffset="36" strokeLinecap="round" />
                        </svg>
                        <div className="absolute text-center">
                            <span className="block text-2xl font-bold text-phoenix-ink font-display">A-</span>
                            <span className="text-[9px] text-phoenix-ghost uppercase tracking-wider font-sans">Optimal</span>
                        </div>
                    </div>
                </div>

                {/* D. DAILY INTEL CARD */}
                <div className="pt-4 border-t border-gray-100">
                    <div className="bg-phoenix-snow border border-phoenix-gold p-4 rounded-sm relative overflow-hidden shadow-phoenix-gold">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-amber-100/30 rounded-full blur-2xl"></div>
                        <div className="flex items-center gap-2 mb-2">
                            <Crown size={14} className="text-phoenix-gold" />
                            <span className="font-sans text-[9px] text-phoenix-gold tracking-widest uppercase font-bold">DAILY INTEL</span>
                        </div>
                        <p className="font-display font-bold text-phoenix-ink text-sm leading-snug relative z-10">
                            "Enter Action with Boldness."
                        </p>
                        <p className="font-sans text-[10px] text-phoenix-ghost mt-2">
                            Law 28 // 48 Laws of Power
                        </p>
                    </div>
                </div>

                {/* E. CTA BUTTON (Out-of-Cycle) */}
                <div className="pt-4">
                    <button
                        onClick={() => alert('Hacker Mode Activated!')}
                        disabled={user.subscription === 'GRINDER'}
                        className={`
                            w-full py-3 rounded-sm font-sans text-sm font-bold uppercase tracking-widest transition-all
                            flex items-center justify-center gap-2
                            ${user.subscription === 'EXECUTIVE'
                                ? 'bg-gradient-to-r from-phoenix-gold to-amber-600 text-white shadow-phoenix-gold hover:from-amber-600 hover:to-phoenix-gold'
                                : user.subscription === 'STRATEGIST'
                                    ? 'bg-phoenix-tier-operative text-white hover:bg-blue-600'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }
                        `}
                    >
                        <Zap size={16} />
                        Out-of-Cycle
                    </button>
                    {user.subscription === 'GRINDER' && (
                        <p className="text-[10px] text-phoenix-ghost text-center mt-2 font-sans">
                            Riservato agli Operativi
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
};

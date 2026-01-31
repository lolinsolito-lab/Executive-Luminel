import React from 'react';
import { UserProfile } from '../types';
import { TIER_GROUPS } from '../data/levels';
import { X, Lock, CheckCircle2, Crown, Zap, Shield, Target, Gem } from 'lucide-react';

interface StrategicMapModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserProfile;
}

export const StrategicMapModal: React.FC<StrategicMapModalProps> = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Main Container - Elegant White Pearl */}
            <div className="relative w-full max-w-2xl bg-white border border-amber-200 shadow-2xl rounded-sm overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-5 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-white flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="font-display font-bold text-lg tracking-widest text-gray-900 uppercase">Strategic Clearance</h2>
                        <p className="text-[10px] font-mono text-amber-600 tracking-widest mt-1 uppercase">Ladder Visualization // Your Path</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-900 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F9F8F2]">

                    {/* TIER F - GOD MODE (GOLD) */}
                    <div className="relative p-5 border border-amber-300 bg-gradient-to-r from-amber-50 to-white rounded-sm shadow-md">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-l-sm"></div>

                        <div className="flex justify-between items-start pl-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] font-bold text-amber-700 font-mono tracking-widest border border-amber-400 px-2 py-0.5 bg-amber-100 rounded-sm">TIER F</span>
                                    <Crown size={14} className="text-amber-600" />
                                </div>
                                <h3 className="text-xl font-display font-bold text-amber-700 tracking-tight mb-2">
                                    {TIER_GROUPS.F.subtitle}
                                </h3>
                                <p className="text-xs text-amber-600 font-mono italic">"The End Game. You make the rules."</p>
                            </div>
                            <Lock size={18} className="text-amber-400" />
                        </div>
                    </div>

                    {/* TIER D - GENERAL */}
                    <div className="relative p-4 border border-gray-200 bg-gray-50 rounded-sm opacity-60 hover:opacity-100 transition-opacity pl-6">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 rounded-l-sm"></div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-[10px] font-bold text-gray-500 font-mono tracking-widest border border-gray-300 px-2 py-0.5 bg-gray-100 rounded-sm">TIER D</span>
                            <Lock size={12} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-600">{TIER_GROUPS.D.subtitle}</h3>
                    </div>

                    {/* TIER C - OFFICER (NEXT TARGET) */}
                    <div className="relative p-5 border border-purple-200 bg-purple-50 rounded-sm shadow-sm pl-6 hover:border-purple-300 transition-all">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-400 rounded-l-sm"></div>

                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-purple-700 font-mono tracking-widest border border-purple-300 px-2 py-0.5 bg-purple-100 rounded-sm">TIER C</span>
                                <Lock size={12} className="text-purple-500" />
                            </div>
                            <span className="text-[9px] text-red-500 font-mono font-bold flex items-center gap-1">
                                <Lock size={10} />
                                LOCKED // NEXT OBJECTIVE
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">{TIER_GROUPS.C.subtitle}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="text-[9px] font-mono text-gray-500 uppercase font-bold">Requirements</div>
                                {TIER_GROUPS.C.unlockReqs?.map((req, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                                        <Target size={12} className="text-red-500" />
                                        {req}
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <div className="text-[9px] font-mono text-gray-500 uppercase font-bold">Rewards</div>
                                {TIER_GROUPS.C.rewards?.map((req, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-amber-700">
                                        <Zap size={12} className="text-amber-500" />
                                        {req}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* TIER B - SPECIALIST (CURRENT) */}
                    <div className="relative p-6 border-2 border-blue-400 bg-blue-50 rounded-sm shadow-lg pl-6">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-sm"></div>
                        <div className="absolute -left-2 top-6 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>

                        <div className="absolute top-4 right-4 opacity-10">
                            <Shield size={48} className="text-blue-500" />
                        </div>

                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-bold text-blue-700 font-mono tracking-widest border border-blue-400 px-2 py-0.5 bg-blue-100 rounded-sm">TIER B</span>
                            <span className="text-[9px] text-blue-600 font-bold tracking-widest bg-blue-200 px-2 py-0.5 rounded-sm">CURRENT STATUS</span>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">{TIER_GROUPS.B.subtitle}</h3>
                        <p className="text-sm text-blue-700 italic font-mono">"{TIER_GROUPS.B.mission}"</p>
                    </div>

                    {/* TIER A - GRINDER (LEGACY) */}
                    <div className="relative p-4 border border-emerald-200 bg-emerald-50 rounded-sm opacity-50 hover:opacity-80 transition-opacity pl-6">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400 rounded-l-sm"></div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-emerald-600 font-mono tracking-widest border border-emerald-300 px-2 py-0.5 bg-emerald-100 rounded-sm">TIER A</span>
                            <CheckCircle2 size={12} className="text-emerald-500" />
                        </div>
                        <h3 className="text-lg font-bold text-emerald-700">{TIER_GROUPS.A.subtitle}</h3>
                    </div>

                </div>
            </div>
        </div>
    );
};
import React from 'react';
import { UserProfile } from '../types';
import { Home, BookOpen, Users, Lock, Settings, Crown, ChevronRight, FileText, DollarSign, ShieldAlert } from 'lucide-react';
import { DailyBriefing } from './NeuralCodex/DailyBriefing';

interface SidebarProps {
    user: UserProfile;
    activePage?: string;
    onNavigate?: (page: string) => void;
    onOpenMap: () => void;
    onOpenUpgrade?: (feature?: string) => void;
}

// V7 PHOENIX - THE ARSENAL
export const Sidebar: React.FC<SidebarProps> = ({ user, onOpenMap, onOpenUpgrade }) => {

    // Tier accent color logic
    const getTierAccent = () => {
        switch (user.subscription) {
            case 'EXECUTIVE': return 'text-phoenix-gold border-phoenix-gold';
            case 'STRATEGIST': return 'text-phoenix-tier-operative border-phoenix-tier-operative';
            default: return 'text-phoenix-ghost border-phoenix-ghost';
        }
    };

    const navItems = [
        { icon: Home, label: 'Command', active: true, locked: false },
        { icon: BookOpen, label: 'The Codex', active: false, locked: false }, // Strategy Support is generic
        {
            icon: Users,
            label: 'Black Book',
            active: false,
            locked: user.subscription === 'GRINDER',
            lockedMessage: "Access Denied. Intelligence is for Operatives. Upgrade to see the files."
        },
        {
            icon: Lock,
            label: 'The Vault',
            active: false,
            locked: user.subscription === 'GRINDER', // Totally locked for Free
            lockedMessage: "Access Denied. Intelligence is for Operatives. Upgrade to see the files."
        },
    ];

    return (
        <div className="w-full h-full flex flex-col bg-phoenix-canvas overflow-hidden border-r border-gray-100">

            {/* A. HEADER - Logo */}
            <div className="shrink-0 p-5 lg:p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    {/* Phoenix Icon */}
                    <div className="w-10 h-10 bg-gradient-to-br from-phoenix-gold to-amber-600 rounded-sm flex items-center justify-center shadow-phoenix-gold">
                        <Crown size={20} className="text-white" />
                    </div>
                    <div>
                        <h1 className="font-display font-bold text-lg tracking-widest text-phoenix-navy">
                            LUMINEL
                        </h1>
                        <p className="font-sans text-[9px] text-phoenix-gold tracking-[0.3em] uppercase font-semibold">
                            EXECUTIVE
                        </p>
                    </div>
                </div>
            </div>

            {/* B. NAVIGATION */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-5 space-y-1 min-h-0">
                {navItems.map((item) => (
                    <div key={item.id}>
                        <div
                            onClick={() => handleItemClick(item)}
                            className={`
                                group flex items-center gap-3 px-4 py-3 rounded-sm cursor-pointer transition-all duration-200
                                ${item.active
                                    ? 'bg-gradient-to-r from-amber-50 to-transparent border-l-[3px] border-phoenix-gold text-phoenix-ink'
                                    : 'hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-transparent hover:border-l-[3px] hover:border-phoenix-gold/50 text-phoenix-ghost hover:text-phoenix-ink'
                                }
                                ${item.locked ? 'opacity-60 grayscale' : ''}
                            `}
                        >
                            <item.icon size={18} className={item.active ? 'text-phoenix-gold' : 'group-hover:text-phoenix-gold'} />
                            <span className="font-sans text-sm font-medium">{item.label}</span>
                            {item.locked && <Lock size={12} className="ml-auto text-phoenix-ghost" />}
                            {item.children && !item.locked && (
                                <ChevronRight size={14} className={`ml-auto transition-transform ${expandedItem === item.id ? 'rotate-90' : ''}`} />
                            )}
                        </div>

                        {/* Sub-menu */}
                        {item.children && expandedItem === item.id && !item.locked && (
                            <div className="ml-8 mt-1 space-y-1 border-l border-gray-100 pl-2 animate-fade-in-down">
                                {item.children.map((child) => (
                                    <div
                                        key={child.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (child.locked) {
                                                onOpenUpgrade?.(child.lockedMessage);
                                            } else {
                                                onNavigate?.(child.id);
                                            }
                                        }}
                                        className={`
                                            flex items-center gap-2 px-3 py-2 rounded-sm cursor-pointer text-xs font-sans transition-colors
                                            ${child.locked ? 'text-gray-400' : 'text-phoenix-ghost hover:text-phoenix-ink hover:bg-gray-50'}
                                        `}
                                    >
                                        <child.icon size={14} />
                                        <span>{child.label}</span>
                                        {child.locked && <Lock size={10} className="ml-auto text-phoenix-gold" />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* Divider */}
                <div className="my-4 border-t border-gray-100"></div>

                {/* Badge Quick Access */}
                <div onClick={onOpenMap} className="group cursor-pointer">
                    <div className="p-4 bg-phoenix-snow border border-gray-200 rounded-sm hover:border-phoenix-gold transition-all duration-300 hover:shadow-phoenix-gold">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-full border-2 ${getTierAccent()} flex items-center justify-center bg-white shadow-sm`}>
                                    <span className="font-display font-bold text-sm">{user.level}</span>
                                </div>
                                <div>
                                    <div className="text-[10px] font-sans text-phoenix-ghost uppercase tracking-widest">Clearance</div>
                                    <div className="font-display font-bold text-phoenix-ink">{user.role}</div>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-phoenix-ghost group-hover:text-phoenix-gold group-hover:translate-x-1 transition-all" />
                        </div>
                    </div>
                </div>

                {/* Daily Intel */}
                <div className="mt-4">
                    <DailyBriefing userTier={user.subscription as 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE'} />
                </div>
            </div>

            {/* C. FOOTER - Profile */}
            <div className="shrink-0 mt-auto p-4 border-t border-gray-100 bg-phoenix-snow">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-phoenix-navy rounded-full flex items-center justify-center text-white font-sans font-bold text-sm">
                            {user.name?.charAt(0) || 'J'}
                        </div>
                        <div>
                            <div className="font-sans text-sm font-medium text-phoenix-ink">{user.name}</div>
                            <div className={`text-[10px] font-sans uppercase tracking-widest ${getTierAccent()}`}>{user.subscription}</div>
                        </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-sm transition-colors">
                        <Settings size={16} className="text-phoenix-ghost" />
                    </button>
                </div>
            </div>
        </div>
    );
};
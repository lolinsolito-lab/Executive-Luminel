import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Home, BookOpen, Users, Lock, Settings, Crown, ChevronRight } from 'lucide-react';
import { DailyMission } from './DailyMission';
import { hasAccess } from '../lib/permissions';
import { SettingsModal } from './SettingsModal';

interface SidebarProps {
    user: UserProfile;
    activePage?: string;
    onNavigate?: (page: string) => void;
    onOpenMap: () => void;
    onOpenUpgrade?: (feature?: string) => void;
    isAdmin?: boolean;
    onOpenAdmin?: () => void;
    onPanic: (mode: 'toxic' | 'escape' | 'defense') => void;
}

// V7 PHOENIX - THE ARSENAL
export const Sidebar: React.FC<SidebarProps> = ({ user, onOpenMap, onOpenUpgrade, onNavigate, activePage, isAdmin, onOpenAdmin, onPanic }) => {

    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleItemClick = (item: any) => {
        if (item.children) {
            setExpandedItem(expandedItem === item.id ? null : item.id);
        } else if (item.locked) {
            onOpenUpgrade?.(item.lockedMessage);
        } else {
            onNavigate?.(item.id);
        }
    };

    // Tier accent color logic
    const getTierAccent = () => {
        switch (user.subscription) {
            case 'EXECUTIVE': return 'text-phoenix-gold border-phoenix-gold';
            case 'STRATEGIST': return 'text-phoenix-tier-operative border-phoenix-tier-operative';
            default: return 'text-phoenix-ghost border-phoenix-ghost';
        }
    };

    const navItems = [
        { id: 'command', icon: Home, label: 'Command', active: activePage === 'command', locked: false },
        {
            id: 'codex',
            icon: BookOpen,
            label: 'The Codex',
            active: activePage === 'codex',
            locked: !hasAccess(user, 'codex'),
            lockedMessage: "Access Denied. The Neural Codex requires Strategist Clearance."
        },
        {
            id: 'blackbook',
            icon: Users,
            label: 'Black Book',
            active: activePage === 'blackbook',
            locked: !hasAccess(user, 'blackbook'),
            lockedMessage: "Access Denied. Intelligence is for Operatives. Upgrade to see the files."
        },
        {
            id: 'vault',
            icon: Lock,
            label: 'The Vault',
            active: activePage === 'vault',
            locked: !hasAccess(user, 'vault'),
            lockedMessage: "Access Denied. Intelligence is for Operatives. Upgrade to see the files."
        },
    ];

    return (
        <div className="w-full h-full flex flex-col bg-phoenix-canvas overflow-hidden border-r border-gray-100 min-h-0">

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

                {/* GOD MODE (Admin Only) - Moved here per request */}
                {isAdmin && (
                    <button
                        onClick={onOpenAdmin}
                        className="mt-4 w-full py-2 bg-red-50 text-red-600 text-[10px] font-sans font-bold uppercase tracking-widest border border-red-200 hover:bg-red-100 transition-colors flex items-center justify-center gap-2 rounded-sm"
                    >
                        <Crown size={12} /> GOD MODE
                    </button>
                )}
            </div>

            {/* B. NAVIGATION */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-5 space-y-1 min-h-0 custom-scrollbar relative pb-24">
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
                        </div>
                    </div>
                ))}

                {/* Divider */}
                <div className="my-4 border-t border-gray-100"></div>

                {/* V7.7 PANIC MODE (Quick Actions) */}
                <div className="mb-6">
                    <h3 className="px-2 mb-2 font-display text-[10px] font-bold text-phoenix-gold uppercase tracking-[0.2em]">Panic Mode</h3>
                    <div className="space-y-2">
                        <button onClick={() => onPanic('toxic')} className="w-full flex items-center gap-3 px-3 py-2 bg-red-50/50 border border-red-100 rounded-sm hover:bg-red-50 hover:border-red-200 transition-all text-left group">
                            <span className="text-lg">🆘</span>
                            <div>
                                <div className="font-sans text-xs font-bold text-red-800">Toxic Reply</div>
                                <div className="font-sans text-[9px] text-red-500">Instant Script</div>
                            </div>
                        </button>
                        <button onClick={() => onPanic('escape')} className="w-full flex items-center gap-3 px-3 py-2 bg-amber-50/50 border border-amber-100 rounded-sm hover:bg-amber-50 hover:border-amber-200 transition-all text-left group">
                            <span className="text-lg">📅</span>
                            <div>
                                <div className="font-sans text-xs font-bold text-amber-800">Meeting Escape</div>
                                <div className="font-sans text-[9px] text-amber-600">Excuse Generator</div>
                            </div>
                        </button>
                        <button onClick={() => onPanic('defense')} className="w-full flex items-center gap-3 px-3 py-2 bg-slate-50 border border-slate-100 rounded-sm hover:bg-slate-100 transition-all text-left group">
                            <span className="text-lg">🛡️</span>
                            <div>
                                <div className="font-sans text-xs font-bold text-slate-700">Raise Defense</div>
                                <div className="font-sans text-[9px] text-slate-500">Counter-argument</div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* V7.7 GAMIFICATION ENGINE (Daily Mission) */}
                <DailyMission />
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
                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="p-2 hover:bg-gray-100 rounded-sm transition-colors"
                    >
                        <Settings size={16} className="text-phoenix-ghost" />
                    </button>
                </div>
            </div>

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                user={user}
            />
        </div>
    );
};
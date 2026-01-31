import React from 'react';
import { Home, BookOpen, Users, Lock, Zap, MousePointer2 } from 'lucide-react';

interface TacticalMenuProps {
    activeTab: string;
    onNavigate: (tab: string) => void;
}

export const TacticalMenu: React.FC<TacticalMenuProps> = ({ activeTab, onNavigate }) => {

    const menuItems = [
        { id: 'command', icon: Home, label: 'Command Center', color: 'text-corp-platinum' },
        { id: 'codex', icon: BookOpen, label: 'Neural Codex', color: 'text-corp-blue' },
        { id: 'blackbook', icon: Users, label: 'Black Book', color: 'text-emerald-500' },
        { id: 'vault', icon: Lock, label: 'The Vault', color: 'text-corp-gold' },
        { id: 'sandbox', icon: MousePointer2, label: 'Sandbox', color: 'text-corp-silver' },
    ];

    return (
        <div className="w-20 h-full bg-corp-onyx border-r border-corp-border flex flex-col items-center py-8 z-30 shrink-0">
            {/* Logo Icon */}
            <div className="mb-12">
                <div className="w-10 h-10 bg-corp-gold/10 border border-corp-gold rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.2)]">
                    <span className="font-display font-bold text-corp-gold text-lg">L</span>
                </div>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-8 w-full items-center">
                {menuItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`group relative flex items-center justify-center w-12 h-12 rounded-sm transition-all duration-300 ${isActive
                                    ? 'bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10'
                                    : 'hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            <item.icon
                                size={20}
                                className={`transition-colors duration-300 ${isActive ? item.color : 'text-corp-silver group-hover:text-corp-platinum'}`}
                            />

                            {/* Tooltip */}
                            <div className="absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                <div className="bg-corp-bg border border-corp-border text-corp-platinum text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 whitespace-nowrap shadow-xl backdrop-blur-md">
                                    {item.label}
                                </div>
                            </div>

                            {/* Active Indicator */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-corp-gold shadow-[0_0_10px_#C5A059]"></div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Bottom Action */}
            <div className="mt-auto">
                <button
                    onClick={() => onNavigate('out-of-cycle')}
                    className="w-12 h-12 flex items-center justify-center text-corp-danger hover:bg-corp-danger/10 rounded-sm transition-colors group relative"
                >
                    <Zap size={20} />
                    {/* Tooltip */}
                    <div className="absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                        <div className="bg-corp-bg border border-corp-danger/30 text-corp-danger text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 whitespace-nowrap shadow-xl backdrop-blur-md">
                            OUT OF CYCLE
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

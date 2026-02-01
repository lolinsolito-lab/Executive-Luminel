import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { UserProfile, VaultItem } from '../types';
import { VAULT_DEFAULTS } from '../data/vaultData';
import { Sword, FileText, Video, Mic, Scroll, Lock, Eye, Download, Crown, ChevronRight } from 'lucide-react';

interface VaultProps {
    user: UserProfile;
    onOpenUpgrade: (feature: string) => void;
}

export const Vault: React.FC<VaultProps> = ({ user, onOpenUpgrade }) => {
    const [items, setItems] = useState<VaultItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVault = async () => {
            setLoading(true);
            const { data } = await supabase
                .from('vault_items')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });

            if (data && data.length > 0) {
                setItems(data as any);
            } else {
                // FALLBACK: Use Local Defaults if DB is empty
                setItems(VAULT_DEFAULTS);
            }
            setLoading(false);
        };
        fetchVault();
    }, []);

    // TIER LOGIC
    const userTierValue = {
        'GRINDER': 1,
        'STRATEGIST': 2,
        'EXECUTIVE': 3
    }[user.subscription] || 0;

    const getRequiredTierValue = (tier: string) => {
        switch (tier) {
            case 'prompter': return 0; // Legacy
            case 'tourist': return 1;
            case 'mercenary': return 2;
            case 'partner': return 3;
            default: return 99;
        }
    };

    const isUnlocked = (itemTier: string) => {
        return userTierValue >= getRequiredTierValue(itemTier);
    };

    const handleAccess = (item: VaultItem) => {
        if (item.content_type === 'text') {
            // Show modal or expand (For now simple alert or open logic to be added)
            alert("Viewing Text Content: " + item.title);
        } else if (item.content_body) {
            window.open(item.content_body, '_blank');
        }
    };

    const TypeIcon = ({ type }: { type: string }) => {
        switch (type) {
            case 'pdf': return <FileText className="text-red-400" size={20} />;
            case 'video_link': return <Video className="text-purple-400" size={20} />;
            case 'audio_link': return <Mic className="text-emerald-400" size={20} />;
            default: return <Scroll className="text-blue-400" size={20} />;
        }
    };

    return (
        <div className="h-full bg-phoenix-canvas p-6 lg:p-10 animate-fade-in overflow-y-auto">
            {/* HEADER */}
            <div className="mb-8 border-b border-gray-100 pb-4">
                <h2 className="font-display font-bold text-2xl text-phoenix-navy tracking-widest uppercase flex items-center gap-3">
                    <Sword className="text-phoenix-gold" /> IL VAULT
                </h2>
                <p className="text-xs text-phoenix-ghost mt-1 font-serif italic">
                    Strategie classificate e armi per il campo di battaglia corporativo.
                </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {items.map(item => {
                    const unlocked = isUnlocked(item.required_tier);
                    const showProject = unlocked || item.is_preview;

                    if (!showProject) return null;

                    return (
                        <div
                            key={item.id}
                            className={`
                                relative p-6 border-l-4 rounded-sm shadow-sm transition-all duration-300 group
                                ${unlocked
                                    ? 'bg-white border-l-phoenix-gold hover:shadow-lg hover:-translate-y-1'
                                    : 'bg-gray-50 border-l-gray-300 opacity-90'}
                            `}
                        >
                            {/* LOCKED OVERLAY */}
                            {!unlocked && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Lock size={32} className="text-gray-400 mb-2" />
                                    <h4 className="font-display font-bold text-phoenix-navy uppercase tracking-widest text-sm mb-1">Classificato</h4>
                                    <p className="font-sans text-[10px] text-gray-500 mb-4">Esegui l'Upgrade per accedere a quest'arma.</p>
                                    <button
                                        onClick={() => onOpenUpgrade(`Unlock: ${item.title}`)}
                                        className="px-4 py-2 bg-phoenix-gold text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-amber-600 transition-colors shadow-lg"
                                    >
                                        Sblocca Immediatamente
                                    </button>
                                </div>
                            )}

                            {/* CARD HEADER */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-phoenix-snow rounded-full border border-gray-100 group-hover:border-phoenix-gold/30 transition-colors">
                                    <TypeIcon type={item.content_type} />
                                </div>
                                {!unlocked && (
                                    <div className="px-2 py-1 bg-gray-200 text-gray-500 text-[9px] font-bold uppercase tracking-wider rounded-sm flex items-center gap-1">
                                        <Lock size={10} /> {item.required_tier === 'partner' ? 'Executive Only' : 'Strategist Only'}
                                    </div>
                                )}
                            </div>

                            {/* CONTENT */}
                            <h3 className="font-display font-bold text-lg text-phoenix-ink mb-2 leading-tight group-hover:text-phoenix-gold transition-colors">
                                {item.title}
                            </h3>
                            <p className={`font-serif text-xs text-phoenix-ghost leading-relaxed line-clamp-3 ${!unlocked ? 'blur-[3px] select-none' : ''}`}>
                                {item.description}
                            </p>

                            {/* TAGS */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {item.ai_tags?.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[9px] font-mono text-gray-400 uppercase">#{tag}</span>
                                ))}
                            </div>

                            {/* ACTION BUTTON (If Unlocked) */}
                            {unlocked && (
                                <button
                                    onClick={() => handleAccess(item)}
                                    className="mt-6 w-full py-2 border border-gray-200 hover:border-phoenix-gold text-xs font-bold uppercase tracking-widest text-phoenix-navy hover:text-phoenix-gold transition-all flex items-center justify-center gap-2"
                                >
                                    {item.content_type === 'text' ? <Eye size={14} /> : <Download size={14} />} Accedi al Materiale
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { UserProfile, BlackBookEntry } from '../types';
import { Users, Plus, Save, Trash2, Search, UserMinus, ShieldAlert, Heart, Skull, Meh, Crown } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface BlackBookProps {
    user: UserProfile;
    onOpenUpgrade?: (feature: string) => void;
}

export const BlackBook: React.FC<BlackBookProps> = ({ user, onOpenUpgrade }) => {
    const [entries, setEntries] = useState<BlackBookEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // LIMIT LOGIC
    const getCleanTier = (tier: string) => {
        // Fallback map in case of mismatch
        if (tier === 'analyst') return 'GRINDER';
        if (tier === 'strategist') return 'STRATEGIST';
        if (tier === 'executive' || tier === 'partner') return 'EXECUTIVE';
        return tier;
    };

    const maxEntries = {
        'GRINDER': 1,
        'STRATEGIST': 5,
        'EXECUTIVE': 9999
    }[getCleanTier(user.subscription) || 'GRINDER'] || 1;

    const currentCount = entries.length;
    const isLimitReached = currentCount >= maxEntries;

    const handleAddClick = () => {
        if (isLimitReached) {
            if (onOpenUpgrade) onOpenUpgrade('Unlock: Unlimited Dossiers');
            else alert("Upgrade Plan to add more profiles.");
        } else {
            setIsFormOpen(true);
        }
    };

    // Form State
    const [formData, setFormData] = useState<Partial<BlackBookEntry>>({
        name: '',
        role: '',
        status: 'Neutral',
        weakness: '',
        leverage: ''
    });

    const fetchEntries = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('black_book')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (data) setEntries(data as any);
        setLoading(false);
    };

    useEffect(() => {
        if (user.id) fetchEntries();
    }, [user.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { error } = await (supabase.from('black_book') as any).insert({
                user_id: user.id,
                name: formData.name,
                role: formData.role,
                status: formData.status,
                weakness: formData.weakness,
                leverage: formData.leverage
            });

            if (error) throw error;

            setIsFormOpen(false);
            setFormData({ name: '', role: '', status: 'Neutral', weakness: '', leverage: '' });
            fetchEntries();
        } catch (err) {
            console.error("Failed to add target", err);
            alert("Errore nel dossier.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Confirm neutralization of this profile?")) return;
        const { error } = await supabase.from('black_book').delete().eq('id', id);
        if (!error) fetchEntries();
    };

    const StatusIcon = ({ status }: { status: string }) => {
        switch (status) {
            case 'Enemy': return <Skull size={14} className="text-red-600" />;
            case 'Ally': return <Heart size={14} className="text-emerald-600" />;
            case 'Target': return <ShieldAlert size={14} className="text-amber-600" />;
            default: return <Meh size={14} className="text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Enemy': return 'bg-red-50 text-red-700 border-red-200';
            case 'Ally': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Target': return 'bg-amber-50 text-amber-700 border-amber-200';
            default: return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    return (
        <div className="h-full flex flex-col bg-phoenix-canvas animate-fade-in p-6 lg:p-10 overflow-hidden">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="font-display font-bold text-2xl text-phoenix-navy tracking-widest uppercase flex items-center gap-3">
                        <Users className="text-phoenix-gold" /> PERSONNEL DOSSIER
                    </h2>
                    <div className="flex items-center gap-3 mt-1">
                        <p className="text-xs text-phoenix-ghost font-serif italic">Know your friends. Study your enemies.</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isLimitReached ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                            {entries.length} / {maxEntries > 1000 ? '∞' : maxEntries}
                        </span>
                    </div>
                </div>
                <button
                    onClick={handleAddClick}
                    className={`flex items-center gap-2 px-5 py-2.5 font-bold text-xs uppercase tracking-widest rounded-sm transition-colors shadow-lg
                        ${isLimitReached
                            ? 'bg-phoenix-gold text-white hover:bg-amber-500 animate-pulse'
                            : 'bg-phoenix-navy text-white hover:bg-phoenix-gold hover:text-phoenix-navy'
                        }
                    `}
                >
                    {isLimitReached ? (
                        <><Crown size={16} /> UNLOCK LIMITS</>
                    ) : (
                        <><Plus size={16} /> ADD PROFILE</>
                    )}
                </button>
            </div>

            {/* LIST / GRID */}
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="text-center p-10 text-phoenix-ghost italic">Processing Intelligence...</div>
                ) : entries.length === 0 ? (
                    <div className="text-center p-20 border-2 border-dashed border-gray-200 rounded-lg">
                        <Users size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="font-display font-bold text-phoenix-ghost text-lg">NO PROFILES FOUND</h3>
                        <p className="text-sm text-gray-400 mt-2">Start profiling your network to gain leverage.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {entries.map(entry => (
                            <div key={entry.id} className="bg-white border border-gray-100 p-5 rounded-sm shadow-sm hover:shadow-md transition-shadow group relative">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-display font-bold text-lg text-phoenix-ink">{entry.name}</h3>
                                        <span className="font-sans text-xs text-phoenix-ghost uppercase tracking-wide">{entry.role}</span>
                                    </div>
                                    <div className={`px-2 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${getStatusColor(entry.status)}`}>
                                        <StatusIcon status={entry.status} /> {entry.status}
                                    </div>
                                </div>

                                <div className="space-y-3 mt-4">
                                    <div className="bg-red-50 p-3 rounded-sm border border-red-100">
                                        <span className="block text-[9px] font-bold text-red-400 uppercase tracking-widest mb-1">WEAKNESS</span>
                                        <p className="text-xs text-red-900 font-medium leading-relaxed">{entry.weakness || 'Not identified yet.'}</p>
                                    </div>
                                    <div className="bg-amber-50 p-3 rounded-sm border border-amber-100">
                                        <span className="block text-[9px] font-bold text-amber-500 uppercase tracking-widest mb-1">LEVERAGE</span>
                                        <p className="text-xs text-amber-900 font-medium leading-relaxed">{entry.leverage || 'No leverage acquired.'}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDelete(entry.id)}
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-300 hover:text-red-500"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* MODAL FORM */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 bg-phoenix-navy/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <form onSubmit={handleSubmit} className="bg-white w-full max-w-lg p-8 rounded-sm shadow-2xl animate-scale-in">
                        <h3 className="font-display font-bold text-xl text-phoenix-navy mb-6 tracking-widest uppercase border-b border-gray-100 pb-2">New Dossier</h3>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-phoenix-gold mb-1">Name</label>
                                    <input
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 p-2 text-sm focus:border-phoenix-gold focus:outline-none rounded-sm"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-phoenix-gold mb-1">Status</label>
                                    <select
                                        className="w-full bg-gray-50 border border-gray-200 p-2 text-sm focus:border-phoenix-gold focus:outline-none rounded-sm"
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                                    >
                                        <option value="Neutral">Neutral</option>
                                        <option value="Enemy">Enemy</option>
                                        <option value="Ally">Ally</option>
                                        <option value="Target">Target</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase font-bold text-phoenix-gold mb-1">Role / Title</label>
                                <input
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 p-2 text-sm focus:border-phoenix-gold focus:outline-none rounded-sm"
                                    placeholder="e.g. VP of Sales"
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase font-bold text-phoenix-gold mb-1">Known Weakness</label>
                                <textarea
                                    className="w-full bg-gray-50 border border-gray-200 p-2 text-sm focus:border-phoenix-gold focus:outline-none rounded-sm resize-none"
                                    rows={2}
                                    placeholder="Insecure about..."
                                    value={formData.weakness}
                                    onChange={e => setFormData({ ...formData, weakness: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase font-bold text-phoenix-gold mb-1">Strategic Leverage</label>
                                <textarea
                                    className="w-full bg-gray-50 border border-gray-200 p-2 text-sm focus:border-phoenix-gold focus:outline-none rounded-sm resize-none"
                                    rows={2}
                                    placeholder="I know that he..."
                                    value={formData.leverage}
                                    onChange={e => setFormData({ ...formData, leverage: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="px-5 py-2 text-xs font-bold uppercase text-gray-500 hover:bg-gray-100 rounded-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-2 bg-phoenix-gold hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-widest rounded-sm shadow-md"
                            >
                                {submitting ? 'Creating...' : 'Create Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

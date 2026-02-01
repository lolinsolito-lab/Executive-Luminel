import React, { useState, useEffect } from 'react';
import {
    Sword, Scroll, FileText, Video, Link as LinkIcon,
    Plus, Save, Trash2, Tag, Shield, Crown, Eye
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

// Types (matching the SQL enums)
type TierType = 'tourist' | 'mercenary' | 'partner';
type ContentType = 'pdf' | 'text' | 'video_link';

interface VaultItem {
    id: string;
    title: string;
    description: string;
    content_type: ContentType;
    required_tier: TierType;
    ai_tags: string[];
    is_active: boolean;
    created_at: string;
}

export const WarRoomPanel: React.FC = () => {
    // STATE
    const [items, setItems] = useState<VaultItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // FORM STATE
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contentType, setContentType] = useState<ContentType>('text');
    const [contentBody, setContentBody] = useState('');
    const [requiredTier, setRequiredTier] = useState<TierType>('partner');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    // FEEDBACK
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // FETCH ITEMS
    const fetchVaultItems = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('vault_items')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setItems(data as any);
        if (error) console.error("Error fetching vault:", error);
        setLoading(false);
    };

    useEffect(() => {
        fetchVaultItems();
    }, []);

    // HANDLERS
    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    const handleSubmit = async () => {
        if (!title || !contentBody) return;

        setSubmitting(true);
        try {
            const { error } = await supabase.from('vault_items').insert({
                title,
                description,
                content_type: contentType,
                content_body: contentBody,
                required_tier: requiredTier,
                ai_tags: tags
            });

            if (error) throw error;

            setSuccessMsg("ASSET SECURED IN VAULT");
            fetchVaultItems(); // Refresh list

            // Reset Form
            setTitle('');
            setDescription('');
            setContentBody('');
            setTags([]);

            setTimeout(() => setSuccessMsg(null), 3000);
        } catch (e: any) {
            console.error("Upload failed", e);
            alert(`Upload Failed: ${e.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-140px)] gap-6 animate-fade-in">

            {/* LEFT PANEL: THE ARSENAL (List) */}
            <div className="w-1/3 flex flex-col gap-4">
                <div className="flex items-center gap-2 p-2 border-b border-corp-border">
                    <Sword className="text-corp-gold" size={18} />
                    <h3 className="font-display font-bold text-corp-platinum tracking-widest">THE ARSENAL</h3>
                    <span className="ml-auto text-xs text-corp-silver font-mono">{items.length} ASSETS</span>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                    {loading ? (
                        <div className="text-corp-silver text-xs font-mono animate-pulse">Scanning Vault...</div>
                    ) : items.map(item => (
                        <div key={item.id} className="p-4 bg-corp-bg/50 border border-corp-border/50 hover:border-corp-gold/30 transition-all rounded-sm group relative">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    {item.content_type === 'text' && <FileText size={14} className="text-blue-400" />}
                                    {item.content_type === 'pdf' && <Scroll size={14} className="text-red-400" />}
                                    {item.content_type === 'video_link' && <Video size={14} className="text-purple-400" />}
                                    <span className="font-bold text-corp-platinum text-sm">{item.title}</span>
                                </div>
                                <TierBadge tier={item.required_tier} />
                            </div>
                            <p className="text-xs text-corp-silver line-clamp-2 mb-2">{item.description || 'No description provided.'}</p>

                            <div className="flex gap-2 flex-wrap">
                                {item.ai_tags.map(tag => (
                                    <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-white/5 text-corp-silver rounded-sm font-mono">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT PANEL: THE FORGE (Creator) */}
            <div className="w-2/3 bg-corp-onyx/50 border border-corp-gold/20 flex flex-col rounded-sm relative overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-corp-gold/20 bg-corp-gold/5 flex justify-between items-center">
                    <h2 className="font-display font-bold text-xl text-corp-gold flex items-center gap-2">
                        <Plus size={20} /> FORGE NEW ASSET
                    </h2>
                    {successMsg && (
                        <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold animate-pulse">
                            {successMsg}
                        </div>
                    )}
                </div>

                <div className="p-6 flex-1 overflow-y-auto space-y-6">
                    {/* Title & Type */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 space-y-1">
                            <label className="text-[10px] uppercase font-bold text-corp-silver tracking-wider">Asset Title</label>
                            <input
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full bg-black/40 border border-corp-border p-3 text-corp-platinum focus:border-corp-gold focus:outline-none transition-colors"
                                placeholder="e.g. The Salary Negotiations Script"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-corp-silver tracking-wider">Format</label>
                            <select
                                value={contentType}
                                onChange={e => setContentType(e.target.value as ContentType)}
                                className="w-full bg-black/40 border border-corp-border p-3 text-corp-platinum focus:border-corp-gold focus:outline-none"
                            >
                                <option value="text">Rich Text</option>
                                <option value="pdf">PDF Document</option>
                                <option value="video_link">Video Link</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-corp-silver tracking-wider">Internal Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={2}
                            className="w-full bg-black/40 border border-corp-border p-3 text-corp-platinum focus:border-corp-gold focus:outline-none transition-colors resize-none"
                            placeholder="Brief briefing for the AI..."
                        />
                    </div>

                    {/* Content Body */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-corp-silver tracking-wider">
                            {contentType === 'text' ? 'Content Body (Markdown Supported)' : 'Resource URL'}
                        </label>
                        {contentType === 'text' ? (
                            <textarea
                                value={contentBody}
                                onChange={e => setContentBody(e.target.value)}
                                rows={10}
                                className="w-full bg-black/40 border border-corp-border p-3 text-corp-platinum font-mono text-sm focus:border-corp-gold focus:outline-none transition-colors"
                                placeholder="# Strategy 1..."
                            />
                        ) : (
                            <div className="relative">
                                <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver" />
                                <input
                                    value={contentBody}
                                    onChange={e => setContentBody(e.target.value)}
                                    className="w-full bg-black/40 border border-corp-border p-3 pl-10 text-corp-platinum focus:border-corp-gold focus:outline-none"
                                    placeholder="https://..."
                                />
                            </div>
                        )}
                    </div>

                    {/* Clearance & Tags */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Clearance */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-corp-silver tracking-wider block">Clearance Level</label>
                            <div className="flex gap-2">
                                <TierRadio
                                    value="tourist"
                                    selected={requiredTier}
                                    onChange={setRequiredTier}
                                    label="Tourist"
                                    color="gray"
                                />
                                <TierRadio
                                    value="mercenary"
                                    selected={requiredTier}
                                    onChange={setRequiredTier}
                                    label="Mercenary"
                                    color="blue"
                                />
                                <TierRadio
                                    value="partner"
                                    selected={requiredTier}
                                    onChange={setRequiredTier}
                                    label="Partner"
                                    color="gold"
                                />
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-corp-silver tracking-wider block">AI Trigger Tags</label>
                            <div className="relative">
                                <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver" />
                                <input
                                    value={tagInput}
                                    onChange={e => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    className="w-full bg-black/40 border border-corp-border p-3 pl-10 text-corp-platinum focus:border-corp-gold focus:outline-none"
                                    placeholder="Add tag and hit Enter..."
                                />
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map(tag => (
                                    <span key={tag} className="text-xs px-2 py-1 bg-corp-gold/10 text-corp-gold border border-corp-gold/20 rounded-full flex items-center gap-1 cursor-pointer hover:bg-corp-gold/20" onClick={() => removeTag(tag)}>
                                        #{tag} <Xicon />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 border-t border-corp-gold/20 bg-corp-onyx">
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold uppercase tracking-[0.2em] shadow-lg shadow-amber-900/20 transition-all active:scale-[0.99] flex items-center justify-center gap-3"
                    >
                        {submitting ? 'UPLOADING...' : (
                            <>
                                <Save size={18} /> UPLOAD TO VAULT
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

// MINI COMPONENTS
const TierBadge: React.FC<{ tier: TierType }> = ({ tier }) => {
    if (tier === 'partner') return <span className="text-[10px] font-bold px-2 py-0.5 bg-corp-gold/20 text-corp-gold border border-corp-gold/50 rounded-sm">PARTNER</span>;
    if (tier === 'mercenary') return <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-sm">MERCENARY</span>;
    return <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded-sm">TOURIST</span>;
};

const TierRadio: React.FC<{ value: TierType, selected: TierType, onChange: (v: TierType) => void, label: string, color: string }> = ({ value, selected, onChange, label, color }) => {
    const isSelected = value === selected;
    let activeClass = '';
    if (isSelected) {
        if (value === 'partner') activeClass = 'bg-corp-gold text-corp-onyx border-corp-gold ring-1 ring-corp-gold';
        else if (value === 'mercenary') activeClass = 'bg-blue-600 text-white border-blue-500';
        else activeClass = 'bg-gray-600 text-white border-gray-500';
    } else {
        activeClass = 'bg-black/40 text-corp-silver border-corp-border hover:border-corp-silver';
    }

    return (
        <button
            onClick={() => onChange(value)}
            className={`flex-1 py-2 text-xs font-bold uppercase border rounded-sm transition-all ${activeClass}`}
        >
            {label}
        </button>
    );
};

// Tiny Helper for X icon
const Xicon = () => (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

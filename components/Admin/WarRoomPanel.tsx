import React, { useState, useEffect } from 'react';
import {
    Sword, Scroll, FileText, Video, Link as LinkIcon,
    Plus, Save, Trash2, Tag, Shield, Crown, AlertTriangle, X,
    Mic, Eye, EyeOff
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

// Types (matching the SQL enums + new updates)
type TierType = 'tourist' | 'mercenary' | 'partner';
type ContentType = 'text' | 'pdf' | 'video_link' | 'audio_link';

interface VaultItem {
    id: string;
    title: string;
    description: string;
    content_type: ContentType;
    required_tier: TierType;
    ai_tags: string[];
    is_active: boolean;
    is_preview: boolean;
    created_at: string;
}

export const WarRoomPanel: React.FC = () => {
    // STATE
    const [items, setItems] = useState<VaultItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // FORM STATE
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contentType, setContentType] = useState<ContentType>('text');
    const [contentBody, setContentBody] = useState('');
    const [requiredTier, setRequiredTier] = useState<TierType>('partner');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [isPreview, setIsPreview] = useState(false);

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

    const handleDelete = async () => {
        if (!deletingId) return;

        try {
            const { error } = await supabase
                .from('vault_items')
                .delete()
                .eq('id', deletingId);

            if (error) throw error;

            fetchVaultItems();
            setDeletingId(null);
        } catch (e) {
            console.error("Delete failed", e);
            alert("Eliminazione fallita");
        }
    };

    const handleSubmit = async () => {
        if (!title || !contentBody || !contentType) {
            alert("Compila i campi obbligatori (Titolo, Tipo, Contenuto).");
            return;
        }

        setSubmitting(true);
        try {
            const { error } = await (supabase.from('vault_items') as any).insert({
                title,
                description,
                content_type: contentType,
                content_body: contentBody,
                required_tier: requiredTier,
                ai_tags: tags,
                is_preview: isPreview
            });

            if (error) throw error;

            setSuccessMsg("ARMA FORGIATA CON SUCCESSO");
            fetchVaultItems(); // Refresh list

            // Reset Form
            setTitle('');
            setDescription('');
            setContentBody('');
            setTags([]);
            setIsPreview(false);

            setTimeout(() => setSuccessMsg(null), 3000);
        } catch (e: any) {
            console.error("Upload failed", e);
            alert(`Upload Failed: ${e.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    // LUXURY INPUT STYLES (Forced Override)
    const luxuryInputClass = "w-full !bg-[#FFFBF0] !border !border-[#E2E8F0] p-3 !text-[#0F172A] focus:!border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none transition-all rounded-sm font-serif placeholder:text-gray-400/70";
    const luxuryLabelClass = "text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest mb-1 block";

    return (
        <div className="h-[calc(100vh-180px)] grid grid-cols-2 gap-8 animate-fade-in text-corp-platinum">

            {/* LEFT COLUMN: THE ARCHIVE (Read/Delete) */}
            <div className="flex flex-col gap-4 overflow-hidden">
                <div className="flex items-center justify-between border-b-2 border-corp-gold pb-2 mb-2">
                    <h3 className="font-display font-bold text-xl text-corp-gold tracking-widest uppercase flex items-center gap-2">
                        <Sword size={24} /> ASSET DISPIEGATI
                    </h3>
                    <span className="font-mono text-corp-silver text-sm">{items.length} UNITÀ</span>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    {loading ? (
                        <div className="text-corp-silver italic p-4 text-center">Scansione Vault in corso...</div>
                    ) : items.length === 0 ? (
                        <div className="text-corp-silver/50 italic p-4 text-center border border-dashed border-corp-silver/20 rounded">
                            Nessun asset dispiegato. La forgia attende.
                        </div>
                    ) : items.map(item => (
                        <div key={item.id} className="relative bg-[#0F172A] border-l-4 border-corp-gold p-5 shadow-lg group hover:bg-[#1E293B] transition-colors">
                            {/* Row 1: Title + Tier */}
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <TypeIcon type={item.content_type} />
                                    <h4 className="font-bold text-white text-lg tracking-wide">{item.title}</h4>
                                    {item.is_preview && <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1"><Eye size={10} /> PREVIEW</span>}
                                </div>
                                <TierBadge tier={item.required_tier} />
                            </div>

                            {/* Row 2: Description */}
                            <p className="text-corp-silver text-sm mb-3 line-clamp-2 leading-relaxed font-serif">
                                {item.description || 'Nessuna descrizione fornita.'}
                            </p>

                            {/* Row 3: Tags + Actions */}
                            <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {item.ai_tags?.map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 bg-corp-gold/10 text-corp-gold rounded-full font-mono uppercase">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setDeletingId(item.id)}
                                    className="text-red-500/50 hover:text-red-500 p-2 rounded hover:bg-red-500/10 transition-colors"
                                    title="Elimina Asset"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT COLUMN: THE FORGE (Creator) */}
            <div className="bg-corp-onyx/80 border border-corp-gold/30 flex flex-col rounded-sm relative shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-corp-gold/30 bg-gradient-to-r from-corp-gold/10 to-transparent flex justify-between items-center">
                    <h2 className="font-display font-bold text-xl text-corp-gold flex items-center gap-2 uppercase tracking-widest">
                        <Plus size={24} /> FORGIA NUOVA ARMA
                    </h2>
                    {successMsg && (
                        <div className="px-4 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold animate-pulse uppercase">
                            {successMsg}
                        </div>
                    )}
                </div>

                <div className="p-6 flex-1 overflow-y-auto space-y-6">
                    {/* TITLE */}
                    <div className="space-y-1">
                        <label className={luxuryLabelClass}>Titolo Asset</label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className={luxuryInputClass}
                            placeholder="Es: The Salary Anchor Script"
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="space-y-1">
                        <label className={luxuryLabelClass}>Descrizione Tattica</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={2}
                            className={`${luxuryInputClass} resize-none`}
                            placeholder="Descrivi il valore strategico di questo asset (per UX utente)..."
                        />
                    </div>

                    {/* CONTENT TYPE & CLEARANCE */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className={luxuryLabelClass}>Criptografia (Formato)</label>
                            <select
                                value={contentType}
                                onChange={e => setContentType(e.target.value as ContentType)}
                                className={luxuryInputClass}
                            >
                                <option value="text">📝 TEXT SCRIPT (Markdown)</option>
                                <option value="pdf">📄 PDF DOCUMENT (File Link)</option>
                                <option value="video_link">🎥 MASTERCLASS VIDEO (Video Link)</option>
                                <option value="audio_link">🎙️ SECRET AUDIO (Podcast Link)</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className={luxuryLabelClass}>Livello Clearance</label>
                            <select
                                value={requiredTier}
                                onChange={e => setRequiredTier(e.target.value as TierType)}
                                className={luxuryInputClass}
                            >
                                <option value="tourist">Tourist (Free)</option>
                                <option value="mercenary">Mercenary (€49)</option>
                                <option value="partner">Partner (God Mode)</option>
                            </select>
                        </div>
                    </div>

                    {/* DYNAMIC CONTENT BODY */}
                    <div className="space-y-1">
                        <label className={luxuryLabelClass}>
                            {contentType === 'text' ? 'Contenuto (Markdown)' : 'URL Risorsa Sicura'}
                        </label>

                        {contentType === 'text' ? (
                            <textarea
                                value={contentBody}
                                onChange={e => setContentBody(e.target.value)}
                                rows={8}
                                className={`${luxuryInputClass} font-mono text-sm`}
                                placeholder="# Inizia qui il protocollo..."
                            />
                        ) : (
                            <div className="relative">
                                <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    value={contentBody}
                                    onChange={e => setContentBody(e.target.value)}
                                    className={`${luxuryInputClass} pl-10`}
                                    placeholder={
                                        contentType === 'pdf' ? "https://storage.supabase.co/.../doc.pdf" :
                                            contentType === 'video_link' ? "https://youtu.be/..." :
                                                "https://spotify.com/..."
                                    }
                                />
                            </div>
                        )}
                        {contentType !== 'text' && (
                            <p className="text-[9px] text-corp-silver/60 italic mt-1">* Incolla il link hostato (Supabase Storage, YouTube Non in elenco, etc).</p>
                        )}
                    </div>

                    {/* PREVIEW TRAP TOGGLE */}
                    <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-sm">
                        <button
                            onClick={() => setIsPreview(!isPreview)}
                            className={`w-10 h-6 rounded-full transition-colors relative ${isPreview ? 'bg-corp-gold' : 'bg-gray-600'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isPreview ? 'left-5' : 'left-1'}`} />
                        </button>
                        <div>
                            <span className="text-xs font-bold text-corp-gold uppercase tracking-wider block">Force Preview?</span>
                            <span className="text-[10px] text-corp-silver block">Se attivo, mostra Titolo/Descrizione anche a chi non ha accesso (Effetto Vetrina).</span>
                        </div>
                    </div>

                    {/* AI TAGS */}
                    <div className="space-y-1">
                        <label className={luxuryLabelClass}>Targeting AI (Tag)</label>
                        <div className="relative">
                            <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                value={tagInput}
                                onChange={e => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                                className={`${luxuryInputClass} pl-10`}
                                placeholder="Aggiungi tag e premi Invio..."
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2 min-h-[30px]">
                            {tags.map(tag => (
                                <span key={tag} className="text-xs px-2 py-1 bg-corp-gold/20 text-corp-gold border border-corp-gold/30 rounded-full flex items-center gap-1 cursor-pointer hover:bg-red-500/20 hover:text-red-400 font-mono" onClick={() => removeTag(tag)}>
                                    #{tag} <X size={10} />
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 border-t border-corp-gold/30 bg-corp-onyx/90 backdrop-blur-sm">
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="w-full py-4 bg-gradient-to-r from-corp-gold to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-corp-onyx font-black text-lg uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 rounded-sm"
                    >
                        {submitting ? 'CARICAMENTO...' : (
                            <>
                                <Save size={20} strokeWidth={3} /> CARICA NEL VAULT
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* DELETE MODAL */}
            {deletingId && (
                <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-corp-onyx border border-red-500/50 p-6 max-w-sm w-full shadow-[0_0_40px_rgba(220,38,38,0.2)] rounded-sm">
                        <div className="flex items-center gap-3 text-red-500 mb-4">
                            <AlertTriangle size={32} />
                            <h3 className="font-bold text-xl uppercase tracking-wider">Conferma Distruzione</h3>
                        </div>
                        <p className="text-corp-silver mb-6">
                            L'asset verrà rimosso permanentemente dal Vault. Questa azione è irreversibile. Procedere?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeletingId(null)}
                                className="flex-1 py-3 border border-corp-border text-corp-silver hover:bg-white/5 font-bold uppercase tracking-wider transition-colors rounded-sm"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider shadow-lg shadow-red-900/20 transition-colors rounded-sm"
                            >
                                Distruggi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// HELPER COMPONENTS
const TypeIcon: React.FC<{ type: ContentType }> = ({ type }) => {
    switch (type) {
        case 'pdf': return <FileText className="text-red-400" size={20} />;
        case 'video_link': return <Video className="text-purple-400" size={20} />;
        case 'audio_link': return <Mic className="text-emerald-400" size={20} />;
        case 'text': return <Scroll className="text-blue-400" size={20} />;
    }
};

const TierBadge: React.FC<{ tier: TierType }> = ({ tier }) => {
    switch (tier) {
        case 'partner':
            return <div className="px-3 py-1 bg-gradient-to-r from-yellow-600 to-yellow-800 text-white text-[10px] font-bold border border-yellow-400/50 shadow-[0_0_10px_rgba(234,179,8,0.4)] rounded-sm uppercase tracking-wider flex items-center gap-1"><Crown size={10} /> PARTNER</div>;
        case 'mercenary':
            return <div className="px-3 py-1 bg-blue-900/50 text-blue-300 text-[10px] font-bold border border-blue-500/30 rounded-sm uppercase tracking-wider flex items-center gap-1"><Shield size={10} /> MERCENARY</div>;
        default:
            return <div className="px-3 py-1 bg-gray-800 text-gray-400 text-[10px] font-bold border border-gray-600/30 rounded-sm uppercase tracking-wider">TOURIST</div>;
    }
};


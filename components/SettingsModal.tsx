import React, { useState } from 'react';
import { X, Trash2, Shield, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { UserProfile } from '../types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserProfile;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, user }) => {
    const [confirmNuke, setConfirmNuke] = useState(false);
    const [nuking, setNuking] = useState(false);

    if (!isOpen) return null;

    const handleNukeData = async () => {
        if (!confirmNuke) {
            setConfirmNuke(true);
            return;
        }

        setNuking(true);
        try {
            // GDPR Requirement: Right to be Forgotten
            // 1. Delete Chat History
            await supabase.from('chat_history').delete().eq('user_id', user.id);

            // 2. Reset Profile Data (Optional, but user said "delete chat logs")
            // User request: "Delete all their chat logs instantly"

            // 3. Clear Local Storage
            localStorage.clear();

            // 4. Force Reload
            window.location.reload();
        } catch (e) {
            console.error("Nuke failed", e);
            setNuking(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-phoenix-canvas border border-phoenix-ghost rounded-sm w-full max-w-md p-6 shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-phoenix-ghost hover:text-phoenix-ink transition-colors"
                >
                    <X size={20} />
                </button>

                <h2 className="font-display font-bold text-xl text-phoenix-ink mb-6 flex items-center gap-2">
                    <Shield size={20} className="text-phoenix-gold" />
                    Protocol Settings
                </h2>

                <div className="space-y-6">
                    {/* Profile Section */}
                    <div className="space-y-2 pb-6 border-b border-gray-100">
                        <label className="text-xs font-bold text-phoenix-ghost uppercase tracking-widest">Digital Identity</label>
                        <div className="flex items-center justify-between bg-phoenix-snow p-3 rounded-sm border border-gray-200">
                            <div>
                                <div className="font-bold text-phoenix-ink">{user.name}</div>
                                <div className="text-xs text-phoenix-ghost">{user.email}</div>
                            </div>
                            <div className="text-xs font-mono text-phoenix-gold border border-phoenix-gold px-2 py-1 rounded-full">
                                {user.subscription}
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
                            <Trash2 size={12} /> Danger Zone
                        </label>

                        <div className="bg-red-50 border border-red-100 p-4 rounded-sm">
                            <h3 className="font-bold text-red-800 text-sm mb-1">Nuke Data (GDPR)</h3>
                            <p className="text-xs text-red-600/80 mb-4">
                                Permanently delete all your chat logs and tactical history. This action cannot be undone. "Right to be Forgotten".
                            </p>

                            <button
                                onClick={handleNukeData}
                                disabled={nuking}
                                className={`w-full py-2 px-4 rounded-sm font-bold text-xs uppercase tracking-widest transition-all
                                    ${confirmNuke
                                        ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse'
                                        : 'bg-white border border-red-200 text-red-600 hover:bg-red-50'
                                    }`}
                            >
                                {nuking ? 'ERASING...' : (confirmNuke ? 'CONFIRM PERMANENT DELETION?' : 'NUKE ALL DATA')}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-xs font-bold text-phoenix-ghost hover:text-phoenix-ink uppercase tracking-widest"
                    >
                        Close Console
                    </button>
                </div>
            </div>
        </div>
    );
};

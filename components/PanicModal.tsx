import React, { useState, useEffect } from 'react';
import { X, Zap, Shield, DoorOpen, Copy, Activity } from 'lucide-react';
import { generateTacticalResponse } from '../services/geminiService';
import { UserProfile } from '../types';
import ReactMarkdown from 'react-markdown';

interface PanicModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'toxic' | 'escape' | 'defense' | null;
    user: UserProfile;
}

export const PanicModal: React.FC<PanicModalProps> = ({ isOpen, onClose, mode, user }) => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [dropdownValue, setDropdownValue] = useState('Boss'); // For Escape mode

    // Reset on open
    useEffect(() => {
        if (isOpen) {
            setInput('');
            setResult('');
            setLoading(false);
        }
    }, [isOpen, mode]);

    if (!isOpen || !mode) return null;

    // CONFIGURATION PER MODE
    interface PanicConfig {
        title: string;
        icon: any;
        color: string;
        borderColor: string;
        bgGradient: string;
        placeholder: string;
        buttonText: string;
        buttonColor: string;
        showDropdown?: boolean;
        systemPrompt: (role: string, company?: string) => string;
    }

    const config: Record<string, PanicConfig> = {
        toxic: {
            title: "NEUTRALIZE TOXICITY",
            icon: Zap,
            color: "text-red-600",
            borderColor: "border-red-600",
            bgGradient: "from-red-50 to-white",
            placeholder: "What did they say to you?",
            buttonText: "GENERATE DEFENSE",
            buttonColor: "bg-red-600 hover:bg-red-700",
            showDropdown: false,
            systemPrompt: (role: string, company: string = 'Corp') => `You are a Crisis Communication Expert. The user is being attacked verbally. Input: [User Input] Context: User is ${role} at ${company}. Task: Generate 3 responses:\n\n1. The Mirror (Professional): Reflect the question back.\n2. The Pivot (Evasive): Shift focus to future value.\n3. The Wall (Firm): Shut down the tone without being rude.\n\nOutput: Bullet points only. No intro.`
        },
        escape: {
            title: "MEETING EJECTOR SEAT",
            icon: DoorOpen,
            color: "text-amber-600",
            borderColor: "border-amber-500",
            bgGradient: "from-amber-50 to-white",
            placeholder: "Who are you with? (Optional context)",
            buttonText: "GET ME OUT OF HERE",
            buttonColor: "bg-amber-600 hover:bg-amber-700",
            showDropdown: true,
            systemPrompt: (role: string) => `Generate 3 urgent, unchallengeable excuses to leave a meeting immediately. Context: User is ${role}. Target: ${dropdownValue}. Tone: Urgent but professional.\n\nOptions:\n1. Tech Issue (Critical System Failure)\n2. Family Emergency (Vague but alarming)\n3. Higher Management Request (The "CEO needs me" card).`
        },
        defense: {
            title: "NARRATIVE REFRAME",
            icon: Shield,
            color: "text-blue-600",
            borderColor: "border-blue-600",
            bgGradient: "from-blue-50 to-white",
            placeholder: "What is the accusation/problem?",
            buttonText: "REFRAME REALITY",
            buttonColor: "bg-blue-600 hover:bg-blue-700",
            showDropdown: false,
            systemPrompt: (role: string) => `Reframing Protocol. The user is accused of: [User Input]. User Role: ${role}. Rewrite this narrative to show the user's strength and strategic intent. Turn the fault into a feature. Show 3 options: aggressive reframe, logical reframe, and emotional reframe.`
        }
    };

    const currentConfig = config[mode];

    const handleSubmit = async () => {
        if (mode !== 'escape' && !input) return; // Escape can be empty/defaults
        setLoading(true);

        const prompt = mode === 'escape'
            ? `Generate excuses for leaving a meeting with ${dropdownValue}.`
            : input;

        const systemParam = mode === 'escape'
            ? currentConfig.systemPrompt(user.role)
            : currentConfig.systemPrompt(user.role, user.companyName || 'Corp');

        const response = await generateTacticalResponse(systemParam as any, prompt);
        setResult(response);
        setLoading(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        alert("Tactical Response Copied.");
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* MODAL CARD */}
            <div className={`
                w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden border-2 
                ${currentConfig.borderColor} flex flex-col max-h-[90vh]
            `}>

                {/* HEADER */}
                <div className={`p-5 bg-gradient-to-r ${currentConfig.bgGradient} border-b border-gray-100 flex justify-between items-center`}>
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full bg-white shadow-sm border ${currentConfig.borderColor}`}>
                            <currentConfig.icon size={20} className={currentConfig.color} />
                        </div>
                        <h2 className={`font-display font-bold text-lg tracking-widest uppercase ${currentConfig.color}`}>
                            {currentConfig.title}
                        </h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6 overflow-y-auto custom-scrollbar">

                    {/* INPUT SECTION */}
                    <div className="space-y-4 mb-6">
                        {currentConfig.showDropdown && (
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Opponent</label>
                                <select
                                    className="w-full p-3 border border-gray-200 rounded-sm bg-gray-50 focus:outline-none focus:border-amber-500 font-sans text-sm"
                                    value={dropdownValue}
                                    onChange={(e) => setDropdownValue(e.target.value)}
                                >
                                    <option value="Boss">My Boss</option>
                                    <option value="Client">Key Client</option>
                                    <option value="Team">My Team</option>
                                    <option value="HR">HR Department</option>
                                </select>
                            </div>
                        )}

                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Context</label>
                            <textarea
                                autoFocus
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={currentConfig.placeholder}
                                className="w-full p-4 border border-gray-200 rounded-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-gray-400 resize-none font-sans text-sm min-h-[100px]"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading || (mode !== 'escape' && !input)}
                            className={`w-full py-4 ${currentConfig.buttonColor} text-white font-black text-sm uppercase tracking-[0.2em] rounded-sm shadow-lg transform transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                        >
                            {loading ? (
                                <Activity className="animate-spin" />
                            ) : (
                                currentConfig.buttonText
                            )}
                        </button>
                    </div>

                    {/* RESULT SECTION */}
                    {result && (
                        <div className="bg-gray-50 border-l-4 border-gray-800 p-5 rounded-r-sm animate-in slide-in-from-bottom-4 duration-300 relative group">
                            <button
                                onClick={copyToClipboard}
                                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-800 transition-colors bg-white rounded-full shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100"
                                title="Copy to Clipboard"
                            >
                                <Copy size={14} />
                            </button>
                            <div className="prose prose-sm font-sans text-gray-700 leading-relaxed whitespace-pre-line">
                                <ReactMarkdown>{result}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

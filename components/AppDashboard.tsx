import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { ChatConsole } from './ChatConsole';
import { DataStream } from './DataStream';
import { StrategicMapModal } from './StrategicMapModal';
import { HierarchyModal } from './HierarchyModal';
import { UpgradeModal } from './Paywall/UpgradeModal';
import { PriorityUplink } from './PriorityUplink';
import { GenesisModal } from './GenesisModal';
// import { ErrorModal } from './ErrorModal'; // Handled in App? Or here? Let's keep specific dashboard errors here if needed, or global in App. Global is better for now, but User asked to separate. user handles generic errors.
// Actually App.tsx has ErrorModal. Let's start with Dashboard logic.
import { LegalDisclaimer } from './Legal/LegalDisclaimer';
import { Codex } from './Codex';
import { Vault } from './Vault';
import { BlackBook } from './BlackBook';
// Data Persistence
import { updateProfile } from '../lib/supabase';
import { UserProfile, Message } from '../types';
import { INITIAL_USER, WELCOME_MESSAGE } from '../constants';
import { sendMessageToCoach, initializeChat } from '../services/geminiService';
import { v4 as uuidv4 } from 'uuid';
import { Menu, X, Crown, ShieldAlert } from 'lucide-react';

interface AppDashboardProps {
    userProfile: UserProfile;
    setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>; // Needed for updates
    onOpenAdmin?: () => void;
}

export const AppDashboard: React.FC<AppDashboardProps> = ({ userProfile, setUserProfile, onOpenAdmin }) => {
    // STATE
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isHierarchyOpen, setIsHierarchyOpen] = useState(false);
    const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
    const [upgradeFeature, setUpgradeFeature] = useState<string | undefined>();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [activeTab, setActiveTab] = useState('command');
    const [isGenesisOpen, setIsGenesisOpen] = useState(false);

    // Narrative Loading State
    const [loadingText, setLoadingText] = useState("Decrypting Salary Data...");
    // const [loadingPhase, setLoadingPhase] = useState(0); // unused but kept for expansion

    // 1. INITIALIZATION & PSYCH-TIER LOADING
    useEffect(() => {
        if (!isInitialized) {
            const phases = [
                "Decrypting Salary Data...",
                "Analyzing Manager Profiling...",
                "Loading God Mode Assets...",
                "Establishing Secure Uplink..."
            ];

            const interval = setInterval(() => {
                setLoadingText(prev => {
                    const idx = phases.indexOf(prev);
                    return phases[(idx + 1) % phases.length];
                });
            }, 1500);

            const initChat = async () => {
                try {
                    await initializeChat(userProfile);
                    setMessages([{
                        id: uuidv4(),
                        role: 'model',
                        content: WELCOME_MESSAGE,
                        timestamp: new Date()
                    }]);
                    setIsInitialized(true);
                } catch (e) {
                    console.error("Initialization failed", e);
                    // Could trigger onError prop if passed
                }
            };
            initChat();

            return () => clearInterval(interval);
        }
    }, [isInitialized]); // removing userProfile from dependency to avoid loop, it's captured in closure at start. Or add it if we want dynamic update? Start with simple.

    // 1.5 GENESIS TRIGGER
    useEffect(() => {
        if (isInitialized && !userProfile.genesisCompleted) {
            // Small delay for drama
            setTimeout(() => setIsGenesisOpen(true), 2000);
        }
    }, [isInitialized, userProfile.genesisCompleted]);

    const handleGenesisComplete = async (data: { currentSalary: number; targetSalary: number; mainEnemy: string; companyName: string; location: string }) => {
        setIsGenesisOpen(false);

        // OPTIMISTIC UI UPDATE
        setUserProfile(prev => ({
            ...prev,
            ...data,
            genesisCompleted: true
        }));

        // DB PERSISTENCE (V7.9 INTELLIGENCE)
        if (userProfile.id) {
            try {
                await updateProfile(userProfile.id, {
                    current_salary: data.currentSalary,
                    target_salary: data.targetSalary,
                    company_name: data.companyName,
                    location: data.location,
                    onboarding_completed: true
                });
            } catch (e) {
                console.error("Failed to persist Genesis Intel", e);
            }
        }

        // Add a system welcome based on enemy and location
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: uuidv4(),
                role: 'model',
                content: `System Initialize. Target Locked: **${data.mainEnemy}**. \nLocation Context: **${data.location.toUpperCase()}**. \n\nCalculated Opportunity Cost: **€${(data.targetSalary - data.currentSalary).toLocaleString()}**. \n\nLet's get it back.`,
                timestamp: new Date()
            }]);
        }, 800);
    };

    // 2. CHAT HANDLER
    const handleSendMessage = async (text: string) => {
        const userMsg: Message = {
            id: uuidv4(),
            role: 'user',
            content: text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        // CHECK TIER LIMITS
        const today = new Date().toISOString().split('T')[0];
        const usageKey = `luminel_usage_${today}_${userProfile.id}`;
        const currentUsage = parseInt(localStorage.getItem(usageKey) || '0', 10);
        const LIMIT = 3;

        if (userProfile.subscription === 'GRINDER' && currentUsage >= LIMIT) {
            setUpgradeFeature('DAILY_LIMIT_REACHED');
            setIsUpgradeOpen(true);

            setMessages(prev => [...prev, {
                id: uuidv4(),
                role: 'model',
                content: "⛔ **SYSTEM HALT**: Tier GRINDER limit reached (3/3 daily analysis).\n\nUpgrade to **STRATEGIST** for unlimited neural processing.",
                timestamp: new Date()
            }]);

            setIsLoading(false);
            return;
        }

        try {
            const responseText = await sendMessageToCoach(text, userProfile);

            if (userProfile.subscription === 'GRINDER') {
                localStorage.setItem(usageKey, (currentUsage + 1).toString());
            }

            setMessages(prev => [...prev, {
                id: uuidv4(),
                role: 'model',
                content: responseText,
                timestamp: new Date()
            }]);

            // PARSING ENGINE (Updates to Profile)
            const perfMatch = responseText.match(/\[\[PERFORMANCE:\s*([+-]?\d+)\]\]/i);
            const capMatch = responseText.match(/\[\[CAPITAL:\s*([+-]?\d+)\]\]/i);

            if (perfMatch || capMatch) {
                setUserProfile(prev => {
                    let newPerf = prev.performanceXP;
                    let newCap = prev.politicalCapital;
                    if (perfMatch) newPerf = Math.max(0, newPerf + parseInt(perfMatch[1], 10));
                    if (capMatch) newCap = Math.max(0, newCap + parseInt(capMatch[1], 10));
                    return { ...prev, performanceXP: newPerf, politicalCapital: newCap };
                });
            }

        } catch (error) {
            console.error("Error sending message", error);
        } finally {
            setIsLoading(false);
        }
    };

    const isAdmin = userProfile.isAdmin; // passed from App usage or check logic? App checks userProfile.isAdmin.

    // RENDER: LOADING
    if (!isInitialized) {
        return (
            <div className="h-screen w-full bg-[#09090b] flex items-center justify-center flex-col gap-6">
                <div className="w-16 h-16 bg-phoenix-gold/10 border border-phoenix-gold rounded-sm flex items-center justify-center animate-pulse">
                    <Crown size={32} className="text-phoenix-gold" />
                </div>
                <div className="font-mono text-phoenix-gold text-xs tracking-[0.2em] animate-pulse">
                    // {loadingText.toUpperCase()} //
                </div>
                <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-phoenix-gold animate-progress-indeterminate"></div>
                </div>
            </div>
        );
    }

    // RENDER: DASHBOARD
    return (
        <div className="phoenix-dashboard h-screen w-full overflow-hidden font-sans relative z-0 bg-phoenix-canvas">

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-phoenix-gold/10 border border-phoenix-gold rounded-sm flex items-center justify-center">
                        <Crown size={16} className="text-phoenix-gold" />
                    </div>
                    <span className="font-display font-bold text-phoenix-ink text-sm tracking-widest">LUMINEL</span>
                </div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-phoenix-ink p-2 hover:bg-gray-100 rounded-sm">
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* DESKTOP: 3-Column Grid Layout (Psych-Tier Protocol: Smart Proportions) */}
            <div className="hidden md:grid h-full w-full" style={{ gridTemplateColumns: 'minmax(280px, 20%) 1fr minmax(300px, 20%)' }}>

                {/* LEFT: THE ARSENAL (Sidebar) */}
                <div className="h-full bg-phoenix-snow border-r border-gray-100 relative overflow-hidden flex flex-col min-w-0">
                    <Sidebar
                        user={userProfile}
                        activePage={activeTab}
                        onNavigate={setActiveTab}
                        onOpenMap={() => setIsMapOpen(true)}
                        onOpenUpgrade={(feature) => { setUpgradeFeature(feature); setIsUpgradeOpen(true); }}
                        isAdmin={isAdmin}
                        onOpenAdmin={onOpenAdmin}
                    />
                </div>

                {/* CENTER: THE BATTLEFIELD (Chat & Modules) */}
                <div className="h-full bg-phoenix-canvas relative overflow-hidden flex flex-col border-r border-gray-100 min-w-0">
                    {activeTab === 'command' && (
                        <ChatConsole
                            messages={messages}
                            isLoading={isLoading}
                            onSendMessage={handleSendMessage}
                            userProfile={userProfile}
                        />
                    )}
                    {activeTab === 'codex' && <Codex />}
                    {activeTab === 'vault' && <Vault user={userProfile} onOpenUpgrade={(feat) => { setUpgradeFeature(feat); setIsUpgradeOpen(true); }} />}
                    {activeTab === 'blackbook' && <BlackBook user={userProfile} />}
                </div>

                {/* RIGHT: THE HUD (DataStream) */}
                <div className="h-full bg-phoenix-canvas relative overflow-hidden flex flex-col min-w-0">
                    <DataStream user={userProfile} onOpenHierarchy={() => setIsHierarchyOpen(true)} />
                </div>

            </div>

            {/* MOBILE: Drawer + Main Content */}
            <div className="md:hidden h-full pt-16 flex flex-col">

                {/* Mobile Sidebar Overlay */}
                {isSidebarOpen && (
                    <div className="fixed inset-0 bg-phoenix-ink/40 z-40" onClick={() => setIsSidebarOpen(false)}></div>
                )}

                {/* Mobile Sidebar Drawer */}
                <div className={`
                    fixed inset-y-0 left-0 z-50 w-[280px] bg-phoenix-snow transition-transform duration-300 shadow-xl
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <Sidebar
                        user={userProfile}
                        activePage={activeTab}
                        onNavigate={(page) => { setActiveTab(page); setIsSidebarOpen(false); }}
                        onOpenMap={() => { setIsMapOpen(true); setIsSidebarOpen(false); }}
                        onOpenUpgrade={(feature) => { setUpgradeFeature(feature); setIsUpgradeOpen(true); setIsSidebarOpen(false); }}
                    />
                    {isAdmin && (
                        <div className="absolute bottom-4 left-4 right-4">
                            <button onClick={onOpenAdmin} className="w-full py-2 bg-red-100 text-red-600 text-xs font-sans font-bold rounded-sm border border-red-200">GOD MODE</button>
                        </div>
                    )}
                </div>

                {/* Mobile Chat & Modules */}
                <div className="flex-1 overflow-hidden">
                    {activeTab === 'command' && (
                        <ChatConsole
                            messages={messages}
                            isLoading={isLoading}
                            onSendMessage={handleSendMessage}
                            userProfile={userProfile}
                        />
                    )}
                    {activeTab === 'codex' && <Codex />}
                    {activeTab === 'vault' && <Vault user={userProfile} onOpenUpgrade={(feat) => { setUpgradeFeature(feat); setIsUpgradeOpen(true); }} />}
                    {activeTab === 'blackbook' && <BlackBook user={userProfile} />}
                </div>
            </div>

            {/* MODALS */}
            <StrategicMapModal
                isOpen={isMapOpen}
                onClose={() => setIsMapOpen(false)}
                user={userProfile}
            />

            <HierarchyModal
                isOpen={isHierarchyOpen}
                onClose={() => setIsHierarchyOpen(false)}
                currentTier={userProfile.level}
            />

            <UpgradeModal
                isOpen={isUpgradeOpen}
                onClose={() => setIsUpgradeOpen(false)}
                currentTier={userProfile.subscription as 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE'}
                featureRequested={upgradeFeature}
                userId={userProfile.id}
                userEmail={userProfile.email}
            />



            <GenesisModal
                isOpen={isGenesisOpen}
                onComplete={handleGenesisComplete}
            />

            <LegalDisclaimer onAccept={() => {
                // Log acceptance if needed
                console.log("Terms accepted by user:", userProfile.id);
            }} />

        </div>
    );
};

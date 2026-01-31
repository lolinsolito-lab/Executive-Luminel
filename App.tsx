import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Analytics } from '@vercel/analytics/react';
import { Sidebar } from './components/Sidebar';
import { ChatConsole } from './components/ChatConsole';
import { StrategicMapModal } from './components/StrategicMapModal';
import { UpgradeModal } from './components/Paywall/UpgradeModal';
import { LandingPage } from './components/Landing/LandingPage';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { LegalPage } from './components/Legal/LegalPage'; // Keep for structure but mostly unused now
import { AuthModal } from './components/Auth/AuthModal';
import { ThankYouPage } from './components/ThankYou/ThankYouPage';
import { UserProfile, Message } from './types';
import { INITIAL_USER, WELCOME_MESSAGE } from './constants';
import { sendMessageToCoach, initializeChat } from './services/geminiService';
import { v4 as uuidv4 } from 'uuid';
import { Menu, X, Crown } from 'lucide-react';

// Admin emails - add your email here
const ADMIN_EMAILS = ['lolinsolito@gmail.com'];

type AppPage = 'landing' | 'app' | 'thank-you' | 'admin' | 'legal-terms' | 'legal-privacy' | 'legal-cookies' | 'legal-disclaimer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppPage>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState<string | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthModalMode, setIsAuthModalMode] = useState<'login' | 'signup' | 'recover' | 'update'>('login');

  // Check if current user is admin (DB flag or hardcoded list)
  const isAdmin = userProfile.isAdmin || ADMIN_EMAILS.includes(userProfile.email || '');

  // Handle entering the app from landing
  // Handle entering the app from landing
  const handleEnterApp = () => {
    if (!userProfile.id || userProfile.id === "") {
      setIsAuthOpen(true);
    } else {
      setCurrentPage('app');
    }
  };

  // Open paywall with optional feature name
  const openUpgrade = (feature?: string) => {
    setUpgradeFeature(feature);
    setIsUpgradeOpen(true);
  };

  // Load User Profile from DB
  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (profile) {
          setUserProfile(prev => ({
            ...prev,
            id: user.id,
            email: user.email,
            name: profile.full_name || user.email?.split('@')[0] || 'Executive',
            subscription: profile.subscription_tier as any,
            isAdmin: profile.is_admin,
            performanceXP: profile.performance_xp,
            politicalCapital: profile.political_capital,
            ...prev
          }));
        }
      }
    };
    loadUser();

    // Listen for Password Recovery
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsAuthModalMode('update');
        setIsAuthOpen(true);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // BRAND SIGNATURE
  useEffect(() => {
    const gold = 'color: #C5A059';
    const bgDark = 'background: #0A0A0A';

    console.log(
      "%c EXECUTIVE LUMINEL %c V5.0 \n%c THE ELITE DOES NOT COMPETE. IT DOMINATES. ",
      "background: linear-gradient(90deg, #C5A059 0%, #E5D3B3 100%); color: #000; padding: 5px 10px; font-weight: 900; font-family: sans-serif; font-size: 14px; border-radius: 2px;",
      "background: #1A1A1A; color: #C5A059; padding: 5px 10px; border-radius: 2px; font-family: monospace; font-weight: bold; border: 1px solid #C5A059;",
      "color: #C5A059; font-style: italic; font-family: serif; font-size: 12px; padding-top: 10px; display: block;"
    );
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeChat();
        setMessages([
          {
            id: uuidv4(),
            role: 'model',
            content: WELCOME_MESSAGE,
            timestamp: new Date()
          }
        ]);
        setIsInitialized(true);
      } catch (e) {
        console.error("Initialization failed", e);
      }
    };
    init();
  }, []);

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
      setIsUpgradeOpen(true);
      setUpgradeFeature('DAILY_LIMIT_REACHED');

      // Add system message about limit
      const limitMsg: Message = {
        id: uuidv4(),
        role: 'model',
        content: "⛔ **SYSTEM HALT**: Tier GRINDER limit reached (3/3 daily analysis).\n\nUpgrade to **STRATEGIST** for unlimited neural processing.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, limitMsg]);

      setIsLoading(false);
      return;
    }

    try {
      const responseText = await sendMessageToCoach(text);

      // Increment usage if successful
      if (userProfile.subscription === 'GRINDER') {
        localStorage.setItem(usageKey, (currentUsage + 1).toString());
      }

      const botMsg: Message = {
        id: uuidv4(),
        role: 'model',
        content: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);

      // PARSING ENGINE v3.0
      const perfMatch = responseText.match(/\[\[PERFORMANCE:\s*([+-]?\d+)\]\]/i);
      const capMatch = responseText.match(/\[\[CAPITAL:\s*([+-]?\d+)\]\]/i);

      if (perfMatch || capMatch) {
        // ... existing parsing logic ...
        setUserProfile(prev => {
          let newPerf = prev.performanceXP;
          let newCap = prev.politicalCapital;

          if (perfMatch) {
            const val = parseInt(perfMatch[1], 10);
            if (!isNaN(val)) newPerf = Math.max(0, newPerf + val);
          }

          if (capMatch) {
            const val = parseInt(capMatch[1], 10);
            if (!isNaN(val)) newCap = Math.max(0, newCap + val);
          }

          return {
            ...prev,
            performanceXP: newPerf,
            politicalCapital: newCap
          };
        });
      }

    } catch (error) {
      console.error("Error sending message", error);
      // Optional: Add error message to chat
    } finally {
      setIsLoading(false);
    }
  };

  // RENDER LOGIC

  // RENDER LOGIC
  const renderContent = () => {
    // 1. Loading State
    if (!isInitialized) {
      return (
        <div className="h-screen w-full bg-[#09090b] flex items-center justify-center flex-col gap-4">
          <div className="w-16 h-16 border-t-2 border-b-2 border-corp-gold rounded-full animate-spin"></div>
          <div className="font-mono text-corp-gold text-xs tracking-[0.2em] animate-pulse">LUMINEL V5.0 // INITIALIZING...</div>
        </div>
      );
    }

    // 2. Landing Page
    if (currentPage === 'landing') {
      return (
        <LandingPage
          onEnterApp={handleEnterApp}
        />
      );
    }

    // 3. Thank You Page
    if (currentPage === 'thank-you') {
      return (
        <ThankYouPage
          tier={userProfile.subscription as any}
          userName={userProfile.name}
          userEmail={userProfile.email || ''}
          onEnterApp={() => setCurrentPage('app')}
        />
      );
    }

    // 4. Admin Dashboard (God Mode)
    if (currentPage === 'admin') {
      return <AdminDashboard onClose={() => setCurrentPage('app')} />;
    }

    // 5. Legal Pages
    if (currentPage.startsWith('legal-')) {
      const legalType = currentPage.replace('legal-', '') as any;
      return <LegalPage type={legalType} onBack={() => setCurrentPage('landing')} />;
    }

    // 6. Main App
    return (
      <div className="flex h-screen w-full overflow-hidden font-sans relative text-slate-200 bg-[#09090b]">
        {/* Mobile Header with Hamburger */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-corp-onyx border-b border-corp-border p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm text-corp-platinum">LUMINEL</span>
            <span className="text-corp-gold text-sm font-bold">EXECUTIVE</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-corp-silver hover:text-corp-gold transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-30 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Hidden on mobile unless open */}
        <div className={`
          fixed md:relative z-35 h-full transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          md:block
        `}>
          <Sidebar
            user={userProfile}
            onOpenMap={() => { setIsMapOpen(true); setIsSidebarOpen(false); }}
            onOpenUpgrade={(feature) => { openUpgrade(feature); setIsSidebarOpen(false); }}
          />

          {/* Admin Button (Only visible if admin) */}
          {isAdmin && (
            <div className="absolute bottom-4 left-4 right-4 animate-fade-in">
              <button
                onClick={() => setCurrentPage('admin')}
                className="w-full py-2 bg-red-900/20 border border-red-500/30 text-red-400 text-[10px] font-mono uppercase tracking-widest hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2"
              >
                <Crown size={12} />
                GOD MODE ACTIVE
              </button>
            </div>
          )}
        </div>

        {/* Chat Console - Full width on mobile, with top padding for header */}
        <div className="flex-1 pt-16 md:pt-0">
          <ChatConsole
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {renderContent()}

      {/* GLOBAL MODALS */}
      <StrategicMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        user={userProfile}
      />

      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        currentTier={userProfile.subscription as 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE'}
        featureRequested={upgradeFeature}
        userId={userProfile.id}
        userEmail={userProfile.email}
      />
      <Analytics />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={isAuthModalMode}
        onSuccess={() => {
          // User loaded by useEffect, just need to enter app
          setCurrentPage('app');
        }}
      />
    </>
  );
};

export default App;
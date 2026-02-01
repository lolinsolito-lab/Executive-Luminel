import React, { useState, useEffect } from 'react';
import { supabase, getProfile } from './lib/supabase';
import { Analytics } from '@vercel/analytics/react';
import { AppDashboard } from './components/AppDashboard';
import { LandingPage } from './components/Landing/LandingPage';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { LegalPage } from './components/Legal/LegalPage';
import { AuthPage } from './components/Auth/AuthPage';
import { ThankYouPage } from './components/ThankYou/ThankYouPage';
import { ErrorModal } from './components/ErrorModal';
import { GenesisModal } from './components/GenesisModal';
import { SmartNavbar } from './components/Landing/SmartNavbar';
import { UserProfile } from './types';
import { INITIAL_USER } from './constants';
import { Session } from '@supabase/supabase-js';

// Admin emails
const ADMIN_EMAILS = ['lolinsolito@gmail.com', 'admin@luminel.com'];

const App: React.FC = () => {
  // CORE STATE
  const [session, setSession] = useState<Session | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER);
  const [loading, setLoading] = useState(true);

  // AUTH VIEW STATE
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'recover'>('login');
  const [genesisData, setGenesisData] = useState<{
    currentSalary: number;
    targetSalary: number;
    mainEnemy: string;
    companyName: string;
  } | undefined>(undefined);

  // MODALS
  const [showGenesisModal, setShowGenesisModal] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  // STARTUP & AUTH LISTENER
  useEffect(() => {
    // 0. SYSTEM SIGNATURE
    const initSignature = () => {
      const titleStyle = [
        'font-size: 24px',
        'font-family: "Playfair Display", serif',
        'font-weight: bold',
        'color: #D4AF37', // Phoenix Gold
        'text-shadow: 0 0 20px rgba(212,175,55,0.4)',
        'padding: 10px 0',
        'letter-spacing: 2px'
      ].join(';');

      const badgeStyle = [
        'background: #0F172A',
        'border: 1px solid #D4AF37',
        'color: #F8FAFC',
        'padding: 4px 10px',
        'border-radius: 2px',
        'font-family: monospace',
        'font-size: 10px',
        'font-weight: bold'
      ].join(';');

      const lineStyle = [
        'font-family: monospace',
        'font-size: 11px',
        'color: #94A3B8', // Slate-400
        'line-height: 1.5'
      ].join(';');

      // Clear previous logs to simulate a fresh boot
      // console.clear(); // Optional: keeps it very clean but might hide useful errors

      // USE TIMEOUT TO DETACH FROM STACK TRACE (ANTI-REVERSE ENGINEERING TRICK)
      setTimeout(() => {
        const log = console.log.bind(console);
        const group = console.group.bind(console);
        const groupEnd = console.groupEnd.bind(console);

        group('%c EXECUTIVE LUMINEL ', titleStyle);
        log('%c V7.9 PHOENIX PROTOCOL // SYSTEM ONLINE ', badgeStyle);
        log(''); // Spacer
        log(`%c[SYSTEM] Control System....... %cACTIVATED`, lineStyle, 'color: #10B981; font-weight: bold;');
        log(`%c[INTEL]  Rat Trap............. %cDETECTED`, lineStyle, 'color: #EF4444; font-weight: bold;');
        log(`%c[MODE]   Evasion.............. %cO CI SEI, O CI FAI`, lineStyle, 'color: #D4AF37; font-weight: bold;');
        log(''); // Spacer
        groupEnd();
      }, 0);
    };

    initSignature();

    // 1. Check Session
    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setSession(session);
          await loadUserProfile(session.user.id);
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.error("Auth Init Error", e);
        setLoading(false);
      }
    };

    initSession();

    // Safety Timeout (5s) to preventing infinite loading
    const timer = setTimeout(() => {
      setLoading(prev => {
        if (prev) {
          console.warn("Forcing App Load due to timeout");
          return false;
        }
        return prev;
      });
    }, 5000);

    return () => clearTimeout(timer);

    // 2. Listen for Auth Changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);

      if (event === 'SIGNED_IN') {
        if (session) await loadUserProfile(session.user.id);
        setCurrentPage('app');
      } else if (event === 'SIGNED_OUT') {
        setCurrentPage('landing');
        setUserProfile(INITIAL_USER);
      } else if (event === 'PASSWORD_RECOVERY') {
        setAuthMode('recover');
        setCurrentPage('auth');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profile } = await getProfile(userId);
      if (profile) {
        setUserProfile({
          id: profile.id,
          email: profile.email,
          name: profile.full_name || 'Agente',
          level: (profile.tier_level as any) || 'B1',
          role: 'Consultant',
          companyName: profile.company_name || undefined,
          permissions: profile.permissions as any,
          subscription: profile.subscription_tier,
          isAdmin: profile.email === 'admin@luminel.com' || ADMIN_EMAILS.includes(profile.email),
          performanceXP: profile.performance_xp || 0,
          maxPerformanceXP: 1000,
          politicalCapital: profile.political_capital || 0,
          maxPoliticalCapital: 1000,
          nextReviewDate: "TBD",
          outOfCycleWindow: 'CLOSED',
          skills: []
        });
      }
    } catch (e) {
      console.error("Profile load error", e);
    } finally {
      setLoading(false);
    }
  };

  // HANDLERS
  const handleGenesisComplete = (data: any) => {
    setGenesisData(data);
    setShowGenesisModal(false);
    setAuthMode('register');
    setCurrentPage('auth');
  };

  const handleEnterApp = () => {
    if (session) {
      setCurrentPage('app');
    } else {
      setAuthMode('login');
      setCurrentPage('auth');
    }
  };

  // RENDER
  if (loading) return <div className="bg-black h-screen w-full flex items-center justify-center text-white font-mono tracking-widest animate-pulse">INITIALIZING LUMINEL V7.9...</div>;

  const renderContent = () => {
    if (currentPage === 'app' && session) {
      // FIX: Do not force Admin Dashboard. Allow User View with "GOD MODE" button.
      // if (userProfile.isAdmin) return <AdminDashboard onClose={() => setCurrentPage('app')} />;
      return (
        <AppDashboard
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onOpenAdmin={() => setCurrentPage('admin')}
        />
      );
    }

    if (currentPage === 'admin' && session) {
      return <AdminDashboard onClose={() => setCurrentPage('app')} />;
    }

    if (currentPage === 'auth') {
      return (
        <AuthPage
          mode={authMode}
          onSwitchMode={setAuthMode}
          onSuccess={async () => {
            // FORCE NAVIGATION ON SUCCESS (Fallback if listener lags)
            console.log("Login Success: Forcing Navigation");
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
              setSession(session);
              await loadUserProfile(session.user.id);
              setCurrentPage('app');
            }
          }}
          genesisData={genesisData}
        />
      );
    }

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

    if (currentPage.startsWith('legal-')) {
      const type = currentPage.replace('legal-', '') as any;
      return <LegalPage type={type} onBack={() => setCurrentPage('landing')} />;
    }

    // Default: Landing
    return (
      <div className="bg-corp-onyx min-h-screen font-sans text-corp-platinum selection:bg-corp-gold selection:text-corp-onyx">
        <SmartNavbar
          onLoginClick={() => { setAuthMode('login'); setCurrentPage('auth'); }}
          onGenesisClick={() => setShowGenesisModal(true)}
        />
        <LandingPage onCtaClick={() => setShowGenesisModal(true)} />
        <GenesisModal
          isOpen={showGenesisModal}
          onComplete={handleGenesisComplete}
        />
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      <Analytics />
      <ErrorModal
        isOpen={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        errorMessage={errorMessage}
        errorType="generic"
      />
    </>
  );
};

export default App;
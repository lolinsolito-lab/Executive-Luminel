import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Analytics } from '@vercel/analytics/react';
import { AppDashboard } from './components/AppDashboard'; // NEW COMPONENT
import { LandingPage } from './components/Landing/LandingPage';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { LegalPage } from './components/Legal/LegalPage';
import { AuthModal } from './components/Auth/AuthModal';
import { ThankYouPage } from './components/ThankYou/ThankYouPage';
import { ErrorModal } from './components/ErrorModal';
import { UserProfile } from './types';
import { INITIAL_USER } from './constants';
import { Session } from '@supabase/supabase-js';

// Admin emails - add your email here
const ADMIN_EMAILS = ['lolinsolito@gmail.com'];

const App: React.FC = () => {
  // CORE STATE (Router & Auth)
  const [session, setSession] = useState<Session | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER);

  // AUTH MODAL STATE
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthModalMode, setIsAuthModalMode] = useState<'login' | 'signup' | 'recover' | 'update'>('login');

  // GLOBAL ERROR STATE
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  // Default error states
  const [errorType, setErrorType] = useState<'network' | 'ai-overload' | 'session-expired' | 'generic'>('generic');
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  // BRAND SIGNATURE
  useEffect(() => {
    console.log(
      "%c EXECUTIVE LUMINEL %c V7.0 PHOENIX \n%c THE ELITE DOES NOT COMPETE. IT DOMINATES. ",
      "background: linear-gradient(90deg, #C5A059 0%, #E5D3B3 100%); color: #000; padding: 5px 10px; font-weight: 900; font-family: sans-serif; font-size: 14px; border-radius: 2px;",
      "background: #1A1A1A; color: #C5A059; padding: 5px 10px; border-radius: 2px; font-family: monospace; font-weight: bold; border: 1px solid #C5A059;",
      "color: #C5A059; font-style: italic; font-family: serif; font-size: 12px; padding-top: 10px; display: block;"
    );
  }, []);

  // LOAD USER PROFILE
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          if (!user.id || user.id === "0") {
            return;
          }

          let { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();

          // AUTO-HEAL
          if (!profile || error) {
            console.log("Profile missing, attempting auto-heal...");
            const { data: newProfile, error: createError } = await supabase.from('profiles').insert({
              id: user.id,
              email: user.email!,
              full_name: user.user_metadata?.full_name || 'Executive',
              subscription_tier: 'GRINDER'
            }).select().single();

            if (!createError) profile = newProfile;
          }

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
      } catch (err) {
        console.error("Critical User Load Error:", err);
      }
    };
    loadUser();

    // AUTH LISTENER
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (event === 'PASSWORD_RECOVERY') {
        setIsAuthModalMode('update');
        setIsAuthOpen(true);
      }
      if (event === 'SIGNED_OUT') {
        setCurrentPage('landing');
        setUserProfile(INITIAL_USER);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // ROUTER LOGIC
  const handleEnterApp = () => {
    if (!userProfile.id || userProfile.id === "") {
      setIsAuthOpen(true);
    } else {
      setCurrentPage('app');
    }
  };

  // CHECK ADMIN STATUS
  const isAdmin = userProfile.isAdmin || ADMIN_EMAILS.includes(userProfile.email || '');

  // RENDER CONTENT
  const renderContent = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onEnterApp={handleEnterApp} />;

      case 'app':
        return (
          <AppDashboard
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onOpenAdmin={() => setCurrentPage('admin')}
          />
        );

      case 'admin':
        return <AdminDashboard onClose={() => setCurrentPage('app')} />;

      case 'thank-you':
        return (
          <ThankYouPage
            tier={userProfile.subscription as any}
            userName={userProfile.name}
            userEmail={userProfile.email || ''}
            onEnterApp={() => setCurrentPage('app')}
          />
        );

      default:
        // Legal pages handler
        if (currentPage.startsWith('legal-')) {
          const legalType = currentPage.replace('legal-', '') as any;
          return <LegalPage type={legalType} onBack={() => setCurrentPage('landing')} />;
        }
        return <LandingPage onEnterApp={handleEnterApp} />;
    }
  };

  return (
    <>
      {renderContent()}

      <Analytics />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={isAuthModalMode}
        onSuccess={() => setCurrentPage('app')}
      />

      <ErrorModal
        isOpen={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        errorType={errorType}
        errorMessage={errorMessage}
        onRetry={() => window.location.reload()}
      />
    </>
  );
};

export default App;
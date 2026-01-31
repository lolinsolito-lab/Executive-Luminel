import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatConsole } from './components/ChatConsole';
import { StrategicMapModal } from './components/StrategicMapModal';
import { UpgradeModal } from './components/Paywall/UpgradeModal';
import { UserProfile, Message } from './types';
import { INITIAL_USER, WELCOME_MESSAGE } from './constants';
import { sendMessageToCoach, initializeChat } from './services/geminiService';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState<string | undefined>();

  // Open paywall with optional feature name
  const openUpgrade = (feature?: string) => {
    setUpgradeFeature(feature);
    setIsUpgradeOpen(true);
  };

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

    try {
      const responseText = await sendMessageToCoach(text);

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
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <div className="h-screen w-full bg-[#09090b] flex items-center justify-center flex-col gap-4">
        <div className="w-16 h-16 border-t-2 border-b-2 border-corp-gold rounded-full animate-spin"></div>
        <div className="font-mono text-corp-gold text-xs tracking-[0.2em] animate-pulse">LUMINEL V5.0 // INITIALIZING...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans relative text-slate-200">
      <Sidebar
        user={userProfile}
        onOpenMap={() => setIsMapOpen(true)}
        onOpenUpgrade={openUpgrade}
      />
      <ChatConsole
        messages={messages}
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
      />

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
      />
    </div>
  );
};

export default App;
import React, { useRef, useEffect } from 'react';
import { UserProfile, Message } from '../types';
import { Send, Crown, Activity, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import PriorityUplink from './PriorityUplink';

interface ChatConsoleProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  tokenCount?: number;
  maxTokens?: number;
  userProfile: UserProfile;
}

// V7 PHOENIX - THE BATTLEFIELD
export const ChatConsole: React.FC<ChatConsoleProps> = ({
  messages,
  isLoading,
  onSendMessage,
  tokenCount = 50,
  maxTokens = 50,
  userProfile
}) => {
  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // DATA CALCULATION
  const gap = (userProfile.targetSalary || 0) - (userProfile.currentSalary || 0);
  const formattedGap = gap > 0
    ? `+€${(gap / 1000).toFixed(1)}k`
    : '€0';

  const firstName = userProfile.name?.split(' ')[0] || 'Agente';
  const enemyName = userProfile.mainEnemy || 'Il Mercato';
  // Replaced manual label with logic below

  const userTier = userProfile.subscription as 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-phoenix-canvas">

      {/* A. BRIEFING BOX (Luxury Integration) */}
      <div className="shrink-0 p-6 lg:p-8 bg-gradient-to-b from-[#FFFBF0] to-white z-20 relative border-b border-phoenix-gold/30">

        {/* Dynamic Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-phoenix-gold/10 flex items-center justify-center border border-phoenix-gold/30">
              <Crown size={14} className="text-phoenix-gold" />
            </div>
            <div>
              <h2 className="font-display font-bold text-phoenix-ink text-xs tracking-[0.2em] uppercase">
                MORNING BRIEFING
              </h2>
              <span className="font-sans text-[10px] text-phoenix-ghost font-medium tracking-wider">
                {new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()}
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Priority Uplink (Executive) OR Status Badge (Others) */}
          {userTier === 'EXECUTIVE' ? (
            <PriorityUplink isVisible={true} />
          ) : (
            <div className="px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 bg-slate-50 border-slate-200 text-slate-500">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse"></div>
              {userTier === 'STRATEGIST' ? 'Strategist' : 'Analyst'} Clearance
            </div>
          )}
        </div>

        {/* Narrative Content */}
        <div className="font-display text-lg text-phoenix-navy leading-relaxed relative z-10 pl-1 border-l-2 border-phoenix-gold/50">
          <p className="pl-4">
            <strong>{firstName}.</strong> Gap Attuale: <span className="text-red-700 font-bold drop-shadow-sm">{formattedGap}</span>.
          </p>
          <p className="mt-2 pl-4 text-base opacity-80 font-sans">
            L'obiettivo è neutralizzare <span className="font-bold text-phoenix-ink">{enemyName}</span>.
            <br className="hidden md:block" />Il tempo è una risorsa non rinnovabile.
          </p>
        </div>
      </div>

      {/* B. CHAT STREAM (Scrollable Center) */}
      <div className="flex-1 overflow-y-auto p-5 lg:p-8 space-y-5 z-10 scroll-smooth bg-phoenix-canvas">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] lg:max-w-2xl flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${msg.role === 'user'
                ? 'bg-phoenix-snow border-gray-200 text-phoenix-ghost'
                : 'bg-white border-phoenix-gold/30 text-phoenix-gold shadow-sm'
                }`}>
                {msg.role === 'user'
                  ? <span className="font-sans text-[10px] font-bold">YOU</span>
                  : <Crown size={14} className="fill-current" />
                }
              </div>

              {/* Message Bubble */}
              <div className={`
                p-4 rounded-sm text-sm leading-relaxed shadow-sm border
                ${msg.role === 'user'
                  ? 'bg-gray-50 border-gray-200 text-phoenix-ink font-sans'
                  : 'bg-white border-phoenix-gold/20 text-phoenix-navy font-sans'
                }
              `}>
                <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:text-phoenix-ink prose-strong:text-phoenix-ink">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-3 text-phoenix-gold font-sans text-sm animate-pulse pl-11">
              <Activity size={16} />
              <span>L'ARCHITETTO STA ELABORANDO...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* C. INPUT AREA (Anchored Bottom) */}
      <div className="p-4 lg:p-5 bg-phoenix-canvas border-t border-gray-100 z-30 shrink-0">
        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
          {/* Floating Input Container */}
          <div className={`
              flex items-center gap-3 border p-3 lg:p-4 rounded-sm phoenix-input-float focus-within:border-phoenix-gold transition-all
              ${userTier === 'EXECUTIVE' ? 'bg-phoenix-cream border-phoenix-gold/30' : 'bg-white border-gray-200'}
            `}>
            <span className="text-phoenix-gold font-display text-xl font-bold">{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                userTier === 'GRINDER' ? "3 messaggi rimanenti oggi..." :
                  userTier === 'STRATEGIST' ? "Inserisci comando tattico..." :
                    "Unlimited Uplink Secure. What is your command?"
              }
              className={`
                  flex-1 bg-transparent border-none focus:outline-none font-sans text-sm
                  ${userTier === 'EXECUTIVE' ? 'text-phoenix-ink placeholder-gold font-medium' : 'text-phoenix-ink placeholder-phoenix-ghost'}
                `}
              disabled={isLoading}
              autoFocus
            />

            {/* Token Counter (Tier 2 - Mercenary) */}
            {userTier === 'STRATEGIST' && (
              <span className="text-[11px] font-sans text-phoenix-ghost flex items-center gap-1">
                <Activity size={12} className="text-blue-500" />
                {tokenCount}/{maxTokens} Tokens
              </span>
            )}

            {/* Unlimited Badge (Tier 3 - God Mode) */}
            {userTier === 'EXECUTIVE' && (
              <span className="text-[10px] font-sans text-phoenix-gold uppercase tracking-widest font-bold flex items-center gap-1">
                <Crown size={12} />
                Unlimited
              </span>
            )}

            {/* Execute Button */}
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`
                  px-4 py-2 font-sans text-sm font-bold uppercase tracking-widest transition-all disabled:opacity-30 disabled:cursor-not-allowed rounded-sm
                  ${userTier === 'EXECUTIVE'
                  ? 'bg-gradient-to-r from-phoenix-gold to-amber-600 text-white shadow-phoenix-gold hover:from-amber-600 hover:to-phoenix-gold animate-pulse'
                  : userTier === 'STRATEGIST'
                    ? 'bg-slate-800 text-white hover:bg-slate-700'
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }
                `}
            >
              {userTier === 'GRINDER' ? 'Invia' : userTier === 'STRATEGIST' ? 'Armati' : 'EXECUTE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
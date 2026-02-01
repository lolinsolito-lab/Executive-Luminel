import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import { Send, Crown, Activity } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatConsoleProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  tokenCount?: number;
  maxTokens?: number;
  userTier?: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE';
}

// V7 PHOENIX - THE BATTLEFIELD
export const ChatConsole: React.FC<ChatConsoleProps> = ({
  messages,
  isLoading,
  onSendMessage,
  tokenCount = 50,
  maxTokens = 50,
  userTier = 'STRATEGIST'
}) => {
  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

      {/* A. BRIEFING BOX (Fixed Top) */}
      <div className="shrink-0 p-5 lg:p-6 border-b border-phoenix-gold bg-phoenix-cream phoenix-briefing z-20 shadow-sm">
        <h2 className="font-display font-bold text-phoenix-gold text-lg mb-2 flex items-center gap-2 tracking-widest uppercase">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Phoenix Briefing // 08:30 AM
        </h2>
        <div className="font-display text-base text-phoenix-ink leading-relaxed">
          <p><strong>Agent Jara.</strong> Target: <span className="text-emerald-600 font-bold">+€17k</span>.</p>
          <p className="mt-1">We need to neutralize Stefano today. <span className="italic text-phoenix-ghost">Execute protocol.</span></p>
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
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user'
                ? 'bg-phoenix-snow border border-gray-200 text-phoenix-ghost'
                : 'bg-phoenix-navy text-phoenix-gold'
                }`}>
                {msg.role === 'user'
                  ? <span className="font-sans text-[10px] font-bold">YOU</span>
                  : <Crown size={14} className="fill-current" />
                }
              </div>

              {/* Message Bubble */}
              <div className={`
                p-4 rounded-sm text-sm leading-relaxed
                ${msg.role === 'user'
                  ? 'bg-gray-100 text-phoenix-ink font-sans'
                  : 'bg-phoenix-navy text-white font-sans'
                }
              `}>
                <div className="prose prose-sm max-w-none">
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
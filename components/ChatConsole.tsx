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
      <div className="shrink-0 p-5 lg:p-6 border-b border-gray-100 bg-phoenix-cream phoenix-briefing z-20">
        <h2 className="font-display font-bold text-phoenix-ink text-lg mb-2 flex items-center gap-2 tracking-widest">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          PHOENIX BRIEFING // 08:30 AM
        </h2>
        <div className="font-sans text-sm text-phoenix-ghost leading-relaxed">
          <p>Agente Jara. Mercati aperti. Il tuo focus oggi è sul consolidamento della posizione strategica.</p>
          <p className="mt-1 text-phoenix-gold font-semibold">Strategia consigliata: Silenzio Attivo.</p>
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
          <div className="flex items-center gap-3 bg-white border border-gray-200 p-3 lg:p-4 rounded-sm phoenix-input-float focus-within:border-phoenix-gold transition-all">
            <span className="text-phoenix-gold font-display text-xl font-bold">{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Qual è la tua mossa strategica?"
              className="flex-1 bg-transparent border-none focus:outline-none text-phoenix-ink font-sans text-sm placeholder-phoenix-ghost"
              disabled={isLoading}
              autoFocus
            />

            {/* Token Counter (Tier 2 only) */}
            {userTier === 'STRATEGIST' && (
              <span className="text-[11px] font-sans text-phoenix-ghost">
                {tokenCount}/{maxTokens} Tokens
              </span>
            )}

            {/* Unlimited Badge (Tier 3) */}
            {userTier === 'EXECUTIVE' && (
              <span className="text-[10px] font-sans text-phoenix-gold uppercase tracking-widest font-bold">
                Unlimited
              </span>
            )}

            {/* Execute Button */}
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 bg-phoenix-gold text-white font-sans text-sm font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-sm"
            >
              Execute
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
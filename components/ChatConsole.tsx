import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import { Send, Terminal, Zap, Triangle, Crown, Activity } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatConsoleProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
}

export const ChatConsole: React.FC<ChatConsoleProps> = ({ messages, isLoading, onSendMessage }) => {
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
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-transparent">

      {/* 1. MORNING BRIEFING BOX (V6) */}
      <div className="shrink-0 p-6 border-b border-corp-border/30 bg-corp-onyx z-20">
        <h2 className="font-display font-bold text-corp-platinum text-lg mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          MORNING BRIEFING // 08:30 AM
        </h2>
        <div className="font-mono text-xs text-corp-silver leading-relaxed">
          <p>Agente Jara. Mercati aperti. Il tuo Capitale Politico è al <span className="text-corp-danger font-bold">32% (Critico)</span>.</p>
          <p className="mt-1">Oggi hai un meeting con Stefano. <span className="text-corp-gold font-bold">Strategia consigliata: Silenzio Attivo.</span></p>
        </div>
      </div>

      {/* 2. THE ARCHITECT CONSOLE (Terminal Style) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 z-10 scroll-smooth relative bg-corp-onyx">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-2xl flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

              {/* Avatar (Minimal V6) */}
              <div className={`w-6 h-6 rounded-sm flex-shrink-0 flex items-center justify-center border ${msg.role === 'user'
                ? 'bg-corp-blue/10 border-corp-blue/30 text-corp-blue'
                : 'bg-corp-gold/10 border-corp-gold/30 text-corp-gold'
                }`}>
                {msg.role === 'user' ? <span className="font-mono text-[8px] font-bold">YOU</span> : <Crown size={12} className="fill-current" />}
              </div>

              {/* Message Content (Terminal) */}
              <div className={`
                    p-4 rounded-sm text-xs md:text-sm font-mono leading-relaxed shadow-lg relative group
                    ${msg.role === 'user'
                  ? 'bg-corp-bg border border-corp-border/30 text-corp-platinum'
                  : 'bg-transparent text-corp-gold/90 border-l-2 border-corp-gold pl-4'
                }
                `}>
                <div className="prose prose-invert prose-xs max-w-none font-mono">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 text-corp-gold font-mono text-xs animate-pulse pl-10">
              <Activity size={12} />
              <span>ARCHITECT_IS_TYPING...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. DAILY INTEL CARD (Moved to DataStream V6) */}

      {/* 4. INPUT FIELD (Command Line) */}
      <div className="p-4 bg-corp-onyx border-t border-corp-border/30 z-30 shrink-0">
        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto flex items-center gap-2 bg-corp-bg border border-corp-border/30 p-2 rounded-sm focus-within:border-corp-gold/50 transition-colors">
          <span className="text-corp-gold font-mono pl-2">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Qual è la tua mossa?"
            className="flex-1 bg-transparent border-none focus:outline-none text-corp-platinum font-mono text-sm placeholder-corp-silver/30"
            disabled={isLoading}
            autoFocus
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 text-corp-gold hover:text-white transition-colors disabled:opacity-30"
          >
            <Terminal size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
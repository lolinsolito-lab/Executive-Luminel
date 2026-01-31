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
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#0B1019]">

      {/* 1. MORNING BRIEFING BOX (V6) */}
      <div className="shrink-0 p-4 md:p-6 border-b border-corp-gold/20 bg-[#0B1019] z-20">
        <h2 className="font-display font-bold text-white text-base md:text-lg mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          MORNING BRIEFING // 08:30 AM
        </h2>
        <div className="font-mono text-xs md:text-sm text-gray-300 leading-relaxed">
          <p>Agente Jara. Mercati aperti. Il tuo Capitale Politico è al <span className="text-red-400 font-bold">32% (Critico)</span>.</p>
          <p className="mt-1">Oggi hai un meeting con Stefano. <span className="text-yellow-400 font-bold">Strategia consigliata: Silenzio Attivo.</span></p>
        </div>
      </div>

      {/* 2. THE ARCHITECT CONSOLE (Terminal Style) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 z-10 scroll-smooth relative bg-[#0B1019]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-2xl flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

              {/* Avatar (Minimal V6) */}
              <div className={`w-7 h-7 rounded-sm flex-shrink-0 flex items-center justify-center border ${msg.role === 'user'
                ? 'bg-blue-600/20 border-blue-500/40 text-blue-400'
                : 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400'
                }`}>
                {msg.role === 'user' ? <span className="font-mono text-[8px] font-bold">YOU</span> : <Crown size={12} className="fill-current" />}
              </div>

              {/* Message Content (Terminal) */}
              <div className={`
                    p-4 rounded-sm text-sm md:text-base font-mono leading-relaxed shadow-lg relative group
                    ${msg.role === 'user'
                  ? 'bg-gray-800/80 border border-gray-600/50 text-white'
                  : 'bg-transparent text-yellow-300 border-l-2 border-yellow-500 pl-4'
                }
                `}>
                <div className="prose prose-invert prose-sm max-w-none font-mono text-gray-100">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 text-yellow-400 font-mono text-sm animate-pulse pl-10">
              <Activity size={14} />
              <span>ARCHITECT_IS_TYPING...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. DAILY INTEL CARD (Moved to DataStream V6) */}

      {/* 4. INPUT FIELD (Command Line) */}
      <div className="p-4 bg-[#0B1019] border-t border-yellow-500/30 z-30 shrink-0">
        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto flex items-center gap-2 bg-gray-900 border border-yellow-500/40 p-3 rounded-sm focus-within:border-yellow-400 transition-colors">
          <span className="text-yellow-400 font-mono pl-2 text-lg">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Qual è la tua mossa strategica?"
            className="flex-1 bg-transparent border-none focus:outline-none text-white font-mono text-sm md:text-base placeholder-gray-500"
            disabled={isLoading}
            autoFocus
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 text-yellow-400 hover:text-white transition-colors disabled:opacity-30"
          >
            <Terminal size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
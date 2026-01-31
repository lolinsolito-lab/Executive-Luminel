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
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#F9F8F2]">

      {/* 1. MORNING BRIEFING BOX (WHITE PEARL) */}
      <div className="shrink-0 p-4 md:p-6 border-b border-amber-200/50 bg-white z-20 shadow-sm">
        <h2 className="font-display font-bold text-gray-900 text-base md:text-lg mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          MORNING BRIEFING // 08:30 AM
        </h2>
        <div className="font-mono text-xs md:text-sm text-gray-600 leading-relaxed">
          <p>Agente Jara. Mercati aperti. Il tuo Capitale Politico è al <span className="text-red-500 font-bold">32% (Critico)</span>.</p>
          <p className="mt-1">Oggi hai un meeting con Stefano. <span className="text-amber-600 font-bold">Strategia consigliata: Silenzio Attivo.</span></p>
        </div>
      </div>

      {/* 2. THE ARCHITECT CONSOLE */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 z-10 scroll-smooth relative bg-[#F9F8F2]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[90%] md:max-w-2xl flex gap-2 md:gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

              {/* Avatar */}
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-sm flex-shrink-0 flex items-center justify-center border ${msg.role === 'user'
                ? 'bg-blue-100 border-blue-300 text-blue-600'
                : 'bg-amber-100 border-amber-300 text-amber-600'
                }`}>
                {msg.role === 'user' ? <span className="font-mono text-[8px] font-bold">YOU</span> : <Crown size={12} className="fill-current" />}
              </div>

              {/* Message Content */}
              <div className={`
                    p-3 md:p-4 rounded-sm text-sm md:text-base font-mono leading-relaxed shadow-sm relative group
                    ${msg.role === 'user'
                  ? 'bg-white border border-gray-200 text-gray-800'
                  : 'bg-amber-50 text-gray-800 border-l-2 border-amber-400 pl-4'
                }
                `}>
                <div className="prose prose-sm max-w-none font-mono text-gray-700">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 text-amber-600 font-mono text-sm animate-pulse pl-10">
              <Activity size={14} />
              <span>ARCHITECT_IS_TYPING...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. INPUT FIELD (Command Line - White Pearl) */}
      <div className="p-3 md:p-4 bg-white border-t border-amber-200/50 z-30 shrink-0 shadow-sm">
        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto flex items-center gap-2 bg-[#F9F8F2] border border-amber-300 p-2 md:p-3 rounded-sm focus-within:border-amber-500 focus-within:shadow-md transition-all">
          <span className="text-amber-600 font-mono pl-2 text-lg font-bold">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Qual è la tua mossa strategica?"
            className="flex-1 bg-transparent border-none focus:outline-none text-gray-800 font-mono text-sm md:text-base placeholder-gray-400"
            disabled={isLoading}
            autoFocus
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 text-amber-600 hover:text-amber-800 transition-colors disabled:opacity-30"
          >
            <Terminal size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
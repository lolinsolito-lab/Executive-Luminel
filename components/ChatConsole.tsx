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

      {/* 1. WAR ROOM HEADER */}
      <div className="h-16 war-room-panel border-b border-white/5 flex items-center px-6 justify-between z-10 shrink-0 shadow-lg relative bg-black/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-corp-gold/10 border border-corp-gold/40 rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.15)]">
            <Crown className="text-corp-gold animate-pulse-slow" size={16} />
          </div>
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-corp-platinum tracking-[0.2em] text-xs">WAR ROOM</h1>
            <p className="text-[8px] text-corp-silver font-mono uppercase tracking-widest opacity-70">ENCRYPTED CHANNEL</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-black/50 px-3 py-1.5 rounded-sm border border-corp-border shadow-inner">
          <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-corp-gold animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'}`}></span>
          <span className="text-[10px] font-mono text-corp-silver">{isLoading ? 'ANALYZING SCENARIO...' : 'SYSTEM READY'}</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-8 z-0 scroll-smooth relative">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-3xl flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

              {/* Avatar */}
              <div className={`w-8 h-8 rounded-sm flex-shrink-0 flex items-center justify-center border ${msg.role === 'user'
                ? 'bg-corp-blue/10 border-corp-blue/30 text-corp-blue'
                : 'bg-corp-gold/10 border-corp-gold/30 text-corp-gold shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                }`}>
                {msg.role === 'user' ? <span className="font-mono text-xs font-bold">ME</span> : <Crown size={14} className="fill-current" />}
              </div>

              {/* Content */}
              <div className={`
                    p-5 rounded-sm text-sm leading-relaxed font-light shadow-xl backdrop-blur-md relative overflow-hidden group
                    ${msg.role === 'user'
                  ? 'bg-corp-onyx/80 border border-white/10 text-gray-200'
                  : 'bg-[#0A0A0B]/90 border-l-2 border-l-corp-gold text-gray-300'
                }
                `}>
                {/* Golden sheen effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

                <div className="mb-3 text-[9px] font-mono text-corp-silver/60 uppercase tracking-widest flex justify-between border-b border-white/5 pb-2">
                  <span>{msg.role === 'user' ? 'INPUT' : 'SYSTEM RESPONSE'}</span>
                  <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <div className="prose prose-invert prose-sm max-w-none font-sans prose-p:text-gray-300 prose-strong:text-corp-gold prose-headings:font-display prose-headings:text-gray-100">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-3xl flex gap-4">
              <div className="w-8 h-8 rounded-sm flex-shrink-0 bg-corp-gold/10 border border-corp-gold/30 flex items-center justify-center animate-pulse">
                <Crown size={14} className="text-corp-gold fill-current" />
              </div>
              <div className="war-room-panel p-4 rounded-sm flex items-center gap-2">
                <span className="text-[10px] font-mono text-corp-gold animate-pulse">CALCULATING PROBABILITIES...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 war-room-panel border-t border-corp-border z-10 shrink-0">
        <form onSubmit={handleSubmit} className="relative max-w-5xl mx-auto flex gap-4">
          <div className="flex-1 relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type mail draft or scenario (e.g., 'Draft raise request')..."
              className="w-full luxury-input rounded-sm p-4 pr-12 text-corp-platinum placeholder-corp-silver/30 focus:outline-none transition-all font-mono text-sm"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-corp-blue hover:bg-blue-600 text-white disabled:opacity-30 disabled:cursor-not-allowed px-8 rounded-sm font-bold flex items-center gap-2 transition-all uppercase tracking-widest text-xs font-display shadow-[0_0_20px_rgba(0,122,255,0.3)] hover:shadow-[0_0_30px_rgba(0,122,255,0.5)]"
          >
            EXECUTE
          </button>
        </form>
      </div>
    </div>
  );
};
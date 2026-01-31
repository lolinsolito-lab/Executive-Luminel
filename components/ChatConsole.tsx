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
      <div className="h-20 war-room-panel border-b border-corp-border flex items-center px-8 justify-between z-10 shrink-0">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-corp-bg border border-corp-border rounded-sm flex items-center justify-center shadow-inner">
                <Activity className="text-corp-blue animate-pulse" size={20} />
            </div>
            <div>
                <h1 className="font-display font-bold text-corp-platinum tracking-widest text-sm">WAR ROOM</h1>
                <p className="text-[9px] text-corp-silver font-mono uppercase tracking-widest">SANDBOX: ACTIVE // ENCRYPTION: 256-BIT</p>
            </div>
        </div>
        <div className="flex items-center gap-3 bg-black/50 px-3 py-1.5 rounded-sm border border-corp-border">
            <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-corp-gold animate-pulse' : 'bg-emerald-500'}`}></span>
            <span className="text-[10px] font-mono text-corp-silver">{isLoading ? 'ANALYZING SCENARIO...' : 'SYSTEM READY'}</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-8 z-0 scroll-smooth">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-3xl flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-sm flex-shrink-0 flex items-center justify-center border ${
                    msg.role === 'user' 
                    ? 'bg-corp-blue/10 border-corp-blue/30 text-corp-blue' 
                    : 'bg-corp-gold/10 border-corp-gold/30 text-corp-gold shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                }`}>
                    {msg.role === 'user' ? <span className="font-mono text-xs font-bold">ME</span> : <Crown size={14} className="fill-current" />}
                </div>

                {/* Content */}
                <div className={`
                    p-6 rounded-sm text-sm leading-relaxed font-light shadow-lg
                    ${msg.role === 'user' 
                        ? 'bg-corp-bg border border-corp-border text-corp-platinum' 
                        : 'war-room-panel border-l-2 border-l-corp-gold text-corp-platinum/90'
                    }
                `}>
                    <div className="mb-4 text-[9px] font-mono text-corp-silver/50 uppercase tracking-widest flex justify-between border-b border-white/5 pb-2">
                        <span>{msg.role === 'user' ? 'INPUT STREAM' : 'STRATEGIC OUTPUT'}</span>
                        <span>{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    
                    <div className="prose prose-invert prose-sm max-w-none font-sans prose-strong:text-corp-gold prose-headings:font-display prose-headings:text-corp-platinum">
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
                    className="w-full bg-[#050505] border border-corp-border hover:border-corp-silver/30 focus:border-corp-blue rounded-sm p-4 pr-12 text-corp-platinum placeholder-corp-silver/30 focus:outline-none focus:ring-1 focus:ring-corp-blue/20 transition-all font-mono text-sm"
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
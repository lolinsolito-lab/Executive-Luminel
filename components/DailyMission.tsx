import React, { useState, useEffect } from 'react';
import { Check, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DailyMission: React.FC = () => {
    const [completed, setCompleted] = useState(false);
    const [mission, setMission] = useState({ title: '', desc: '' });

    const missions = [
        { title: "The Pause", desc: "Count to 3 before answering any question today." },
        { title: "Silence is Power", desc: "End a meeting without saying 'Bye', just nod." },
        { title: "The Mirror", desc: "Mirror the body language of the highest ranking person in the room." },
        { title: "No Apologies", desc: "Replace 'Sorry' with 'Thank you for waiting' in all emails." },
        { title: "Eye Contact", desc: "Hold eye contact until they look away first." }
    ];

    useEffect(() => {
        // Select random mission on mount (simulated daily)
        const randomIdx = Math.floor(Math.random() * missions.length);
        setMission(missions[randomIdx]);
    }, []);

    const handleComplete = () => {
        if (!completed) {
            setCompleted(true);

            // Confetti Reward
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.9, x: 0.1 }, // Bottom Left corner origin roughly
                colors: ['#D4AF37', '#F3E5AB', '#0F172A']
            });

            // Here we would ideally update the Flame Meter in parent state, 
            // but for now visual feedback is key.
            // dispatch({ type: 'INCREASE_FLAME', payload: 2 }); 
        }
    };

    return (
        <div className={`
            mt-auto mb-4 p-4 rounded-lg border transition-all duration-500 relative overflow-hidden group
            ${completed
                ? 'bg-phoenix-gold-gradient border-transparent shadow-phoenix-glow'
                : 'bg-white border-gray-100 hover:border-phoenix-gold shadow-sm'}
        `}>
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap size={48} className={completed ? "text-white" : "text-phoenix-gold"} />
            </div>

            <div className="relative z-10">
                <h4 className={`
                    font-display text-[10px] font-bold uppercase tracking-[0.2em] mb-1
                    ${completed ? 'text-white' : 'text-phoenix-gold'}
                `}>
                    Daily Mission
                </h4>

                <h3 className={`
                    font-sans text-sm font-bold mb-1
                    ${completed ? 'text-phoenix-navy' : 'text-phoenix-ink'}
                `}>
                    {mission.title}
                </h3>

                <p className={`
                    font-sans text-[11px] leading-snug mb-3
                    ${completed ? 'text-phoenix-navy/80' : 'text-phoenix-ghost'}
                `}>
                    {mission.desc}
                </p>

                <button
                    onClick={handleComplete}
                    disabled={completed}
                    className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all
                        ${completed
                            ? 'bg-phoenix-navy text-white cursor-default'
                            : 'bg-phoenix-snow border border-gray-200 text-phoenix-ink hover:bg-phoenix-gold hover:text-white hover:border-phoenix-gold'}
                    `}
                >
                    {completed ? (
                        <>
                            <Check size={12} /> Mission Accomplished
                        </>
                    ) : (
                        <>
                            <div className="w-3 h-3 border border-gray-400 rounded-sm"></div> Mark Complete
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

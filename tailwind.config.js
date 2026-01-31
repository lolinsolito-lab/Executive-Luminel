/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Cinzel', 'Playfair Display', 'serif'], // V7 PHOENIX - Divine Authority
                mono: ['Space Mono', 'monospace'],
            },
            colors: {
                // V7 PHOENIX Design System
                phoenix: {
                    // Core Canvas
                    canvas: '#FFFFFF',
                    snow: '#FAFAFA',
                    cream: '#FFFEFA',

                    // Text
                    ink: '#111827',      // Charcoal - Main text
                    ghost: '#9CA3AF',    // Cool Grey - Secondary

                    // Accents
                    gold: '#D4AF37',     // THE GOLD - Luxury accent
                    navy: '#0F172A',     // THE NAVY - Authority

                    // Flame Gradient
                    'flame-start': '#F59E0B',  // Amber
                    'flame-end': '#B45309',    // Burnt Orange

                    // Tier Colors
                    'tier-observer': '#9CA3AF',   // Grey (Free)
                    'tier-operative': '#0EA5E9',  // Electric Blue (€49)
                    'tier-executive': '#D4AF37',  // Gold (€299)
                },
                // Legacy corp colors (for backwards compatibility with landing)
                corp: {
                    onyx: 'var(--color-corp-onyx)',
                    platinum: 'var(--color-corp-platinum)',
                    bg: 'var(--color-corp-bg)',
                    glass: 'rgba(255, 255, 255, 0.05)',
                    border: 'var(--color-corp-border)',
                    gold: '#C5A059',
                    'gold-light': '#E5D3B3',
                    blue: '#3B82F6',
                    danger: '#EF4444',
                    silver: 'var(--color-corp-silver)',
                }
            },
            boxShadow: {
                // V7 PHOENIX Shadows
                'phoenix-float': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                'phoenix-gold': '0 0 20px rgba(212, 175, 55, 0.15)',
                'phoenix-glow': 'inset 0 0 20px rgba(212, 175, 55, 0.1)',
            },
            animation: {
                'shake': 'shake 0.5s ease-in-out',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in': 'fadeIn 0.4s ease-out forwards',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 3s ease-in-out infinite',
                'shimmer': 'shimmer 2.5s linear infinite',
                'tremble': 'tremble 0.15s ease-in-out infinite',
                'golden-pulse': 'goldenPulse 2s ease-in-out infinite',
                'flame-breathe': 'flameBreathe 2s ease-in-out infinite',
                'ladder-rise': 'ladderRise 0.6s ease-out forwards',
            },
            keyframes: {
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
                    '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' }
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
                    '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
                },
                glow: {
                    'from': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.2)' },
                    'to': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                tremble: {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(-3deg)' },
                    '75%': { transform: 'rotate(3deg)' },
                },
                goldenPulse: {
                    '0%, 100%': { opacity: '0.8', boxShadow: '0 0 15px rgba(212,175,55,0.2)' },
                    '50%': { opacity: '1', boxShadow: '0 0 30px rgba(212,175,55,0.5)' },
                },
                flameBreathe: {
                    '0%, 100%': { opacity: '0.9', transform: 'scaleY(1)' },
                    '50%': { opacity: '1', transform: 'scaleY(1.02)' },
                },
                ladderRise: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}

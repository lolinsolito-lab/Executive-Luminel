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
                display: ['Montserrat', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                serif: ['Cinzel', 'serif'],
            },
            colors: {
                corp: {
                    onyx: '#09090b', // Deep Black (Main BG)
                    platinum: '#E2E2E2', // Platinum White (Primary Text)
                    bg: '#141416', // Slightly lighter black for cards
                    glass: 'rgba(255, 255, 255, 0.05)', // Frosted Glass
                    border: 'rgba(197, 160, 89, 0.2)', // Gold Border
                    gold: '#C5A059', // Champagne Gold
                    'gold-light': '#E5D3B3',
                    blue: '#3B82F6', // Brighter Blue for Dark Mode
                    danger: '#EF4444', // Brighter Red
                    silver: '#A1A1AA', // Zinc 400 for secondary text
                }
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
                    'from': { boxShadow: '0 0 5px rgba(197, 160, 89, 0.2)' },
                    'to': { boxShadow: '0 0 30px rgba(197, 160, 89, 0.6)' },
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
                    '0%, 100%': { opacity: '0.8', boxShadow: '0 0 15px rgba(197,160,89,0.2)' },
                    '50%': { opacity: '1', boxShadow: '0 0 30px rgba(197,160,89,0.5)' },
                }
            }
        },
    },
    plugins: [],
}

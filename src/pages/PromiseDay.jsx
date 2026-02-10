
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Floating Elements (Hearts/Stars)
const FloatingElements = () => {
    const elements = Array.from({ length: 20 });
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {elements.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: window.innerHeight + 20, x: Math.random() * window.innerWidth, opacity: 0 }}
                    animate={{ y: -20, rotate: 360, opacity: [0, 1, 0] }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                    className="absolute text-xl"
                    style={{ color: i % 2 === 0 ? '#ffb7b2' : '#e2f0cb' }}
                >
                    {i % 3 === 0 ? '✨' : i % 3 === 1 ? '💖' : '🤞'}
                </motion.div>
            ))}
        </div>
    );
};

// Pinky Promise Hands Animation
const PinkyPromiseAnimation = ({ onComplete }) => {
    const [phase, setPhase] = useState(0);

    // Sequence the animation
    useState(() => {
        const sequence = async () => {
            // Phase 1: Hands enter
            await new Promise(r => setTimeout(r, 500)); setPhase(1);
            // Phase 2: Hook pinkies
            await new Promise(r => setTimeout(r, 1500)); setPhase(2);
            // Phase 3: Glow/Lock
            await new Promise(r => setTimeout(r, 1000)); setPhase(3);
            if (onComplete) setTimeout(onComplete, 1000);
        };
        sequence();
    }, []);

    return (
        <div className="relative h-64 w-full max-w-lg mx-auto flex items-center justify-center">
            <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-xl overflow-visible">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Left Hand (Boy) */}
                <motion.g
                    initial={{ x: -200 }}
                    animate={{ x: phase >= 1 ? 0 : -200 }}
                    transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
                >
                    {/* Sleeve */}
                    <path d="M 0 150 L 150 150 L 150 200 L 0 200 Z" fill="#3B82F6" />
                    {/* Hand Base */}
                    <path d="M 150 160 Q 180 160 190 190 L 150 200 Z" fill="#eab3a8" />
                    {/* Fist (Fingers curled) */}
                    <circle cx="170" cy="175" r="15" fill="#eab3a8" />
                    <circle cx="170" cy="195" r="15" fill="#eab3a8" />
                    {/* Pinky Finger (Extended) */}
                    <motion.path
                        d="M 175 200 Q 190 220 210 210"
                        stroke="#eab3a8"
                        strokeWidth="12"
                        strokeLinecap="round"
                        fill="none"
                        animate={{ pathLength: phase >= 2 ? 1 : 1 }}
                    />
                </motion.g>

                {/* Right Hand (Girl) */}
                <motion.g
                    initial={{ x: 200 }}
                    animate={{ x: phase >= 1 ? 0 : 200 }}
                    transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
                >
                    {/* Sleeve */}
                    <path d="M 400 150 L 250 150 L 250 200 L 400 200 Z" fill="#F43F5E" />
                    {/* Hand Base */}
                    <path d="M 250 160 Q 220 160 210 190 L 250 200 Z" fill="#eab3a8" />
                    {/* Fist */}
                    <circle cx="230" cy="175" r="15" fill="#eab3a8" />
                    <circle cx="230" cy="195" r="15" fill="#eab3a8" />
                    {/* Pinky Finger (Extended) */}
                    <motion.path
                        d="M 225 200 Q 210 220 190 210"
                        stroke="#eab3a8"
                        strokeWidth="12"
                        strokeLinecap="round"
                        fill="none"
                    />
                </motion.g>

                {/* The "Lock" / Magic Effect */}
                {phase >= 2 && (
                    <motion.g
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <circle cx="200" cy="210" r="20" fill="none" stroke="#FFD700" strokeWidth="2" strokeDasharray="4 2" className="animate-spin-slow" />
                        <text x="190" y="215" fontSize="20">✨</text>
                    </motion.g>
                )}

                {phase >= 3 && (
                    <motion.text
                        x="140"
                        y="100"
                        fontSize="24"
                        fill="#4B5563"
                        fontFamily="monospace"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Hooked for Life! 🤞
                    </motion.text>
                )}
            </svg>
        </div>
    );
};

export default function PromiseDay() {
    const [started, setStarted] = useState(false);

    return (
        <div className="relative min-h-[90vh] flex flex-col items-center pt-8 overflow-hidden">
            <FloatingElements />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10" />

            <motion.div
                className="z-10 text-center px-4 max-w-4xl w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-500 uppercase bg-blue-100 rounded-full border border-blue-200">
                    February 11th
                </span>
                <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2 font-serif drop-shadow-sm">
                    Promise Day
                </h1>
                <p className="text-2xl text-gray-600 font-handwriting mb-8">
                    My Dear Bhu.... 💙
                </p>

                <div className="min-h-[450px] relative flex flex-col items-center justify-center rounded-3xl p-6 mx-auto max-w-3xl">
                    {!started ? (
                        <motion.button
                            onClick={() => setStarted(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-br from-blue-600 to-purple-500 p-8 rounded-full shadow-lg cursor-pointer group relative overflow-hidden text-white"
                        >
                            <span className="relative z-10 text-6xl drop-shadow-md">🤝</span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                            <p className="relative z-10 mt-2 text-sm font-bold uppercase tracking-widest text-shadow">
                                Make a Promise
                            </p>
                        </motion.button>
                    ) : (
                        <div className="w-full h-full flex flex-col justify-between items-center">
                            <PinkyPromiseAnimation />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 4, duration: 1 }}
                                className="mt-4 bg-white/90 p-8 rounded-xl shadow-lg border border-blue-100 max-w-2xl mx-auto z-50 text-center"
                            >
                                <p className="text-lg text-gray-700 italic font-serif leading-relaxed mb-4">
                                    " No matter what life brings, I promise to stand by your side, holding your hand, forever "
                                </p>
                               
                            </motion.div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

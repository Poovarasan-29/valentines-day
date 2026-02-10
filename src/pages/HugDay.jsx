
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Floating Emojis (Hugs & Hearts)
const FloatingElements = () => {
    const bubbles = Array.from({ length: 20 });
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {bubbles.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: window.innerHeight + 50, x: Math.random() * window.innerWidth, opacity: 0 }}
                    animate={{ y: -50, opacity: [0, 1, 0] }}
                    transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeOut"
                    }}
                    className="absolute text-2xl"
                >
                    {i % 3 === 0 ? '🫂' : i % 3 === 1 ? '🤗' : '💖'}
                </motion.div>
            ))}
        </div>
    );
};

// Hug Animation Component
const HugAnimation = ({ onComplete }) => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            // Phase 1: Run/Walk towards each other
            await new Promise(r => setTimeout(r, 100)); setPhase(1);
            // Phase 2: Embrace (Squeeze)
            await new Promise(r => setTimeout(r, 1500)); setPhase(2);
            // Phase 3: Hearts Explosion
            if (onComplete) setTimeout(onComplete, 1000);
        };
        sequence();
    }, []);

    return (
        <div className="relative h-64 w-full max-w-lg mx-auto flex items-end justify-center overflow-visible">
            {/* Boy Character */}
            <motion.div
                initial={{ x: -200 }}
                animate={{ x: phase >= 1 ? 35 : -200 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute bottom-5 left-1/2 ml-[-100px] w-28 h-52 z-20"
            >
                <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-xl overflow-visible">
                    {/* Legs */}
                    <motion.g animate={{ y: phase === 1 ? [0, -5, 0] : 0 }} transition={{ repeat: phase === 1 ? Infinity : 0, duration: 0.2 }}>
                        <path d="M 35 140 L 35 200" stroke="#1F2937" strokeWidth="12" strokeLinecap="round" />
                        <path d="M 65 140 L 65 200" stroke="#1F2937" strokeWidth="12" strokeLinecap="round" />
                    </motion.g>

                    {/* Body */}
                    <path d="M 25 70 L 25 140 L 75 140 L 75 70 Z" fill="#3B82F6" rx="5" />

                    {/* Head */}
                    <circle cx="50" cy="40" r="22" fill="#eab3a8" />
                    <path d="M 28 35 Q 50 10 72 35 C 75 25 65 15 50 15 C 35 15 25 25 28 35" fill="#1F2937" />

                    {/* Arms - Open then Wrap */}
                    <motion.g
                        animate={{
                            rotate: phase >= 1 ? (phase >= 2 ? -20 : -45) : 0,
                            x: phase >= 2 ? 10 : 0
                        }}
                        style={{ originX: "75px", originY: "75px" }}
                    >
                        {/* Right Arm wrapping around her */}
                        <path d="M 75 75 Q 110 85 90 110" stroke="#3B82F6" strokeWidth="10" strokeLinecap="round" fill="none" />
                        <path d="M 90 110 L 95 120" stroke="#eab3a8" strokeWidth="10" strokeLinecap="round" />
                    </motion.g>

                    {/* Left Arm (hidden/back) */}
                    <path d="M 25 75 Q -10 90 10 110" stroke="#3B82F6" strokeWidth="10" strokeLinecap="round" fill="none" opacity={phase >= 2 ? 0 : 1} />
                </svg>
            </motion.div>

            {/* Girl Character */}
            <motion.div
                initial={{ x: 200 }}
                animate={{ x: phase >= 1 ? -45 : 200 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute bottom-5 left-1/2 ml-[10px] w-28 h-52 z-10"
            >
                <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-xl overflow-visible">
                    {/* Legs */}
                    <motion.g animate={{ y: phase === 1 ? [0, -5, 0] : 0 }} transition={{ repeat: phase === 1 ? Infinity : 0, duration: 0.2, delay: 0.1 }}>
                        <path d="M 40 150 L 35 200" stroke="#eab3a8" strokeWidth="10" strokeLinecap="round" />
                        <path d="M 60 150 L 65 200" stroke="#eab3a8" strokeWidth="10" strokeLinecap="round" />
                    </motion.g>

                    {/* Dress */}
                    <path d="M 50 60 L 15 160 L 85 160 Z" fill="#F43F5E" />

                    {/* Head */}
                    <circle cx="50" cy="40" r="22" fill="#eab3a8" />
                    <path d="M 50 15 C 20 15 10 40 10 70 L 90 70 C 90 40 80 15 50 15" fill="#1F2937" />

                    {/* Arms */}
                    <motion.g
                        animate={{
                            rotate: phase >= 1 ? (phase >= 2 ? 20 : 45) : 0,
                            x: phase >= 2 ? -10 : 0
                        }}
                        style={{ originX: "25px", originY: "75px" }}
                    >
                        {/* Arm wrapping around him */}
                        <path d="M 25 75 Q -10 85 10 110" stroke="#eab3a8" strokeWidth="8" strokeLinecap="round" fill="none" />
                    </motion.g>
                </svg>
            </motion.div>

            {/* Impact Heart */}
            <AnimatePresence>
                {phase >= 2 && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute bottom-40 z-50 text-6xl drop-shadow-lg"
                    >
                        💖
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default function HugDay() {
    const [started, setStarted] = useState(false);

    return (
        <div className="relative min-h-[90vh] flex flex-col items-center pt-8 overflow-hidden">
            <FloatingElements />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 -z-10" />

            <motion.div
                className="z-10 text-center px-4 max-w-4xl w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-orange-500 uppercase bg-orange-100 rounded-full border border-orange-200">
                    February 12th
                </span>
                <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600 mb-2 font-serif drop-shadow-sm">
                    Happy Hug Day
                </h1>
                <p className="text-2xl text-gray-600 font-handwriting mb-8">
                    My Dear Wifeyy 🤗
                </p>

                <div className="min-h-[450px] relative flex flex-col items-center justify-center rounded-3xl p-6 mx-auto max-w-3xl">
                    {!started ? (
                        <motion.button
                            onClick={() => setStarted(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-br from-orange-500 to-rose-500 p-8 rounded-full shadow-lg cursor-pointer group relative overflow-hidden text-white"
                        >
                            <span className="relative z-10 text-6xl drop-shadow-md">🤗</span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                            <p className="relative z-10 mt-2 text-sm font-bold uppercase tracking-widest text-shadow">
                                Send a Big Hug
                            </p>
                        </motion.button>
                    ) : (
                        <div className="w-full h-full flex flex-col justify-between items-center">
                            <HugAnimation />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 3, duration: 1 }}
                                className="mt-8 bg-white/90 p-8 rounded-xl shadow-lg border border-orange-100 max-w-2xl mx-auto z-50 text-center"
                            >
                                <p className="text-3xl text-gray-800 font-handwriting font-bold leading-relaxed mb-6">
                                    " I want to Hug you "
                                </p>

                                <motion.a
                                    href="https://wa.me/916384889012?text=I%20want%20to%20Hug%20you%20mama%20with%20tightly"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-xl">💬</span>
                                        Do you want to Hug me?
                                    </span>
                                </motion.a>
                            </motion.div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

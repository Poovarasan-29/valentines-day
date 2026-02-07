
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, Diamond } from 'lucide-react';

// Floating Hearts Background
const FloatingHearts = () => {
    const hearts = Array.from({ length: 20 });
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: window.innerHeight + 20, x: Math.random() * window.innerWidth, opacity: 0 }}
                    animate={{ y: -20, opacity: [0, 1, 0] }}
                    transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
                    className="absolute"
                >
                    <Heart className="text-pink-200 fill-pink-100 w-6 h-6" />
                </motion.div>
            ))}
        </div>
    );
};

export default function ProposeDay() {
    const [step, setStep] = useState(0); // 0: Intro, 1: Kneel, 2: Question, 3: Success

    const handlePropose = async () => {
        setStep(1); // Boy kneels
        await new Promise(r => setTimeout(r, 1500));
        setStep(2); // Question bubbles appear
    };

    const handleYes = () => {
        setStep(3); // Success celebration
    };

    return (
        <div className="relative min-h-[90vh] flex flex-col items-center pt-8 overflow-hidden">
            <FloatingHearts />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 -z-10" />

            <motion.div
                className="z-10 text-center px-4 max-w-4xl w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-purple-600 uppercase bg-purple-100 rounded-full border border-purple-200">
                    February 8th • Propose Day
                </span>
                <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2 font-serif drop-shadow-sm">
                    Be My Forever?
                </h1>

                <div className="relative h-80 w-full max-w-lg mx-auto mt-12">
                    {/* Scene Container */}
                    <div className="absolute bottom-0 w-full h-full flex justify-center items-end">

                        {/* Boy Character */}
                        <motion.div
                            className="relative z-20 w-32 h-64 mr-10"
                            animate={{
                                y: step >= 1 ? 40 : 0, // Kneel down effect (simple y shift for now, svg change below)
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <svg viewBox="0 0 100 200" className="w-full h-full overflow-visible drop-shadow-xl">
                                {/* Kneeling Legs or Standing Legs */}
                                {step >= 1 ? (
                                    // Kneeling
                                    <path d="M 40 140 L 20 190 L 60 190" stroke="#1F2937" strokeWidth="12" strokeLinecap="round" fill="none" />
                                ) : (
                                    // Standing
                                    <>
                                        <path d="M 35 140 L 35 200" stroke="#1F2937" strokeWidth="12" strokeLinecap="round" />
                                        <path d="M 65 140 L 65 200" stroke="#1F2937" strokeWidth="12" strokeLinecap="round" />
                                    </>
                                )}

                                {/* Body */}
                                <path d="M 25 70 L 25 140 L 75 140 L 75 70 Z" fill="#3B82F6" rx="5" />
                                <circle cx="50" cy="40" r="22" fill="#eab3a8" />
                                <path d="M 28 35 Q 50 10 72 35" fill="#1F2937" />

                                {/* Arms */}
                                {step >= 1 ? (
                                    // Holding Ring Box
                                    <path d="M 70 80 L 100 100" stroke="#3B82F6" strokeWidth="10" strokeLinecap="round" />
                                ) : (
                                    // Relaxed
                                    <path d="M 75 75 L 75 120" stroke="#3B82F6" strokeWidth="10" strokeLinecap="round" />
                                )}

                                {/* Ring Box (Visible when Kneeling) */}
                                {step >= 1 && (
                                    <motion.g
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <rect x="90" y="90" width="20" height="20" fill="#991b1b" />
                                        {/* Diamond Ring spark */}
                                        <circle cx="100" cy="85" r="8" fill="gold" />
                                        <text x="96" y="89" fontSize="10">💎</text>
                                    </motion.g>
                                )}
                            </svg>
                        </motion.div>

                        {/* Girl Character */}
                        <motion.div className="relative z-20 w-32 h-64 ml-10">
                            <svg viewBox="0 0 100 200" className="w-full h-full overflow-visible drop-shadow-xl">
                                <path d="M 40 150 L 35 200" stroke="#eab3a8" strokeWidth="10" strokeLinecap="round" />
                                <path d="M 60 150 L 65 200" stroke="#eab3a8" strokeWidth="10" strokeLinecap="round" />
                                <path d="M 50 60 L 15 160 L 85 160 Z" fill="#F43F5E" />
                                <circle cx="50" cy="40" r="22" fill="#eab3a8" />
                                <path d="M 50 15 C 20 15 10 40 10 70 L 90 70 C 90 40 80 15 50 15" fill="#1F2937" />

                                {/* Arms - Surprised reaction if proposed */}
                                <motion.path
                                    d={step >= 2 ? "M 30 80 Q 40 60 50 80" : "M 30 80 L 20 120"}
                                    stroke="#eab3a8" strokeWidth="8" strokeLinecap="round" fill="none"
                                    animate={step >= 2 ? { d: "M 15 80 Q 30 50 45 80" } : {}}
                                />
                                <motion.path
                                    d={step >= 2 ? "M 70 80 Q 60 60 50 80" : "M 70 80 L 80 120"}
                                    stroke="#eab3a8" strokeWidth="8" strokeLinecap="round" fill="none"
                                    animate={step >= 2 ? { d: "M 85 80 Q 70 50 55 80" } : {}}
                                />

                                {/* Heart popup over head on Yes */}
                                {step === 3 && (
                                    <motion.text
                                        x="35" y="0" fontSize="30"
                                        initial={{ scale: 0, y: 0 }}
                                        animate={{ scale: [1, 1.2, 1], y: -20 }}
                                        transition={{ repeat: Infinity }}
                                    >
                                        ❤️
                                    </motion.text>
                                )}
                            </svg>
                        </motion.div>
                    </div>
                </div>

                {/* Interaction Area */}
                <div className="h-32 flex items-center justify-center">
                    {step === 0 && (
                        <motion.button
                            onClick={handlePropose}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-purple-600 text-white px-8 py-3 rounded-full text-xl font-bold shadow-lg hover:bg-purple-700 transition-colors"
                        >
                            Get Down on One Knee 💍
                        </motion.button>
                    )}

                    {step === 2 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex gap-4 items-center flex-col md:flex-row"
                        >
                            <div className="bg-white p-6 rounded-2xl shadow-xl border border-purple-100 mb-4 md:mb-0">
                                <p className="text-xl font-bold text-gray-800 mb-2">My Dearest,</p>
                                <p className="text-gray-600">Will you hold my hand forever?</p>
                            </div>
                            <motion.button
                                onClick={handleYes}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-rose-500 text-white px-10 py-4 rounded-full text-2xl font-bold shadow-xl hover:bg-rose-600 animate-bounce"
                            >
                                YES! 💖
                            </motion.button>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <p className="text-2xl font-handwriting text-rose-600 font-bold mb-2">
                                She said YES! 🎉
                            </p>
                            <p className="text-gray-600 text-lg">
                                You are my soulmate, my love, my life.
                            </p>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

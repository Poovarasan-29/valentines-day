
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Floating Petals (unchanged)
const FloatingPetals = () => {
    const petals = Array.from({ length: 20 });
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {petals.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 0 }}
                    animate={{ y: window.innerHeight + 20, rotate: 360, opacity: [0, 1, 0] }}
                    transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
                    className="absolute text-2xl"
                >
                    🌸
                </motion.div>
            ))}
        </div>
    );
};

// Butterfly Component
const Butterfly = ({ delay }) => (
    <motion.div
        initial={{ scale: 0, x: 0, y: 0 }}
        animate={{
            scale: [0, 1, 0],
            x: (Math.random() - 0.5) * 400, // Spread horizontally
            y: (Math.random() - 1) * 400, // Move upwards primarily
            rotate: (Math.random() - 0.5) * 90
        }}
        transition={{ duration: 2.5, ease: "easeOut", delay: delay }}
        className="absolute bottom-40 left-0 ml-[-10px] w-5 h-5 z-50 text-2xl"
    >
        🦋
    </motion.div>
);

// Enhanced Characters Animation
const CoupleAnimation = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            // Step 1: Walk in
            await new Promise(r => setTimeout(r, 100)); setStep(1);
            // Step 2: Stop and face
            await new Promise(r => setTimeout(r, 2000)); setStep(2);
            // Step 3: Offer Rose
            await new Promise(r => setTimeout(r, 1000)); setStep(3);

            // Wait 2 seconds before she accepts (Butterflies fly here)
            await new Promise(r => setTimeout(r, 2000));

            // Step 4: Accept Rose & Speak
            setStep(4);

            // Step 5: Final Love
            await new Promise(r => setTimeout(r, 2000));
            if (onComplete) onComplete();
        };
        sequence();
    }, []);

    // SVG Paths for simpler flat design characters
    return (
        <div className="relative h-64 w-full max-w-lg mx-auto flex items-end justify-center overflow-visible">

            {/* Boy Character */}
            <motion.div
                initial={{ x: -200 }}
                animate={{ x: step >= 1 ? -40 : -200 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute bottom-5 left-1/2 ml-[-100px] w-28 h-52 z-20"
            >
                <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-xl overflow-visible">
                    <defs>
                        <filter id="skinShadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                            <feOffset dx="1" dy="1" result="offsetblur" />
                            <feComponentTransfer>
                                <feFuncA type="linear" slope="0.3" />
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Legs */}
                    <path d="M 35 140 L 35 200" stroke="#1F2937" strokeWidth="12" strokeLinecap="round" />
                    <path d="M 65 140 L 65 200" stroke="#1F2937" strokeWidth="12" strokeLinecap="round" />

                    {/* Torso */}
                    <path d="M 25 70 L 25 140 L 75 140 L 75 70 Z" fill="#3B82F6" rx="5" />

                    {/* Neck */}
                    <rect x="42" y="55" width="16" height="15" fill="#eab3a8" />

                    {/* Head */}
                    <circle cx="50" cy="40" r="22" fill="#eab3a8" />
                    {/* Hair */}
                    <path d="M 28 35 Q 50 10 72 35 C 75 25 65 15 50 15 C 35 15 25 25 28 35" fill="#1F2937" />
                    {/* Face Details */}
                    <circle cx="43" cy="38" r="2" fill="#1F2937" />
                    <circle cx="57" cy="38" r="2" fill="#1F2937" />
                    <path d="M 45 50 Q 50 53 55 50" fill="none" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Left Arm (Relaxed) */}
                    <path d="M 25 75 Q 15 100 25 120" stroke="#eab3a8" strokeWidth="10" strokeLinecap="round" fill="none" />

                    {/* Right Arm (Giving Rose) - High Z-Index Logic */}
                    <motion.g
                        initial={{ rotate: 0 }}
                        animate={{ rotate: step >= 3 ? -9 : 0 }}
                        // Pivot at shoulder
                        style={{ originX: "75px", originY: "75px" }}
                    >
                        {/* Arm segments */}
                        <path d="M 75 75 L 85 110" stroke="#3B82F6" strokeWidth="10" strokeLinecap="round" /> {/* Sleeve */}
                        <path d="M 85 110 L 95 130" stroke="#eab3a8" strokeWidth="10" strokeLinecap="round" /> {/* Forearm */}
                    </motion.g>

                    {/* Rose Group - Originally in Love's hand, then hidden when given */}
                    <AnimatePresence>
                        {step >= 3 && step < 4 && (
                            <motion.g
                                initial={{ x: 0, y: 0, opacity: 0 }}
                                animate={{
                                    x: 95,
                                    y: 130,
                                    opacity: 1
                                }}
                                exit={{ opacity: 0 }}
                                className="z-50"
                            >
                                {/* Stem */}
                                {/* <line x1="0" y1="0" x2="10" y2="-20" stroke="green" strokeWidth="3" /> */}
                                {/* Rose Head */}
                                <text x="-15" y="10" fontSize="50">🌹</text>
                            </motion.g>
                        )}
                    </AnimatePresence>

                </svg>

                {/* Speech Bubble */}
                <AnimatePresence>
                    {step >= 3 && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute -top-5 -right-24 bg-white px-3 py-1.5 rounded-2xl rounded-bl-none shadow-lg border border-rose-200 z-50 whitespace-nowrap"
                        >
                            <p className="text-xs font-bold text-rose-600">I Love You Darling! ❤️</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Girl Character */}
            <motion.div
                initial={{ x: 200 }}
                animate={{ x: step >= 1 ? 40 : 200 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute bottom-5 left-1/2 ml-[10px] w-28 h-52 z-10"
            >
                <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-xl overflow-visible">
                    {/* Legs */}
                    <path d="M 40 150 L 35 200" stroke="#eab3a8" strokeWidth="10" strokeLinecap="round" />
                    <path d="M 60 150 L 65 200" stroke="#eab3a8" strokeWidth="10" strokeLinecap="round" />

                    {/* Dress */}
                    <path d="M 50 60 L 15 160 L 85 160 Z" fill="#F43F5E" />

                    {/* Neck */}
                    <rect x="42" y="50" width="16" height="12" fill="#eab3a8" />

                    {/* Head */}
                    <circle cx="50" cy="40" r="22" fill="#eab3a8" />
                    {/* Hair */}
                    <path d="M 50 15 C 20 15 10 40 10 70 L 90 70 C 90 40 80 15 50 15" fill="#1F2937" />
                    {/* Face Details */}
                    <circle cx="43" cy="38" r="2" fill="#1F2937" />
                    <circle cx="57" cy="38" r="2" fill="#1F2937" />
                    <path d="M 45 50 Q 50 53 55 50" fill="none" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Arms */}
                    <motion.g
                        initial={{ rotate: 0 }}
                        animate={{ rotate: step >= 4 ? -20 : 0 }}
                        style={{ originX: "30px", originY: "70px" }}
                    >
                        <path d="M 30 70 Q 20 100 40 110" stroke="#eab3a8" strokeWidth="8" strokeLinecap="round" fill="none" />
                    </motion.g>

                    <motion.g
                        initial={{ rotate: 0 }}
                        animate={{ rotate: step >= 4 ? 20 : 0 }}
                        style={{ originX: "70px", originY: "70px" }}
                    >
                        <path d="M 70 70 Q 80 100 60 110" stroke="#eab3a8" strokeWidth="8" strokeLinecap="round" fill="none" />

                        {/* Rose Received - Appears in her hand at Step 4 */}
                        {step >= 4 && (
                            <text x="50" y="110" fontSize="20" className="animate-pulse">🌹</text>
                        )}
                    </motion.g>

                </svg>

                {/* Butterfly Explosion ON HER STOMACH (Center of body) */}
                <AnimatePresence>
                    {step >= 3 && ( // Start flying when he offers rose (or slightly after)
                        <motion.div className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none z-50">
                            {/* Generate 15 butterflies */}
                            {[...Array(15)].map((_, i) => (
                                <Butterfly key={i} delay={i * 0.1} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

        </div>
    );
};

export default function RoseDay() {
    const [started, setStarted] = useState(false);

    return (
        <div className="relative min-h-[90vh] flex flex-col items-center pt-8 overflow-hidden">
            <FloatingPetals />
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-white -z-10" />

            <motion.div
                className="z-10 text-center px-4 max-w-4xl w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-rose-500 uppercase bg-rose-100 rounded-full border border-rose-200">
                    February 7th
                </span>
                <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 mb-2 font-serif drop-shadow-sm">
                    Happy Rose Day
                </h1>
                <p className="text-2xl text-gray-600 font-handwriting mb-8">
                    My Love Bhuvaneswari 🌹
                </p>

                <div className="min-h-[450px] relative flex flex-col items-center justify-center rounded-3xl p-6  mx-auto max-w-3xl">
                    {!started ? (
                        <motion.button
                            onClick={() => setStarted(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-br from-rose-700 to-pink-500 p-8 rounded-full shadow-lg cursor-pointer group relative overflow-hidden text-white"
                        >
                            <span className="relative z-10 text-6xl drop-shadow-md">💗</span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                            <p className="relative z-10 mt-2 text-sm font-bold uppercase tracking-widest text-shadow">
                                Tap to Open
                            </p>
                        </motion.button>
                    ) : (
                        <div className="w-full h-full flex flex-col justify-between">
                            <CoupleAnimation />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 8, duration: 1 }}
                                className="mt-4 bg-white/90 p-6 rounded-xl shadow-md border border-rose-100 max-w-xl mx-auto z-50"
                            >
                                <p className="text-lg text-gray-800 italic font-serif leading-relaxed">
                                    "I may not be there to give you a real rose today, but my heart is always with you.<br />
                                    Accept this rose as a promise of my love."
                                </p>
                                <div className="mt-4 flex items-center justify-end gap-3">
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400" />
                                    <p className="text-rose-600 font-bold font-handwriting text-2xl">
                                        Your Mama Poovarasan
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

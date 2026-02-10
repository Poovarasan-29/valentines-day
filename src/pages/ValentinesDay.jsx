
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Floating Hearts
const FloatingHearts = () => {
    const hearts = Array.from({ length: 25 });
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        y: window.innerHeight + 100,
                        x: Math.random() * window.innerWidth,
                        scale: Math.random() * 0.5 + 0.5,
                        opacity: 0
                    }}
                    animate={{
                        y: -100,
                        opacity: [0, 1, 1, 0],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                    className="absolute text-3xl"
                    style={{
                        color: ['#ff6b9d', '#c44569', '#f8b500', '#ff6348', '#ff4757'][Math.floor(Math.random() * 5)]
                    }}
                >
                    {['❤️', '💕', '💖', '💗', '💝', '💞'][Math.floor(Math.random() * 6)]}
                </motion.div>
            ))}
        </div>
    );
};

// Interactive Gift Box Unwrapping
const GiftUnwrapping = ({ onComplete }) => {
    const [layer, setLayer] = useState(0); // 0: ribbon, 1: lid, 2: glow, 3: revealed
    const [isUnwrapping, setIsUnwrapping] = useState(false);

    const handleUnwrap = () => {
        if (isUnwrapping) return;
        setIsUnwrapping(true);

        setTimeout(() => {
            setLayer(prev => {
                const next = prev + 1;
                if (next >= 3) {
                    setTimeout(() => onComplete(), 1000);
                }
                return next;
            });
            setIsUnwrapping(false);
        }, 800);
    };

    const messages = [
        "Click to untie the ribbon! 🎀",
        "Click to open the lid! 📦",
        "One more click! Almost there! ✨"
    ];

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[600px]">
            {/* Instructions */}
            {layer < 3 && (
                <motion.div
                    key={layer}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-0 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-rose-300 z-50"
                >
                    <p className="text-lg font-bold text-rose-600">{messages[layer]}</p>
                </motion.div>
            )}

            {/* Gift Box */}
            <div className="relative w-80 h-80 cursor-pointer" onClick={handleUnwrap}>
                <AnimatePresence>
                    {/* Ribbon - Layer 0 */}
                    {layer === 0 && (
                        <motion.div
                            key="ribbon"
                            initial={{ scale: 1 }}
                            exit={{ scale: 0, rotate: 360, opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 flex items-center justify-center z-40"
                        >
                            <div className="relative w-full h-full">
                                {/* Vertical ribbon */}
                                <div className="absolute left-1/2 top-0 w-16 h-full bg-gradient-to-b from-red-400 to-red-600 transform -translate-x-1/2 shadow-lg"></div>
                                {/* Horizontal ribbon */}
                                <div className="absolute top-1/2 left-0 w-full h-16 bg-gradient-to-r from-red-400 to-red-600 transform -translate-y-1/2 shadow-lg"></div>
                                {/* Bow */}
                                <motion.div
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl z-50"
                                >
                                    🎀
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {/* Lid - Layer 1 */}
                    {layer === 1 && (
                        <motion.div
                            key="lid"
                            initial={{ y: 0 }}
                            exit={{ y: -300, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-rose-400 to-red-500 rounded-t-2xl shadow-2xl z-30 border-4 border-red-600"
                        >
                            <div className="absolute inset-0 bg-white/20 rounded-t-2xl"></div>
                        </motion.div>
                    )}

                    {/* Box Body - Always visible until revealed */}
                    {layer < 3 && (
                        <motion.div
                            animate={{ scale: layer >= 1 ? 1 : 1 }}
                            className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-br from-rose-300 to-red-400 rounded-b-2xl shadow-2xl border-4 border-red-500 z-20"
                        >
                            <div className="absolute inset-0 bg-white/10 rounded-b-2xl"></div>
                            {/* Sparkles on box */}
                            {layer >= 1 && (
                                <>
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="absolute top-4 left-8 text-3xl"
                                    >
                                        ✨
                                    </motion.div>
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                        className="absolute top-8 right-8 text-3xl"
                                    >
                                        ✨
                                    </motion.div>
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                                        className="absolute bottom-12 left-12 text-3xl"
                                    >
                                        ✨
                                    </motion.div>
                                </>
                            )}
                        </motion.div>
                    )}

                    {/* Final Glow - Layer 2 */}
                    {layer === 2 && (
                        <motion.div
                            key="glow"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0 z-60"
                        >
                            <div className="absolute inset-0 bg-gradient-radial from-yellow-200 via-pink-200 to-transparent rounded-full blur-xl"></div>
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, x: 160, y: 160 }}
                                    animate={{
                                        scale: [0, 1, 0.8],
                                        x: 160 + Math.cos(i * Math.PI / 6) * 200,
                                        y: 160 + Math.sin(i * Math.PI / 6) * 200,
                                        opacity: [1, 1, 0]
                                    }}
                                    transition={{ duration: 1.5 }}
                                    className="absolute text-5xl"
                                >
                                    {['💕', '❤️', '💖'][i % 3]}
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Center heart that grows when unwrapping */}
                {layer >= 1 && layer < 3 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0.8, 1, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl z-25"
                    >
                        💝
                    </motion.div>
                )}
            </div>

            {/* Progress indicator */}
            {layer < 3 && (
                <div className="absolute bottom-8 flex gap-3">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${i <= layer ? 'bg-rose-500' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// Love Letter Content
const LoveMessageReveal = ({ onNext }) => {
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        setTimeout(() => setRevealed(true), 500);
    }, []);

    return (
        <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            className="max-w-3xl w-full"
        >
            <div className="bg-gradient-to-br from-white via-rose-50 to-pink-100 rounded-3xl shadow-2xl p-10 border-4 border-rose-300 relative overflow-hidden">
                {/* Animated hearts in corners */}
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                        className="absolute text-4xl opacity-20"
                        style={{
                            top: i < 2 ? '1rem' : 'auto',
                            bottom: i >= 2 ? '1rem' : 'auto',
                            left: i % 2 === 0 ? '1rem' : 'auto',
                            right: i % 2 === 1 ? '1rem' : 'auto'
                        }}
                    >
                        💕
                    </motion.div>
                ))}

                <AnimatePresence>
                    {revealed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-center mb-6"
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.15, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity
                                    }}
                                    className="text-8xl mb-4"
                                >
                                    💝
                                </motion.div>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-rose-600 mb-2">
                                    Happy Valentine's Day
                                </h2>
                                <p className="text-2xl text-gray-600 font-handwriting">
                                    En Kadhaliyeee ❤️
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="space-y-6 text-gray-700 text-lg leading-relaxed"
                            >
                                <p className="text-center italic text-xl">
                                    "Today is Valentine's Day, the most special day to celebrate our love."
                                </p>

                                <div className="bg-white/80 p-6 rounded-2xl border-2 border-rose-300 shadow-inner">
                                    <motion.p
                                        className="text-center font-handwriting text-3xl text-rose-700 mb-3"
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        You Are My Everything ❤️
                                    </motion.p>
                                    <p className="text-gray-600 text-center">
                                        My love, my best friend, my soulmate<br />
                                    </p>
                                </div>

                                <p className="text-center leading-relaxed">
                                    I want to be with you every single day of my life. </p>

                                <motion.p
                                    className="text-center text-4xl font-handwriting font-bold text-rose-600 my-6"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    " I Love You dii "
                                </motion.p>

                                <p className="text-center text-gray-600 text-xl">
                                    Happy Valentine's Day, Ammu ❤️
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="flex justify-center mt-8"
                            >
                                <motion.button
                                    onClick={onNext}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold py-4 px-10 rounded-full shadow-lg text-lg"
                                >
                                    Send Love Back 💌
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

// Final WhatsApp Screen
const FinalScreen = () => {
    return (
        <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1, bounce: 0.4 }}
            className="max-w-2xl w-full"
        >
            <div className="bg-gradient-to-br from-white via-pink-50 to-rose-100 rounded-3xl shadow-2xl p-12 border-4 border-rose-400 text-center relative overflow-hidden">
                {/* Floating hearts background */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.4, 0.2],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.3
                        }}
                        className="absolute text-6xl opacity-20"
                        style={{
                            left: `${10 + (i * 12)}%`,
                            top: `${20 + (i % 3) * 20}%`
                        }}
                    >
                        💖
                    </motion.div>
                ))}

                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="text-9xl mb-8 relative z-10"
                >
                    💝
                </motion.div>

                {/* <h2 className="text-4xl font-bold text-rose-600 mb-6 font-serif relative z-10">
                    My Love! 🎉
                </h2> */}

                <p className="text-xl text-gray-700 mb-8 leading-relaxed relative z-10">
                    Send me your love back!
                </p>

                <motion.a
                    href="https://wa.me/916384889012?text=Happy%20Valentine's%20Dey%20mama!%20I%20love%20you%20so%20much%20❤️💕"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 text-white font-bold py-5 px-12 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-xl relative z-10"
                >
                    <span className="flex items-center gap-3">
                        <span className="text-3xl">💌</span>
                        Send Your Love
                        <span className="text-3xl">❤️</span>
                    </span>
                </motion.a>

                <p className="text-sm text-gray-500 mt-8 relative z-10">
                    Yours forever,<br />
                    <span className="font-handwriting text-3xl text-rose-600">Poovarasan</span> 💕
                </p>
            </div>
        </motion.div>
    );
};

export default function ValentinesDay() {
    const [phase, setPhase] = useState(0); // 0: Unwrapping, 1: Message, 2: WhatsApp

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-200 via-pink-200 to-red-200">
            <FloatingHearts />

            {/* Decorative pulsing hearts */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 left-10 text-8xl opacity-20"
            >
                💖
            </motion.div>
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute top-20 right-20 text-9xl opacity-20"
            >
                ❤️
            </motion.div>
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                className="absolute bottom-20 left-20 text-8xl opacity-20"
            >
                💕
            </motion.div>

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">

                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-block px-6 py-3 mb-4 text-sm font-bold tracking-wider text-red-700 uppercase bg-white/80 rounded-full border-2 border-red-400 backdrop-blur-sm shadow-lg"
                    >
                        💝 February 14th • Valentine's Day 💝
                    </motion.span>
                </motion.div>

                {/* Content based on phase */}
                <div className="w-full flex items-center justify-center">
                    {phase === 0 && (
                        <div className="max-w-4xl w-full">
                            <motion.h1
                                className="text-5xl md:text-6xl font-bold text-center text-white mb-8 font-serif drop-shadow-lg"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                            >
                                Unwrap Your Gift! 🎁
                            </motion.h1>
                            <GiftUnwrapping onComplete={() => setPhase(1)} />
                        </div>
                    )}

                    {phase === 1 && (
                        <LoveMessageReveal onNext={() => setPhase(2)} />
                    )}

                    {phase === 2 && (
                        <FinalScreen />
                    )}
                </div>
            </div>
        </div>
    );
}

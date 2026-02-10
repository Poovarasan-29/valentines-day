
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Falling Kiss Component
const FallingKiss = ({ id, onCatch, initialX }) => {
    const [isCaught, setIsCaught] = useState(false);
    const emojis = ['💋', '💕', '😘', '❤️', '💖'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    const handleClick = () => {
        if (!isCaught) {
            setIsCaught(true);
            onCatch(id);
        }
    };

    return (
        <AnimatePresence>
            {!isCaught && (
                <motion.div
                    initial={{ y: -50, x: initialX }}
                    animate={{ y: window.innerHeight + 50 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="absolute cursor-pointer text-4xl hover:scale-125 transition-transform z-50"
                    onClick={handleClick}
                    style={{ left: initialX }}
                >
                    {emoji}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Kiss Catching Game
const KissCatchingGame = ({ onComplete }) => {
    const [kisses, setKisses] = useState([]);
    const [caughtCount, setCaughtCount] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const nextIdRef = useRef(0);
    const targetKisses = 11;

    useEffect(() => {
        if (gameOver) return;

        const interval = setInterval(() => {
            const newKiss = {
                id: nextIdRef.current++,
                x: Math.random() * (window.innerWidth - 100)
            };
            setKisses(prev => [...prev, newKiss]);

            // Remove old kisses after they fall
            setTimeout(() => {
                setKisses(prev => prev.filter(k => k.id !== newKiss.id));
            }, 5000);
        }, 800);

        return () => clearInterval(interval);
    }, [gameOver]);

    useEffect(() => {
        if (caughtCount >= targetKisses && !gameOver) {
            setGameOver(true);
            if (onComplete) onComplete();
        }
    }, [caughtCount, gameOver, onComplete]);

    const handleCatch = (id) => {
        setCaughtCount(prev => prev + 1);
        setKisses(prev => prev.filter(k => k.id !== id));
    };

    return (
        <div className="relative w-full h-full overflow-hidden">
            {kisses.map(kiss => (
                <FallingKiss
                    key={kiss.id}
                    id={kiss.id}
                    initialX={kiss.x}
                    onCatch={handleCatch}
                />
            ))}

            {/* Progress bar */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-64 bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-lg">
                <div className="flex justify-between items-center mb-1 px-2">
                    <span className="text-xs font-bold text-rose-600">Catch Kisses!</span>
                    <span className="text-xs font-bold text-rose-600">{caughtCount}/{targetKisses}</span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
                    <motion.div
                        className="bg-gradient-to-r from-rose-500 to-red-600 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(caughtCount / targetKisses) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Instructions */}
            {caughtCount === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
                >
                    <p className="text-sm font-bold text-gray-700">👆 Tap the falling kisses to catch them!</p>
                </motion.div>
            )}
        </div>
    );
};

export default function KissDay() {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);

    return (
        <div className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 pb-40">

            {/* Background decorative elements */}
            <div className="absolute top-10 left-10 text-6xl opacity-10 rotate-12">💋</div>
            <div className="absolute top-20 right-16 text-8xl opacity-10 -rotate-12">💕</div>
            <div className="absolute bottom-20 left-20 text-7xl opacity-10 -rotate-45">😘</div>
            <div className="absolute bottom-10 right-10 text-6xl opacity-10 rotate-45">💋</div>

            <div className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-4 py-8">

                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="inline-block px-4 py-1 mb-3 text-xs font-semibold tracking-wider text-rose-600 uppercase bg-white/50 rounded-full border border-rose-300 backdrop-blur-sm">
                        February 13th
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-600 mb-2 font-serif drop-shadow-sm">
                        Happy Kiss Day
                    </h1>
                    <p className="text-2xl mb-10 text-gray-600 font-handwriting">
                        <b>EnAval 😘</b>
                    </p>
                </motion.div>

                {/* Game Area */}
                <div className="w-full max-w-4xl flex-1 relative">
                    {!gameStarted ? (
                        <motion.div
                            className="absolute inset-0 flex flex-col items-center justify-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/50 text-center max-w-lg">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="text-8xl mb-6"
                                >
                                    💋
                                </motion.div>

                                <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">
                                    Catch My Kisses!
                                </h2>

                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    I'm sending you kisses! 💕<br />
                                    Catch <span className="font-bold text-rose-600">11 kisses</span> to unlock a special message!
                                </p>

                                <motion.button
                                    onClick={() => setGameStarted(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold py-4 px-10 rounded-full shadow-lg text-lg"
                                >
                                    Start Catching! 💋
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : !gameCompleted ? (
                        <div className="absolute inset-0">
                            <KissCatchingGame onComplete={() => setGameCompleted(true)} />
                        </div>
                    ) : (
                        <motion.div
                            className="absolute inset-0 flex flex-col items-center justify-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/50 text-center max-w-2xl ">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", bounce: 0.6 }}
                                    className="text-9xl mb-6"
                                >
                                    🎉
                                </motion.div>

                                <h2 className="text-4xl font-bold text-rose-600 mb-4 font-serif">
                                    You Caught All My Kisses!
                                </h2>

                                <p className="text-3xl text-gray-800 font-handwriting font-bold leading-relaxed mb-6">
                                    " I want to Kiss you "
                                </p>

                                <p className="text-gray-600 mb-8 text-lg">
                                    You collected all my kisses! 💕<br />
                                    Now it's your turn... do you want to send me one back?
                                </p>

                                <div className="flex items-center justify-center gap-3 mb-8">
                                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-rose-300"></div>
                                    <span className="text-3xl">💋</span>
                                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-rose-300"></div>
                                </div>

                                <motion.a
                                    href="https://wa.me/916384889012?text=I%20want%20to%20Kiss%20you%20mama%20 Ummaahh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-block bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 text-lg"
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="text-2xl">💋</span>
                                        Do you want to Kiss me?
                                        <span className="text-2xl">😘</span>
                                    </span>
                                </motion.a>

                                <motion.button
                                    onClick={() => {
                                        setGameStarted(false);
                                        setGameCompleted(false);
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-6 text-gray-500 hover:text-gray-700 text-sm font-semibold underline"
                                >
                                    Play Again? 🔄
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

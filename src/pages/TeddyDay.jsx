
import { useState } from 'react';
import { motion } from 'framer-motion';

const TeddyBear = ({ expression }) => {
    // Animation variants
    const headVariants = {
        idle: { y: 0, rotate: 0 },
        dance: { y: [0, -5, 0], rotate: [0, -5, 5, 0], transition: { repeat: Infinity, duration: 1.5 } },
        shy: { rotate: 10, y: 5, transition: { duration: 0.5 } },
        hug: { x: -30, transition: { duration: 0.5 } }, // Move left to make room for friend
        love: { scale: 1.1, y: -5, transition: { type: "spring", stiffness: 300 } }
    };

    const earLeftVariants = {
        idle: { rotate: 0 },
        dance: { rotate: [-5, 5, -5], transition: { repeat: Infinity, duration: 1.5 } }
    };

    const earRightVariants = {
        idle: { rotate: 0 },
        dance: { rotate: [5, -5, 5], transition: { repeat: Infinity, duration: 1.5 } }
    };

    const leftArmVariants = {
        idle: { rotate: 0, x: 0, y: 0 },
        dance: { rotate: [-10, 20, -10], transition: { repeat: Infinity, duration: 1 } },
        shy: { rotate: -150, x: 35, y: -45, transition: { duration: 0.5 } }, // Covering face
        hug: { rotate: -30, x: -10, y: 0, transition: { duration: 0.5 } }, // Embracing
        love: { rotate: -40, x: 15, y: -10, transition: { duration: 0.5 } } // Hands on chest/stomach
    };

    const rightArmVariants = {
        idle: { rotate: 0, x: 0, y: 0 },
        dance: { rotate: [20, -10, 20], transition: { repeat: Infinity, duration: 1 } },
        shy: { rotate: 150, x: -35, y: -45, transition: { duration: 0.5 } }, // Covering face
        hug: { rotate: 40, x: 10, y: 0, transition: { duration: 0.5 } }, // Embracing
        love: { rotate: 40, x: -15, y: -10, transition: { duration: 0.5 } } // Hands on chest/stomach
    };

    return (
        <div className="relative w-96 h-80 flex justify-center items-center">
            {/* Secondary Teddy for Hug Mode */}
            {expression === 'hug' && (
                <motion.svg
                    viewBox="0 0 200 240"
                    className="absolute w-72 h-84 z-0 left-20 top-0 opacity-90"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <path d="M 65 190 L 65 220 A 15 15 0 0 0 95 220 L 95 190" fill="#B45309" stroke="#78350F" strokeWidth="3" />
                    <path d="M 105 190 L 105 220 A 15 15 0 0 0 135 220 L 135 190" fill="#B45309" stroke="#78350F" strokeWidth="3" />
                    <ellipse cx="100" cy="160" rx="50" ry="60" fill="#B45309" stroke="#78350F" strokeWidth="3" />
                    <ellipse cx="100" cy="160" rx="30" ry="40" fill="#FDE68A" />
                    {/* Hugging Arms */}
                    <path d="M 40 150 Q 100 160 160 150" stroke="#B45309" strokeWidth="20" strokeLinecap="round" fill="none" />
                    <circle cx="100" cy="85" r="50" fill="#D97706" stroke="#78350F" strokeWidth="3" />
                    <ellipse cx="100" cy="100" rx="20" ry="16" fill="#FDE68A" />
                    <ellipse cx="100" cy="95" rx="7" ry="5" fill="#4B5563" />
                    <circle cx="80" cy="75" r="5" fill="#1F2937" />
                    <circle cx="120" cy="75" r="5" fill="#1F2937" />
                </motion.svg>
            )}

            {/* Main Teddy */}
            <svg viewBox="0 0 200 240" className="w-72 h-84 overflow-visible drop-shadow-2xl z-10 relative">
                <defs>
                    <filter id="softShadow">
                        <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
                    </filter>
                </defs>

                {/* Legs */}
                <path d="M 65 190 L 65 220 A 15 15 0 0 0 95 220 L 95 190" fill="#D97706" stroke="#92400E" strokeWidth="3" />
                <path d="M 105 190 L 105 220 A 15 15 0 0 0 135 220 L 135 190" fill="#D97706" stroke="#92400E" strokeWidth="3" />

                {/* Body */}
                <motion.ellipse
                    cx="100" cy="160" rx="50" ry="60"
                    fill="#D97706" stroke="#92400E" strokeWidth="3"
                    animate={expression === 'dance' ? { scaleX: [1, 1.05, 1], y: [0, -5, 0] } : { scaleX: 1, y: 0 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                />
                {/* Belly Patch */}
                <ellipse cx="100" cy="160" rx="30" ry="40" fill="#FEF3C7" />

                {/* Love Mode: Hearts on Stomach */}
                {expression === 'love' && (
                    <motion.g
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    >
                        <text x="85" y="170" fontSize="30">❤️</text>
                    </motion.g>
                )}

                {/* Head Group */}
                <motion.g
                    variants={headVariants}
                    animate={expression}
                    style={{ originX: "100px", originY: "160px" }} // Pivot around neck
                >
                    {/* Ears */}
                    <motion.g variants={earLeftVariants} animate={expression} style={{ originX: "50px", originY: "60px" }}>
                        <circle cx="45" cy="55" r="18" fill="#D97706" stroke="#92400E" strokeWidth="3" />
                        <circle cx="45" cy="55" r="10" fill="#FEF3C7" />
                    </motion.g>
                    <motion.g variants={earRightVariants} animate={expression} style={{ originX: "150px", originY: "60px" }}>
                        <circle cx="155" cy="55" r="18" fill="#D97706" stroke="#92400E" strokeWidth="3" />
                        <circle cx="155" cy="55" r="10" fill="#FEF3C7" />
                    </motion.g>
                    <circle cx="100" cy="85" r="55" fill="#F59E0B" stroke="#92400E" strokeWidth="3" filter="url(#softShadow)" />

                    {/* Snout */}
                    <ellipse cx="100" cy="100" rx="22" ry="18" fill="#FEF3C7" />
                    <ellipse cx="100" cy="95" rx="8" ry="6" fill="#4B5563" /> {/* Nose */}

                    {/* Mouth */}
                    <motion.path
                        d="M 90 105 Q 100 115 110 105"
                        fill="transparent" stroke="#4B5563" strokeWidth="3" strokeLinecap="round"
                        animate={expression === 'smile' || expression === 'hug' || expression === 'dance' || expression === 'love' ? { d: "M 85 105 Q 100 125 115 105" } : { d: "M 92 108 Q 100 112 108 108" }}
                    />

                    {/* Eyes */}
                    {expression === 'love' ? (
                        <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                            <text x="65" y="85" fontSize="25">❤️</text>
                            <text x="115" y="85" fontSize="25">❤️</text>
                        </motion.g>
                    ) : (
                        <motion.g>
                            {/* Left Eye */}
                            <circle cx="75" cy="75" r="6" fill="#1F2937" />
                            {/* Right Eye */}
                            {expression === 'wink' ? (
                                <path d="M 119 75 Q 125 70 131 75" stroke="#1F2937" strokeWidth="3" fill="none" />
                            ) : (
                                <circle cx="125" cy="75" r="6" fill="#1F2937" />
                            )}

                            {/* Highlights */}
                            {expression !== 'wink' && <circle cx="77" cy="73" r="2" fill="white" />}
                            {expression !== 'wink' && <circle cx="127" cy="73" r="2" fill="white" />}
                        </motion.g>
                    )}

                    {/* Cheeks - Only for Shy or Love */}
                    {expression === 'shy' && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <circle cx="60" cy="95" r="12" fill="#F43F5E" opacity="0.6" filter="blur(4px)" />
                            <circle cx="140" cy="95" r="12" fill="#F43F5E" opacity="0.6" filter="blur(4px)" />
                        </motion.g>
                    )}
                </motion.g>

                {/* Arms - Controlled by variants */}
                {/* Left Arm */}
                <motion.g
                    initial={{ rotate: 0 }}
                    animate={expression}
                    variants={leftArmVariants}
                    style={{ originX: "60px", originY: "140px" }} // Shoulder pivot
                >
                    <path d="M 60 140 Q 30 170 60 200" stroke="#D97706" strokeWidth="20" strokeLinecap="round" fill="none" />
                </motion.g>

                {/* Right Arm */}
                <motion.g
                    initial={{ rotate: 0 }}
                    animate={expression}
                    variants={rightArmVariants}
                    style={{ originX: "140px", originY: "140px" }} // Shoulder pivot
                >
                    <path d="M 140 140 Q 170 170 140 200" stroke="#D97706" strokeWidth="20" strokeLinecap="round" fill="none" />
                </motion.g>
            </svg>
        </div>
    );
};

export default function TeddyDay() {
    const [expression, setExpression] = useState('smile');

    const actions = [
        { id: 'smile', label: 'Smile 😊', color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' },
        { id: 'dance', label: 'Dance 💃', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
        { id: 'hug', label: 'Hug 🤗', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200' },
        { id: 'shy', label: 'Shy 🙈', color: 'bg-rose-100 text-rose-700 hover:bg-rose-200' },
        { id: 'wink', label: 'Wink 😉', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
        { id: 'love', label: 'Love ❤️', color: 'bg-red-100 text-red-700 hover:bg-red-200' },
    ];

    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden relative">

            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-10 left-10 text-4xl animate-bounce">🧸</div>
                <div className="absolute top-20 right-20 text-3xl animate-pulse">✨</div>
                <div className="absolute bottom-20 left-20 text-5xl">🍯</div>
            </div>

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="mb-8"
            >
                <TeddyBear expression={expression} />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 font-serif drop-shadow-sm text-center">
                Happy Teddy Day!
            </h1>

            <p className="text-xl md:text-2xl text-amber-700 italic max-w-lg mx-auto text-center mb-10 font-handwriting">
                "A cute teddy for my cutest person!"
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md w-full px-4">
                {actions.map((action) => (
                    <button
                        key={action.id}
                        onClick={() => setExpression(action.id)}
                        className={`
                        ${action.color} py-3 px-6 rounded-xl font-bold shadow-md 
                        transform hover:scale-105 active:scale-95 transition-all duration-200
                        border-2 border-white/50 backdrop-blur-sm
                        ${expression === action.id ? 'ring-4 ring-offset-2 ring-amber-300' : ''}
                    `}
                    >
                        {action.label}
                    </button>
                ))}
            </div>
        </div>
    );
}


import { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';

const chocolates = [
    {
        id: '5star',
        name: '5 Star',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-900',
        emoji: '⭐',
        description: 'Chewy & Caramel',
        wrapperColor: 'from-yellow-400 to-yellow-600',
    },
    {
        id: 'dairymilk',
        name: 'Dairy Milk',
        color: 'bg-purple-600',
        textColor: 'text-white',
        emoji: '🍫',
        description: 'Silk & Smooth',
        wrapperColor: 'from-purple-500 to-purple-700',
    },
    {
        id: 'munch',
        name: 'Munch',
        color: 'bg-orange-500',
        textColor: 'text-white',
        emoji: '🥖',
        description: 'Crunchy Wafer',
        wrapperColor: 'from-orange-400 to-orange-600',
    }
];

const loveSentences = {
    '5star': "You are my 5 Star because I get lost in your sweetness! ⭐💛",
    'dairymilk': "You are smoother than Silk and sweeter than Chocolate! 💜🍫",
    'munch': "I love the crunch in our relationship, never boring! 🧡🥖",
};

export default function ChocolateDay() {
    const [selectedChocolate, setSelectedChocolate] = useState(null);
    const [showCenter, setShowCenter] = useState(false);
    const [sentence, setSentence] = useState('');
    const [raindrops, setRaindrops] = useState([]);

    // For duplicate selection logic
    const [previousSelection, setPreviousSelection] = useState(null);
    const [showReasonModal, setShowReasonModal] = useState(false);
    const [reason, setReason] = useState('');

    useEffect(() => {
        if (selectedChocolate) {
            // Create rain effect
            const interval = setInterval(() => {
                setRaindrops(prev => {
                    const newDrops = Array.from({ length: 3 }).map(() => ({
                        id: Date.now() + Math.random(),
                        left: Math.random() * 100,
                        animationDuration: Math.random() * 2 + 3 + 's',
                        emoji: selectedChocolate.emoji
                    }));
                    return [...prev, ...newDrops].slice(-100);
                });
            }, 200);

            // Show center chocolate after 6 seconds
            const timer = setTimeout(() => {
                setShowCenter(true);
            }, 6000);

            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        }
    }, [selectedChocolate]);

    const handleChocolateClick = () => {
        if (selectedChocolate) {
            setSentence(loveSentences[selectedChocolate.id]);
        }
    };

    const handleWantClick = () => {
        if (previousSelection && previousSelection !== selectedChocolate.name) {
            setShowReasonModal(true);
        } else {
            setPreviousSelection(selectedChocolate.name);
            const text = `I want ${selectedChocolate.name} Mamzz`;
            window.open(`https://wa.me/916384889012?text=${encodeURIComponent(text)}`, '_blank');
        }
    };

    const handleSubmitReason = () => {
        const text = `I already choosed ${previousSelection} but also I want ${selectedChocolate.name} because ${reason}`;
        window.open(`https://wa.me/916384889012?text=${encodeURIComponent(text)}`, '_blank');
        setShowReasonModal(false);
        setReason('');
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">

            {/* Rain Effect */}
            {selectedChocolate && (
                <div className="fixed inset-0 pointer-events-none z-10">
                    {raindrops.map((drop) => (
                        <div
                            key={drop.id}
                            className="absolute text-2xl animate-fall opacity-70"
                            style={{
                                left: `${drop.left}%`,
                                top: '-20px',
                                animationDuration: drop.animationDuration,
                                animationName: 'fall'
                            }}
                        >
                            {drop.emoji}
                        </div>
                    ))}
                </div>
            )}

            {/* Title */}
            {!selectedChocolate && (
                <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-12 animate-bounce">
                    Which chocolate is for my Sweetie? 🍫
                </h1>
            )}

            {/* Selection Grid */}
            {!selectedChocolate ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 z-20">
                    {chocolates.map((choco) => (
                        <button
                            key={choco.id}
                            onClick={() => setSelectedChocolate(choco)}
                            className={`
                relative group transform hover:scale-110 transition-all duration-300
                w-64 h-80 rounded-2xl shadow-xl overflow-hidden
                bg-gradient-to-br ${choco.wrapperColor}
                flex flex-col items-center justify-center
                cursor-pointer border-4 border-white/30
              `}
                        >
                            <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors" />
                            <div className="text-8xl mb-4 drop-shadow-lg transform group-hover:rotate-12 transition-transform">
                                {choco.emoji}
                            </div>
                            <h3 className={`text-3xl font-bold ${choco.textColor} drop-shadow-md`}>
                                {choco.name}
                            </h3>
                            <p className={`mt-2 ${choco.textColor} opacity-90 font-medium`}>
                                {choco.description}
                            </p>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="z-30 flex flex-col items-center">

                    {/* Transition Message (Optional, or just wait for the center chocolate) */}
                    {!showCenter && !sentence && (
                        <div className="text-3xl text-rose-600 font-bold animate-pulse text-center px-4">
                            Close Your Eyes For 5 Seconds 🙈
                        </div>
                    )}

                    {/* Center Display Chocolate */}
                    {showCenter && !sentence && (
                        <div
                            onClick={handleChocolateClick}
                            className={`
                cursor-pointer transform hover:scale-110 active:scale-95 transition-all duration-500
                animate-float
              `}
                        >
                            <div className={`
                w-72 h-96 rounded-3xl shadow-2xl
                bg-gradient-to-br ${selectedChocolate.wrapperColor}
                flex flex-col items-center justify-center
                border-8 border-white/50 backdrop-blur-sm
              `}>
                                <div className="text-9xl mb-6 animate-pulse">
                                    {selectedChocolate.emoji}
                                </div>
                                <div className="bg-white/90 px-6 py-2 rounded-full shadow-lg">
                                    <span className="text-xl font-bold text-rose-500 animate-pulse">
                                        Click Me! ❤️
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Love Sentence Display */}
                    {sentence && (
                        <div className="max-w-2xl mx-auto text-center animate-zoom-in p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-rose-200">
                            <Heart className="w-16 h-16 text-red-500 mx-auto mb-4 animate-beat" fill="currentColor" />
                            <h1 className="text-4xl font-bold text-rose-600 mb-4 font-serif">Happy Chocolate Day! 🍫</h1>
                            <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent leading-tight mb-6">
                                {sentence}
                            </h2>
                            <div className="text-8xl mt-4 animate-bounce">
                                {selectedChocolate.emoji}
                            </div>
                            <button
                                onClick={handleWantClick}
                                className="mt-6 px-6 py-3 bg-[#25D366] text-white font-bold rounded-full shadow-lg hover:bg-[#128C7E] transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                            >
                                Do You Want {selectedChocolate.name}? 💬
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedChocolate(null);
                                    setSentence('');
                                    setShowCenter(false);
                                    setRaindrops([]);
                                }}
                                className="block mx-auto mt-4 text-sm text-rose-400 hover:text-rose-600 underline"
                            >
                                Choose another chocolate
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Reason Modal */}
            {showReasonModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full border-4 border-rose-200 animate-zoom-in">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-rose-600">Why do you want another one? 🤔</h3>
                            <button onClick={() => setShowReasonModal(false)} className="text-gray-400 hover:text-rose-500">
                                <X size={24} />
                            </button>
                        </div>
                        <p className="text-gray-600 mb-4">
                            You already chose <span className="font-bold text-rose-500">{previousSelection}</span>. Why do you want <span className="font-bold text-rose-500">{selectedChocolate?.name}</span> too?
                        </p>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Because I love chocolates..."
                            className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 min-h-[100px] mb-4 text-gray-700"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowReasonModal(false)}
                                className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitReason}
                                disabled={!reason.trim()}
                                className="px-6 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                            >
                                Submit & Ask 💖
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Fall Animation Keyframes */}
            <style>{`
        @keyframes fall {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
        @keyframes beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .animate-beat {
          animation: beat 1s infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes zoom-in {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-zoom-in {
            animation: zoom-in 0.3s ease-out forwards;
        }
      `}</style>
        </div>
    );
}

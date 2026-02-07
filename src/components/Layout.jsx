
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

const days = [
  { date: '7', name: 'Rose Day', path: '/rose' },
  { date: '8', name: 'Propose Day', path: '/propose' },
  { date: '9', name: 'Chocolate Day', path: '/chocolate' },
  { date: '10', name: 'Teddy Day', path: '/teddy' },
  { date: '11', name: 'Promise Day', path: '/promise' },
  { date: '12', name: 'Hug Day', path: '/hug' },
  { date: '13', name: 'Kiss Day', path: '/kiss' },
  { date: '14', name: 'Valentines Day', path: '/valentine' },
];

export default function Layout({ children, currentDate, setCurrentDate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-pink-50 text-pink-900 font-sans">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => setCurrentDate(new Date().getDate())}>
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
              <span className="font-bold text-xl tracking-tight text-rose-600">Valentine's Week</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {days.map((day) => (
                  <button
                    key={day.date}
                    onClick={() => setCurrentDate(parseInt(day.date))}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      currentDate === parseInt(day.date)
                        ? 'bg-rose-100 text-rose-600 shadow-inner'
                        : 'text-gray-600 hover:text-rose-500 hover:bg-pink-50'
                    }`}
                  >
                    Feb {day.date}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-rose-500 hover:text-rose-600 hover:bg-pink-100 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-pink-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {days.map((day) => (
                <button
                  key={day.date}
                  onClick={() => {
                    setCurrentDate(parseInt(day.date));
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    currentDate === parseInt(day.date)
                      ? 'bg-rose-100 text-rose-600'
                      : 'text-gray-600 hover:text-rose-500 hover:bg-pink-50'
                  }`}
                >
                  Feb {day.date} - {day.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16 min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
        </div>
      </main>

      <footer className="bg-white/50 backdrop-blur-sm py-4 text-center text-rose-400 text-sm">
        Made with ❤️ for my Thangoo
      </footer>
    </div>
  );
}

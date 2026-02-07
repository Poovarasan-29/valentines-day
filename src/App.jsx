
import { useState } from 'react';
import Layout from './components/Layout';
import RoseDay from './pages/RoseDay';
import ProposeDay from './pages/ProposeDay';

// Placeholder components for other days
const ComingSoon = ({ day, title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <h1 className="text-4xl text-rose-400 font-bold mb-4">Feb {day} - {title}</h1>
    <p className="text-gray-500 text-lg mb-8">Wait for this day, my sweet Thangoo! 💖</p>
    <div className="p-8 bg-white/50 rounded-full shadow-inner">
      <span className="text-6xl grayscale opacity-50">🔒</span>
    </div>
    <p className="mt-4 text-sm text-gray-400">Unlocks on Feb {day}, 12:00 AM</p>
  </div>
);

function App() {
  // Get current date (1-31)
  const today = new Date().getDate();
  // Ensure we are in the correct range for the logic (7-14) or default to 7
  const initialDate = today >= 7 && today <= 14 ? today : 7;

  const [currentDate, setCurrentDate] = useState(initialDate);

  const dayTitles = {
    7: "Rose Day",
    8: "Propose Day",
    9: "Chocolate Day",
    10: "Teddy Day",
    11: "Promise Day",
    12: "Hug Day",
    13: "Kiss Day",
    14: "Valentines Day"
  };

  const renderContent = () => {
    // If trying to access a future date, show Coming Soon
    // Note: This logic assumes we are in February.
    // Since today is 7th (in context), 8th > 7th is true.
    if (currentDate > today) {
      return <ComingSoon day={currentDate} title={dayTitles[currentDate]} />;
    }

    switch (currentDate) {
      case 7:
        return <RoseDay />;
      case 8:
        return <ProposeDay />;
      case 9:
        return <ComingSoon day="9" title="Chocolate Day" />;
      case 10:
        return <ComingSoon day="10" title="Teddy Day" />;
      case 11:
        return <ComingSoon day="11" title="Promise Day" />;
      case 12:
        return <ComingSoon day="12" title="Hug Day" />;
      case 13:
        return <ComingSoon day="13" title="Kiss Day" />;
      case 14:
        return <ComingSoon day="14" title="Valentines Day" />;
      default:
        return <RoseDay />;
    }
  };

  return (
    <Layout currentDate={currentDate} setCurrentDate={setCurrentDate}>
      {renderContent()}
    </Layout>
  );
}

export default App;

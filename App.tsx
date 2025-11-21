import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import Countdown from './components/Countdown';
import { getAmoulianiTip } from './services/geminiService';

const App: React.FC = () => {
  // Target Date: June 14, 2026 at 10:00:00 AM
  const targetDate = new Date('2026-06-14T10:00:00');
  const [tip, setTip] = useState<string>("");
  const [loadingTip, setLoadingTip] = useState<boolean>(false);

  useEffect(() => {
    // Load initial AI tip
    handleLoadTip();
  }, []);

  const handleLoadTip = async () => {
    setLoadingTip(true);
    const newTip = await getAmoulianiTip();
    setTip(newTip);
    setLoadingTip(false);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex flex-col relative font-sans"
      style={{ 
        // Brighter, clearer Greek water image
        backgroundImage: "url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2572&auto=format&fit=crop')" 
      }}
    >
      {/* Light overlay to ensure text readability without killing the vibe */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 via-transparent to-blue-900/40 mix-blend-multiply" />
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col flex-grow overflow-y-auto">
        
        {/* Header */}
        <header className="w-full py-10 px-4 flex flex-col items-center justify-center text-center">
          <div className="mb-8 animate-fade-in-down">
            <h1 className="text-5xl sm:text-7xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] mb-3 tracking-tight uppercase">
              Амуляни 2026
            </h1>
            <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2 shadow-lg">
              <p className="text-white text-lg sm:text-xl font-bold drop-shadow-md">
                ⚓ Бюйлекови & Димови превземат острова ⚓
              </p>
            </div>
          </div>

          <div className="mb-4">
            <Countdown targetDate={targetDate} />
          </div>
        </header>

        {/* Main Content Grid */}
        <main className="flex-grow container mx-auto px-4 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Calendar (Takes 4 cols on large screens) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="sticky top-8">
               <Calendar />
            </div>
          </div>

          {/* Right Column: Info Cards (Takes 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6 order-1 lg:order-2">
            
            {/* Crew List Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Buyuklekovi - First Position */}
              <div className="bg-teal-500/90 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-teal-400 text-white">
                <h3 className="text-xl font-bold mb-3 border-b border-teal-400 pb-2 flex items-center gap-2">
                  🏖️ Отбор Бюйлекови
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-2"><span className="font-bold">Галя (капитан)</span></li>
                  <li className="flex items-center gap-2"><span className="font-bold">Пламски</span></li>
                  <li className="flex items-center gap-2 opacity-90">👶 Влади</li>
                  <li className="flex items-center gap-2 opacity-90">👶 Ива (Шефката)</li>
                </ul>
              </div>

              {/* Dimovi - Second Position */}
              <div className="bg-blue-600/90 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-blue-400 text-white">
                <h3 className="text-xl font-bold mb-3 border-b border-blue-400 pb-2 flex items-center gap-2">
                  🚤 Отбор Димови
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-2"><span className="font-bold">Росица (капитан)</span></li>
                  <li className="flex items-center gap-2"><span className="font-bold">Светльо</span></li>
                  <li className="flex items-center gap-2 opacity-90">👶 Деа</li>
                  <li className="flex items-center gap-2 opacity-90">👶 Кико</li>
                </ul>
              </div>

            </div>

            {/* Playful Notice for Buyuklekovi */}
            <div className="bg-yellow-100/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border-l-8 border-yellow-500 text-slate-800 flex items-start gap-3">
              <span className="text-2xl">🔔</span>
              <div>
                <h4 className="font-bold text-lg text-yellow-800 mb-1">Съобщение до Бюйлекови:</h4>
                <p className="text-sm sm:text-base leading-relaxed font-medium">
                  Внимание! Ива (Шефката) вече е одобрила бюджета за сладолед за 2026-та. 
                  Пламски и Галя (капитанът) да се подготвят психически и финансово! 🍦
                </p>
              </div>
            </div>

            {/* AI Inspiration */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                  <span className="text-purple-600">✨</span> 
                  AI Съвет за групата
                </h3>
                <button 
                  onClick={handleLoadTip}
                  disabled={loadingTip}
                  className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors font-bold uppercase tracking-wider"
                >
                  {loadingTip ? 'Мисли...' : 'Друг факт'}
                </button>
              </div>
              <p className="text-slate-600 italic text-center sm:text-left">
                "{loadingTip ? 'Зареждане на мъдрост...' : tip}"
              </p>
            </div>

            {/* Trip Details Mini Card */}
            <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-blue-500 rounded-lg">
                    📅
                 </div>
                 <div>
                    <div className="font-bold text-lg">14 - 21 Юни, 2026</div>
                    <div className="text-slate-300 text-sm">Старт: 10:00 сутринта</div>
                 </div>
              </div>
              <div className="text-right hidden sm:block">
                 <div className="font-bold">Остров Амуляни</div>
                 <div className="text-slate-400 text-xs">Гърция</div>
              </div>
            </div>

          </div>
        </main>
        
        <footer className="py-8 text-center text-white/90 text-sm bg-gradient-to-t from-blue-900/80 to-transparent">
          <p>&copy; 2026 Бюйлекови & Димови Турс. Всички права запазени (най-вече на жените).</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
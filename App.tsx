import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import Countdown from './components/Countdown';
import { getAmoulianiTip } from './services/geminiService';

const App: React.FC = () => {
  // Target Date: June 14, 2026 at 10:00:00 AM
  const targetDate = new Date('2026-06-14T10:00:00');
  const [tip, setTip] = useState<string>("");
  const [loadingTip, setLoadingTip] = useState<boolean>(false);
  const [showBirthday, setShowBirthday] = useState<boolean>(false);

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

  const toggleBirthday = () => {
    setShowBirthday(!showBirthday);
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

      {/* Birthday Modal Overlay */}
      {showBirthday && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={toggleBirthday}
        >
          {/* Confetti Containers (CSS based) */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute animate-[fall_4s_linear_infinite]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 20 + 10}px`
              }}
            >
              {['🎉', '🎊', '✨', '🎈', '🍰'][Math.floor(Math.random() * 5)]}
            </div>
          ))}

          <div 
            className="bg-white rounded-3xl p-8 sm:p-12 max-w-lg w-[90%] text-center relative overflow-hidden animate-[bounce-in_0.6s_cubic-bezier(0.68,-0.55,0.27,1.55)] shadow-[0_0_50px_rgba(255,255,255,0.5)]"
            onClick={(e) => e.stopPropagation()} // Don't close if clicking inside card
          >
            <button 
              onClick={toggleBirthday}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              ✕
            </button>
            
            <div className="mb-6 relative">
              {/* Animated Cake */}
              <div className="text-9xl animate-bounce drop-shadow-2xl transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                🎂
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 text-4xl animate-pulse">
                🕯️
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              Честит Рожден Ден, Галя!
            </h2>
            
            <p className="text-lg text-slate-600 font-medium mb-6">
              Нека този ден на Амуляни бъде изпълнен с коктейли, слънце и безкрайни усмивки! 
              <br/>
              <span className="text-sm opacity-75">(И никой да не я ядосва!)</span>
            </p>

            <button 
              onClick={toggleBirthday}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              🥳 Наздраве!
            </button>
          </div>
          
          {/* Custom Keyframes for this modal */}
          <style>{`
            @keyframes fall {
              0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
              100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
            }
            @keyframes bounce-in {
              0% { transform: scale(0.3); opacity: 0; }
              50% { transform: scale(1.05); opacity: 1; }
              70% { transform: scale(0.9); }
              100% { transform: scale(1); }
            }
          `}</style>
        </div>
      )}
      
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
            <div className="sticky top-8 w-full max-w-md">
               <Calendar onBirthdayClick={toggleBirthday} />
            </div>
          </div>

          {/* Right Column: Info Cards (Takes 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6 order-1 lg:order-2">
            
            {/* Crew List Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Buyuklekovi - First Position - Blue/Sky Theme */}
              <div className="bg-sky-600/90 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-sky-400 text-white">
                <h3 className="text-xl font-bold mb-3 border-b border-sky-400 pb-2 flex items-center gap-2">
                  🏖️ Отбор Бюйлекови
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex flex-col leading-tight">
                    <span 
                      className="font-bold cursor-pointer hover:text-yellow-200 transition-colors"
                      onClick={toggleBirthday}
                      title="Кликни за изненада!"
                    >
                      Галя (Капитан & РД 🎂)
                    </span>
                    <span className="text-sm opacity-80 italic">Грижи се за доброто настроение на Шефката</span>
                  </li>
                  <li className="flex flex-col leading-tight">
                    <span className="font-bold">Пламски</span>
                    <span className="text-sm opacity-80 italic">Логистика, надуване на дюшеци и игра с Бълхарко-Принца на Амуляни</span>
                  </li>
                  <li className="flex flex-col leading-tight">
                    <span>👶 Влади</span>
                    <span className="text-sm opacity-80 italic">Главен гмуркач</span>
                  </li>
                  <li className="flex flex-col leading-tight">
                    <span>👶 Ива (Шефката)</span>
                    <span className="text-sm opacity-80 italic">Контрол на качеството</span>
                  </li>
                </ul>
              </div>

              {/* Dimovi - Second Position - Teal Theme */}
              <div className="bg-teal-600/90 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-teal-400 text-white">
                <h3 className="text-xl font-bold mb-3 border-b border-teal-400 pb-2 flex items-center gap-2">
                  🚤 Отбор Димови
                </h3>
                <ul className="space-y-3 text-lg">
                   <li className="flex flex-col leading-tight">
                    <span className="font-bold">Росица (Капитан)</span>
                    <span className="text-sm opacity-80 italic">Отговорник коктейли</span>
                  </li>
                  <li className="flex flex-col leading-tight">
                    <span className="font-bold">Светльо</span>
                    <span className="text-sm opacity-80 italic">Отговорник Фагри, Калмари, Октоподи</span>
                  </li>
                  <li className="flex flex-col leading-tight">
                    <span>👶 Деа</span>
                    <span className="text-sm opacity-80 italic">Главна русалка</span>
                  </li>
                  <li className="flex flex-col leading-tight">
                    <span>👶 Кико</span>
                    <span className="text-sm opacity-80 italic">Ловец на акули</span>
                  </li>
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
                  Пламски и Галя да слушат внимателно!
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
                 <div className="p-2 bg-sky-500 rounded-lg">
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
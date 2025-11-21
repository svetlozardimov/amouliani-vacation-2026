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
        backgroundImage: "url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2572&auto=format&fit=crop')" 
      }}
    >
      {/* Light overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 via-transparent to-blue-900/40 mix-blend-multiply pointer-events-none" />

      {/* Birthday Modal Overlay */}
      {showBirthday && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={toggleBirthday}
        >
          {/* Confetti */}
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
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={toggleBirthday}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              ✕
            </button>
            
            <div className="mb-6 relative">
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
          
          {/* Left Column: Calendar */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="sticky top-8 w-full max-w-md">
               <Calendar onBirthdayClick={toggleBirthday} />
            </div>
          </div>

          {/* Right Column: Info Cards */}
          <div className="lg:col-span-8 flex flex-col gap-6 order-1 lg:order-2">
            
            {/* Crew List Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Buyuklekovi - Sky Theme */}
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

              {/* Dimovi - Teal Theme */}
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

            {/* Playful Notice */}
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

            {/* Trip Details */}
            <div className="bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-700 text-white">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-600 pb-2">
                   <span className="text-2xl">🗺️</span>
                   <h3 className="font-bold text-lg">Програма на пътуването</h3>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl">
                   <div className="w-10 h-10 bg-amber-500 flex items-center justify-center rounded-full font-bold text-white shadow-md shrink-0">
                     13
                   </div>
                   <div className="flex-grow">
                      <div className="font-bold text-amber-300">Нощувка в Петрич</div>
                      <div className="text-xs text-slate-300">Подгряваща вечер</div>
                   </div>
                </div>

                <div className="flex items-center gap-4 bg-gradient-to-r from-sky-900/50 to-blue-900/50 p-3 rounded-xl border border-sky-500/30">
                   <div className="w-10 h-10 bg-sky-500 flex items-center justify-center rounded-full font-bold text-white shadow-md shrink-0">
                     14
                   </div>
                   <div className="flex-grow">
                      <div className="font-bold text-sky-300">Амуляни, Гърция</div>
                      <div className="text-xs text-slate-300">Начало на приключението</div>
                   </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl">
                   <div className="w-10 h-10 bg-slate-700 flex items-center justify-center rounded-full font-bold text-white shadow-md shrink-0">
                     21
                   </div>
                   <div className="flex-grow">
                      <div className="font-bold text-slate-300">Край на почивката</div>
                      <div className="text-xs text-slate-400">Обратно към реалността</div>
                   </div>
                </div>
              </div>
            </div>

            {/* AI Tip Section */}
            <div className="bg-indigo-900/60 backdrop-blur-md p-6 rounded-2xl border border-indigo-500/30 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-500 p-3 rounded-full shadow-lg">
                  <span className="text-2xl">✨</span>
                </div>
                <div className="flex-grow">
                   <h3 className="text-lg font-bold text-indigo-200 mb-2">Съвет от AI за Амуляни</h3>
                   {loadingTip ? (
                     <div className="animate-pulse flex space-x-4">
                       <div className="flex-1 space-y-2 py-1">
                         <div className="h-4 bg-indigo-400/30 rounded w-3/4"></div>
                         <div className="h-4 bg-indigo-400/30 rounded"></div>
                       </div>
                     </div>
                   ) : (
                     <p className="text-white/90 italic leading-relaxed">
                       "{tip}"
                     </p>
                   )}
                   <button 
                    onClick={handleLoadTip}
                    className="mt-4 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-full transition-colors"
                   >
                     🔄 Нов съвет
                   </button>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="bg-black/30 backdrop-blur-sm py-6 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} Бюйлекови & Димови | Обратно броене до рая</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
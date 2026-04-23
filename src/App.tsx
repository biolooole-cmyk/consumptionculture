/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  GraduationCap, 
  Leaf, 
  Menu, 
  X,
  ArrowRight,
  Sparkles,
  Info,
  TrendingUp,
  Award
} from 'lucide-react';
import { COURSE_DATA, Lesson } from './data/modules';
import { ConceptCard } from './components/ConceptCard';
import { TaskItem } from './components/TaskItem';

export default function App() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const currentLesson = COURSE_DATA[currentLessonIndex];
  const progress = ((currentLessonIndex + 1) / COURSE_DATA.length) * 100;

  const handleAnswerChange = (taskId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [taskId]: value }));
  };

  const nextLesson = () => {
    if (currentLessonIndex < COURSE_DATA.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowSummary(true);
    }
  };

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const jumpToLesson = (index: number) => {
    setCurrentLessonIndex(index);
    setIsSidebarOpen(false);
    setShowSummary(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-forest font-sans selection:bg-brand-olive/20 selection:text-brand-forest">
      {/* Navigation Rail / Header */}
      <header className="sticky top-0 z-40 bg-brand-cream/80 backdrop-blur-xl border-b border-brand-forest/5 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-brand-olive/5 rounded-full lg:hidden transition-colors"
          >
            <Menu className="w-6 h-6 text-brand-forest" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-brand-olive p-2.5 rounded-2xl text-brand-cream shadow-lg shadow-brand-olive/20">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-brand-forest hidden sm:block text-xl leading-none">Свідоме Споживання</h1>
              <p className="text-[9px] text-brand-forest/40 uppercase tracking-[0.2em] font-black hidden sm:block mt-1">Освітня платформа</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex flex-col items-end gap-1.5">
            <div className="flex justify-between w-56 text-[9px] font-black text-brand-forest/40 uppercase tracking-[0.2em]">
              <span>Твій прогрес</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-56 h-1.5 bg-brand-forest/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-brand-olive rounded-full"
              />
            </div>
          </div>
          <button className="organic-button !py-3 !px-6 flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Мій рейтинг</span>
          </button>
        </div>
      </header>

      <div className="flex max-w-[1600px] mx-auto min-h-[calc(100vh-84px)]">
        {/* Enhanced Sidebar */}
        <aside className="hidden lg:flex flex-col w-80 p-10 border-r border-brand-forest/5 gap-10 h-[calc(100vh-84px)] sticky top-[84px]">
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase font-black text-brand-forest/30 tracking-[0.3em] pl-2">Навчальна програма</h4>
            <nav className="flex flex-col gap-2">
              {COURSE_DATA.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => jumpToLesson(idx)}
                  className={`flex items-center gap-4 p-4 rounded-3xl transition-all text-left relative group ${
                    idx === currentLessonIndex 
                      ? 'bg-white shadow-xl shadow-brand-forest/5 text-brand-forest translate-x-1' 
                      : 'text-brand-forest/40 hover:bg-white/50 hover:text-brand-forest'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black transition-all ${
                    idx === currentLessonIndex ? 'bg-brand-olive text-brand-cream' : 'bg-brand-forest/5 text-brand-forest/20'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="text-xs font-bold leading-tight flex-1">
                    {lesson.title}
                  </span>
                  {idx === currentLessonIndex && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute -left-1 w-1.5 h-6 bg-brand-olive rounded-full"
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto bg-brand-forest text-brand-cream p-8 rounded-[2rem] relative overflow-hidden group shadow-2xl">
            <div className="relative z-10 space-y-4">
              <div className="w-10 h-10 bg-brand-cream/10 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-olive" />
              </div>
              <p className="text-[10px] uppercase font-black opacity-40 tracking-[0.2em]">Статус здобувача</p>
              <p className="text-sm font-serif italic text-brand-cream/90">"Початківець у світі свідомих рішень"</p>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-24 h-24" />
            </div>
          </div>
        </aside>

        <main className="flex-1 px-6 md:px-16 py-16">
          <AnimatePresence mode="wait">
            {!showSummary ? (
              <motion.div
                key={currentLesson.id}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-16"
              >
                {/* Modern Hero Section */}
                <section className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <span className="pill-label">Модуль {currentLessonIndex + 1}</span>
                      <span className="pill-label bg-brand-forest text-brand-cream">Складні питання</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-serif font-black text-brand-forest leading-[1.1] tracking-tighter">
                      {currentLesson.title}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 organic-card p-10 md:p-14 bg-white/70 backdrop-blur-md">
                      <div className="flex items-center gap-3 text-brand-olive font-black text-[10px] uppercase tracking-[0.3em] mb-10 pb-4 border-b border-brand-forest/5">
                        <BookOpen className="w-4 h-4" />
                        <h3>Концептуальна теорія</h3>
                      </div>
                      <div className="space-y-8">
                        {currentLesson.theory.map((p, idx) => (
                          <p key={idx} className="text-brand-forest/80 leading-relaxed text-lg md:text-xl font-medium">
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="lg:col-span-4 space-y-4">
                      <h3 className="text-[10px] font-black uppercase text-brand-forest/30 tracking-[0.3em] pl-2">Глосарій модуля</h3>
                      {currentLesson.concepts.map((concept, idx) => (
                        <ConceptCard key={idx} concept={concept} />
                      ))}
                    </div>
                  </div>
                </section>

                {/* Practical Workspace */}
                <section className="space-y-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-brand-forest/5">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-serif font-bold text-brand-forest">Практичний воркшоп</h3>
                      <p className="text-xs text-brand-forest/50 font-medium">Застосуй отримані знання на практиці через аналіз та вибір.</p>
                    </div>
                    <div className="bg-brand-forest/5 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-brand-forest/40">
                      Майстер-блок {currentLessonIndex + 1}.{currentLesson.tasks.length}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {currentLesson.tasks.map((task) => (
                      <TaskItem 
                        key={task.id}
                        {...task}
                        value={answers[task.id] || (task.type === 'table' || task.type === 'comparison' ? [] : '')}
                        onChange={(id, val) => handleAnswerChange(id, val)}
                      />
                    ))}
                  </div>
                </section>

                {/* Neo-Navigation */}
                <div className="flex items-center justify-between pt-16 mt-16 border-t border-brand-forest/5">
                  <button
                    onClick={prevLesson}
                    disabled={currentLessonIndex === 0}
                    className={`flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all group ${
                      currentLessonIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-brand-forest/40 hover:text-brand-forest'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full border border-brand-forest/10 flex items-center justify-center group-hover:bg-white transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </div>
                    <span>Назад</span>
                  </button>
                  
                  <div className="hidden sm:flex gap-3">
                    {COURSE_DATA.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentLessonIndex ? 'w-8 bg-brand-olive' : 'bg-brand-forest/10'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextLesson}
                    className="organic-button flex items-center gap-4 group"
                  >
                    <span>{currentLessonIndex === COURSE_DATA.length - 1 ? 'Завершити шлях' : 'Продовжити'}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto space-y-16 py-12"
              >
                <div className="text-center space-y-10">
                  <div className="inline-flex p-16 organic-card border-brand-olive/10 rounded-full relative overflow-hidden bg-white shadow-2xl">
                    <Award className="w-24 h-24 text-brand-olive relative z-10" />
                    <motion.div 
                      className="absolute inset-0 bg-brand-olive/5"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-6xl md:text-8xl font-serif font-black text-brand-forest tracking-tighter leading-tight">Шлях <br/>пройдено.</h2>
                    <p className="text-xl md:text-2xl text-brand-forest/60 max-w-2xl mx-auto font-medium leading-relaxed">
                      Це не кінець, а лише початок твоєї усвідомленої подорожі. Світ змінюється завдяки твоїм щоденним рішенням.
                    </p>
                  </div>
                </div>
                
                <div className="organic-card p-12 md:p-20 bg-brand-forest text-brand-cream space-y-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-brand-olive/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                  <div className="space-y-4 relative z-10">
                    <h3 className="text-3xl font-serif font-bold tracking-tight">Сертифікація знань</h3>
                    <p className="text-brand-cream/60 leading-relaxed text-lg max-w-xl">
                      Твій прогрес та відповіді зафіксовані. Ти готовий денонсувати імпульсивні покупки та впроваджувати сталі звички у своїй громаді.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                     <button className="bg-brand-cream text-brand-forest px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:shadow-2xl transition-all active:scale-95">
                       Завантажити звіт аналітики
                     </button>
                     <button className="bg-transparent border-2 border-brand-cream/30 text-brand-cream px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
                       Маніфест споживача
                     </button>
                  </div>
                </div>

                <div className="text-center pt-8">
                  <button 
                    onClick={() => jumpToLesson(0)}
                    className="text-brand-forest/30 font-black uppercase tracking-[0.3em] text-[10px] hover:text-brand-olive transition-colors"
                  >
                    Повернутися до витоків
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <footer className="max-w-[1600px] mx-auto px-10 py-12 flex flex-col md:flex-row justify-between items-center text-[9px] font-black text-brand-forest/30 uppercase tracking-[0.3em] gap-8 bg-brand-forest/[0.02]">
        <div className="flex items-center gap-4">
          <Leaf className="w-4 h-4 opacity-50" />
          <span>Свідоме Споживання 2026 | Для здобувачів освіти</span>
        </div>
        <div className="flex gap-12 font-black">
          <span className="hover:text-brand-olive transition-colors cursor-pointer">Методологія</span>
          <span className="hover:text-brand-olive transition-colors cursor-pointer">Ресурси Громади</span>
          <span className="hover:text-brand-olive transition-colors cursor-pointer">Допомога</span>
        </div>
      </footer>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-forest/40 backdrop-blur-md z-50 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-80 bg-brand-cream z-[60] p-10 shadow-2xl flex flex-col gap-10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Leaf className="w-6 h-6 text-brand-olive" />
                  <span className="font-serif font-black text-xl text-brand-forest">Меню</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-brand-forest/5 rounded-full transition-colors">
                  <X className="w-6 h-6 text-brand-forest/40" />
                </button>
              </div>

              <nav className="flex flex-col gap-3">
                {COURSE_DATA.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => jumpToLesson(idx)}
                    className={`flex items-center gap-5 p-5 rounded-[2rem] transition-all text-left ${
                      idx === currentLessonIndex 
                        ? 'bg-brand-olive text-brand-cream shadow-xl shadow-brand-olive/30' 
                        : 'hover:bg-brand-forest/5 text-brand-forest/40'
                    }`}
                  >
                    <lesson.icon className={`w-5 h-5 ${idx === currentLessonIndex ? 'text-brand-cream' : 'text-brand-forest/20'}`} />
                    <span className="font-bold text-xs uppercase tracking-widest">{lesson.title}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-auto bg-brand-forest text-brand-cream p-10 rounded-[2.5rem] relative overflow-hidden">
                <p className="text-[9px] uppercase font-black opacity-30 tracking-[0.3em] mb-4">Натхнення модуля</p>
                <p className="text-base font-serif italic leading-relaxed">
                  "Твої цінності — це твій компас у світі речей."
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

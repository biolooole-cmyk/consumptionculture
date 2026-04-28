import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, X, Sparkles } from 'lucide-react';

interface TaskProps {
  question: string;
  placeholder?: string;
  type: string;
  options?: string[];
  matchOptions?: string[];
  id: string;
  value: any;
  onChange: (id: string, value: any) => void;
  correctAnswer?: string | string[];
  explanation?: string;
}

export const TaskItem: React.FC<TaskProps> = ({ question, type, options, matchOptions, id, value, onChange, correctAnswer, explanation }) => {
  const [showFeedback, setShowFeedback] = React.useState(false);

  const isCorrect = React.useMemo(() => {
    if (!correctAnswer) return null;
    if (type === 'choice') return value === correctAnswer;
    if (type === 'match' && Array.isArray(value) && Array.isArray(correctAnswer)) {
      return value.every((v, i) => v === correctAnswer[i]);
    }
    return null;
  }, [value, correctAnswer, type]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`organic-card p-8 border-2 transition-all ${
        showFeedback 
          ? isCorrect 
            ? 'border-emerald-500/50 bg-emerald-50/30' 
            : 'border-rose-500/50 bg-rose-50/30'
          : 'border-brand-forest/5'
      }`}
    >
      <div className="flex justify-between items-start mb-6 gap-4">
        <h5 className="font-serif text-xl font-bold text-brand-forest leading-tight">{question}</h5>
        {showFeedback && (
          <div className={`p-2 rounded-full ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
            {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </div>
        )}
      </div>
      
      {type === 'choice' && options ? (
        <div className="grid grid-cols-1 gap-3">
          {options.map((opt, idx) => (
            <button
              key={idx}
              disabled={showFeedback}
              onClick={() => onChange(id, opt)}
              className={`text-left p-5 rounded-2xl text-sm font-medium transition-all border ${
                value === opt 
                  ? showFeedback
                    ? opt === correctAnswer ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-rose-500 text-white border-rose-600'
                  : 'bg-brand-olive text-brand-cream border-brand-olive shadow-lg shadow-brand-olive/20' 
                : showFeedback && opt === correctAnswer
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                  : 'bg-brand-cream/50 text-brand-forest border-brand-forest/5 hover:bg-white hover:border-brand-olive/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  value === opt ? 'border-current' : 'border-brand-forest/20'
                }`}>
                  {value === opt && <div className="w-3 h-3 bg-current rounded-full" />}
                </div>
                {opt}
              </div>
            </button>
          ))}
        </div>
      ) : type === 'match' && options && matchOptions ? (
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr,1.5fr] gap-4 mb-2">
            <div className="text-[10px] font-black text-brand-forest/40 uppercase tracking-[0.2em] pl-4">Поняття</div>
            <div className="text-[10px] font-black text-brand-forest/40 uppercase tracking-[0.2em] pl-4">Відповідність</div>
          </div>
          {options.map((opt, idx) => (
            <div key={idx} className="grid grid-cols-[1fr,1.5fr] gap-4 items-center">
              <div className="bg-brand-cream/30 p-4 rounded-xl border border-brand-forest/5 text-xs font-bold text-brand-forest">
                {opt}
              </div>
              <select
                disabled={showFeedback}
                className={`organic-input !py-3 !px-4 text-xs appearance-none cursor-pointer ${
                  showFeedback 
                    ? value[idx] === (Array.isArray(correctAnswer) ? correctAnswer[idx] : '') 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-rose-500 bg-rose-50'
                    : ''
                }`}
                value={value[idx] || ''}
                onChange={(e) => {
                  const newValue = Array.isArray(value) ? [...value] : new Array(options.length).fill('');
                  newValue[idx] = e.target.value;
                  onChange(id, newValue);
                }}
              >
                <option value="">Оберіть варіант...</option>
                {matchOptions.map((mOpt, midx) => (
                  <option key={midx} value={mOpt}>{mOpt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ) : (type === 'table' || type === 'comparison') && options ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-[10px] font-black text-brand-forest/40 uppercase tracking-[0.2em] pl-4">Об’єкт</div>
            <div className="text-[10px] font-black text-brand-forest/40 uppercase tracking-[0.2em] pl-4">Аналіз / Дія</div>
          </div>
          {options.map((opt, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center bg-brand-cream/30 p-2 rounded-2xl border border-brand-forest/5">
              <div className="text-xs font-bold text-brand-forest pl-4 italic">
                {opt.split(' vs ')[0]}
              </div>
              <input
                disabled={showFeedback}
                className="organic-input !py-3 !px-4 text-xs"
                placeholder={opt.split(' vs ')[1]}
                value={Array.isArray(value) ? value[idx] || '' : ''}
                onChange={(e) => {
                  const newValue = Array.isArray(value) ? [...value] : new Array(options.length).fill('');
                  newValue[idx] = e.target.value;
                  onChange(id, newValue);
                }}
              />
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-4">
        {!showFeedback ? (
          <button
            onClick={() => setShowFeedback(true)}
            disabled={!value || (Array.isArray(value) && value.length < (options?.length || 0))}
            className="organic-button w-full flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Перевірити відповідь</span>
          </button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-6 border-t border-brand-forest/10 space-y-4"
          >
            <div className="flex items-center gap-2 text-brand-olive font-black text-[10px] uppercase tracking-[0.2em]">
              <Sparkles className="w-4 h-4" />
              <span>Пояснення та висновок</span>
            </div>
            <p className="text-sm text-brand-forest/70 leading-relaxed font-medium bg-brand-olive/5 p-4 rounded-xl italic">
              {explanation || "Чудова робота! Продовжуй досліджувати."}
            </p>
            <button
              onClick={() => {
                setShowFeedback(false);
                if (type === 'choice') onChange(id, '');
                else onChange(id, []);
              }}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-forest/30 hover:text-brand-forest transition-colors underline underline-offset-4"
            >
              Спробувати ще раз
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

import React from 'react';
import { motion } from 'motion/react';

interface TaskProps {
  question: string;
  placeholder?: string;
  type: string;
  options?: string[];
  id: string;
  value: string | string[];
  onChange: (id: string, value: string | string[]) => void;
}

export const TaskItem: React.FC<TaskProps> = ({ question, type, options, id, value, onChange }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="organic-card p-8 border-brand-forest/5"
    >
      <h5 className="font-serif text-xl font-bold text-brand-forest mb-6">{question}</h5>
      
      {type === 'choice' && options ? (
        <div className="grid grid-cols-1 gap-3">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => onChange(id, opt)}
              className={`text-left p-5 rounded-2xl text-sm font-medium transition-all border ${
                value === opt 
                  ? 'bg-brand-olive text-brand-cream border-brand-olive shadow-lg shadow-brand-olive/20' 
                  : 'bg-brand-cream/50 text-brand-forest border-brand-forest/5 hover:bg-white hover:border-brand-olive/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  value === opt ? 'border-brand-cream' : 'border-brand-forest/20'
                }`}>
                  {value === opt && <div className="w-3 h-3 bg-brand-cream rounded-full" />}
                </div>
                {opt}
              </div>
            </button>
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
    </motion.div>
  );
};

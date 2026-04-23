import React from 'react';

interface Concept {
  term: string;
  definition: string;
}

interface ConceptCardProps {
  concept: Concept;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({ concept }) => {
  return (
    <div className="organic-card p-6 group hover:border-brand-olive/30">
      <div className="flex items-start gap-4">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-olive mt-2 group-hover:scale-150 transition-transform" />
        <div>
          <h4 className="font-serif text-lg font-bold text-brand-forest mb-1 leading-tight">{concept.term}</h4>
          <p className="text-sm text-brand-forest/70 leading-relaxed font-sans">{concept.definition}</p>
        </div>
      </div>
    </div>
  );
};

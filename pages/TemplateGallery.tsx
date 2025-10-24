
import React, { useState } from 'react';
import { MOCK_TEMPLATES } from '../constants';
import type { Template } from '../types';

const TemplateCard: React.FC<{ template: Template }> = ({ template }) => (
    <div className="group relative bg-light-surface dark:bg-dark-surface rounded-2xl shadow-soft overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <img src={template.imageUrl} alt={template.title} className="w-full h-48 object-cover"/>
        <div className="p-5">
            <h4 className="font-semibold text-light-text dark:text-dark-text">{template.title}</h4>
            <p className="text-sm text-light-subtle dark:text-dark-subtle mt-1">{template.description}</p>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <button className="bg-white text-black font-medium py-2 px-4 rounded-lg">Use Template</button>
            <button className="bg-white/20 text-white backdrop-blur-sm font-medium py-2 px-4 rounded-lg">Preview</button>
        </div>
    </div>
);

const TemplateGallery: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Lead Gen', 'Feedback', 'HR', 'Events'];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-center">Explore Templates</h2>
        <p className="text-center text-light-subtle dark:text-dark-subtle mt-2">Pick a template to get started, or build your own from scratch.</p>
      </div>
      
      <div className="flex justify-center items-center gap-2 bg-light-surface dark:bg-dark-surface p-1.5 rounded-xl max-w-md mx-auto">
        {filters.map(filter => (
            <button 
                key={filter} 
                onClick={() => setActiveFilter(filter)}
                className={`w-full py-2 px-4 text-sm font-semibold rounded-lg transition-colors ${
                    activeFilter === filter ? 'bg-primary text-white shadow' : 'text-light-subtle dark:text-dark-subtle hover:text-light-text dark:hover:text-dark-text'
                }`}
            >
                {filter}
            </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_TEMPLATES
            .filter(t => activeFilter === 'All' || t.category === activeFilter)
            .map(template => <TemplateCard key={template.id} template={template} />)
        }
      </div>
    </div>
  );
};

export default TemplateGallery;

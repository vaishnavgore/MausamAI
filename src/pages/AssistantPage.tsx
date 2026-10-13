import React from 'react';
import { AskMausamAI } from '@/components/assistant/AskMausamAI';

export const AssistantPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <AskMausamAI />
    </div>
  );
};

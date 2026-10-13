import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  ShieldCheck 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { aiService, AIMessage } from '@/services/aiService';

export const AskMausamAI: React.FC = () => {
  const { profile, weather, incidents, location } = useApp();
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'm-init',
      sender: 'assistant',
      text: `Hello! I am **MausamAI Assistant**, your weather and civic intelligence co-pilot for **${location.city}**.\n\nI synthesize active Doppler radar data, air quality telemetry, and citizen road obstacle reports for your **${profile.toUpperCase()}** profile. What would you like to verify?`,
      timestamp: 'Just now',
      suggestedPrompts: [
        'What should I know before travelling today?',
        'Is outdoor exercise suitable this evening?',
        'What are the route risks toward Hinjawadi?',
        'Show agricultural irrigation advisory',
      ],
      sourceCitations: [
        'IMD Pune Automated Weather Station',
        'MausamAI Citizen Corroboration Layer',
      ],
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isThinking) return;

    const userMsg: AIMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      if (!weather) return;

      const response = aiService.generateAssistantResponse(query, {
        profile,
        weather,
        incidents,
        locationName: location.city,
      });

      const assistantMsg: AIMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        suggestedPrompts: response.suggestedPrompts,
        sourceCitations: response.sourceCitations,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsThinking(false);
    }, 450);
  };

  return (
    <div className="card-clean border border-slate-200 dark:border-slate-800 flex flex-col h-[640px] overflow-hidden shadow-sm bg-white dark:bg-[#111827]">
      
      {/* Assistant Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center border border-blue-200 dark:border-blue-900/60 shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                Ask MausamAI Assistant
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
                Ground-Truth Calibrated
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Ground Stations & Civic Reports • Active Profile: {profile.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Multi-Signal Verification Guardrails</span>
        </div>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40 dark:bg-[#0b0f19]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200 dark:border-blue-900/60">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-xl p-4 text-xs space-y-2.5 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm'
              }`}
            >
              {/* Message text */}
              <div className="leading-relaxed whitespace-pre-line">
                {msg.text}
              </div>

              {/* Citations */}
              {msg.sourceCitations && msg.sourceCitations.length > 0 && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700/80 text-[10px] text-slate-500 dark:text-slate-400 space-y-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block">Verified Telemetry Sources:</span>
                  {msg.sourceCitations.map((cite, i) => (
                    <p key={i} className="flex items-center gap-1">
                      <span>•</span>
                      <span>{cite}</span>
                    </p>
                  ))}
                </div>
              )}

              {/* Prompt Suggestions */}
              {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {msg.suggestedPrompts.map((promptText, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(promptText)}
                      className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 text-[11px] font-medium border border-slate-200 dark:border-slate-700 transition"
                    >
                      {promptText}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 bg-white dark:bg-[#111827] p-3 rounded-xl w-fit border border-slate-200 dark:border-slate-800 shadow-xs">
            <Sparkles className="w-4 h-4 animate-spin text-blue-500" />
            <span>Fusing Doppler radar echoes and civic telemetry...</span>
          </div>
        )}
      </div>

      {/* Query Input Box */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about commute hazards, running hours, spraying schedules, or rain windows..."
            className="flex-1 px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isThinking}
            className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 text-center">
          MausamAI grounds answers on real-time data. Safety-critical journeys should prioritize official police & IMD advisories.
        </p>
      </div>

    </div>
  );
};

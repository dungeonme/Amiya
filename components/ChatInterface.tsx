import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, RefreshCw, ArrowRight } from 'lucide-react';
import { Message, AssessmentResult } from '../types';
import { sendMessageToGemini, generateFinalReport } from '../services/geminiService';

interface ChatInterfaceProps {
  onAssessmentComplete: (result: AssessmentResult) => void;
  moveToResults: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onAssessmentComplete, moveToResults }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Namaste! I am Disha. I am here to help you find the best career path tailored just for you. To start, could you tell me which class/grade you are in and what subjects you enjoy the most?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', text: inputText }];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(inputText);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Something went wrong. Please check your internet connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    try {
      // Concatenate history for context
      const history = messages.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n');
      const result = await generateFinalReport(history);
      onAssessmentComplete(result);
      moveToResults();
    } catch (error) {
      alert("Could not generate report. Please try chatting a bit more first.");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex max-w-[85%] md:max-w-[70%] p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-slate-900 text-white rounded-br-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
              }`}
            >
              <div className="mr-3 mt-1 min-w-[20px]">
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} className="text-orange-500" />}
              </div>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-200 shadow-sm flex items-center gap-2">
                <Bot size={18} className="text-orange-500" />
                <span className="animate-pulse text-slate-400 text-sm">Thinking...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          
          {messages.length > 4 && !isGeneratingReport && (
            <button 
              onClick={handleGenerateReport}
              className="self-center bg-orange-100 hover:bg-orange-200 text-orange-800 text-sm font-medium py-2 px-4 rounded-full flex items-center gap-2 transition-colors mb-2"
            >
              <RefreshCw size={14} />
              Generate My Career Roadmap
            </button>
          )}

          {isGeneratingReport ? (
             <div className="w-full bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-600"></div>
                <span className="text-orange-800 font-medium">Analyzing your profile and finding schemes...</span>
             </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your answer here..."
                className="flex-1 border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputText.trim()}
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-4 md:px-6 py-3 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

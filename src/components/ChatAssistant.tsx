import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Mic, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatAssistant: React.FC = () => {
  const { translate } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: translate('welcomeMessage'),
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    translate('quickQuestion1'),
    translate('quickQuestion2'),
    translate('quickQuestion3'),
    translate('quickQuestion4')
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string = inputText) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: generateBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('evacuation') || lowerMessage.includes('evacuate')) {
      return translate('botEvacuationResponse');
    } else if (lowerMessage.includes('shelter') || lowerMessage.includes('safe')) {
      return translate('botShelterResponse');
    } else if (lowerMessage.includes('medical') || lowerMessage.includes('hospital')) {
      return translate('botMedicalResponse');
    } else if (lowerMessage.includes('supply') || lowerMessage.includes('aid')) {
      return translate('botSupplyResponse');
    } else {
      return translate('botDefaultResponse');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="glass rounded-xl shadow-2xl p-6 transition-all-smooth hover:shadow-neon-cyan/20">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <MessageCircle className="w-5 h-5 mr-2 text-neon-cyan" />
        {translate('aiAssistant')}
      </h3>

      {/* Chat Messages */}
      <div className="h-64 overflow-y-auto mb-4 p-3 glass-dark rounded-lg border border-white/10">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 mb-4 ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.sender === 'user' 
                ? 'bg-neon-blue text-white' 
                : 'bg-neon-cyan/20 text-neon-cyan'
            }`}>
              {message.sender === 'user' ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>
            
            <div className={`flex-1 max-w-xs ${
              message.sender === 'user' ? 'text-right' : ''
            }`}>
              <div className={`inline-block px-4 py-2 rounded-lg text-sm ${
                message.sender === 'user'
                  ? 'bg-neon-blue text-white'
                  : 'glass text-white border border-white/20'
              }`}>
                {message.text}
              </div>
              <div className={`text-xs text-gray-500 mt-1 ${
                message.sender === 'user' ? 'text-right' : ''
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0 w-8 h-8 bg-neon-cyan/20 text-neon-cyan rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="glass border border-white/20 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="mb-4">
        <p className="text-xs text-gray-300 mb-2">{translate('quickQuestions')}:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(question)}
              className="px-3 py-1 glass-dark hover:bg-white/20 text-gray-300 text-xs rounded-full transition-colors border border-white/10"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={translate('typeMessage')}
            className="w-full px-4 py-2 pr-12 glass-dark border border-white/20 rounded-lg resize-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent text-white placeholder-gray-400"
            rows={1}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors">
            <Mic className="w-4 h-4" />
          </button>
        </div>
        
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim()}
          className="p-2 bg-neon-cyan text-white rounded-lg hover:bg-neon-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all-smooth neon-cyan"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
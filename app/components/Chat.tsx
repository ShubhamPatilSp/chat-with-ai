'use client';

import { useState, useEffect, useRef, FormEvent, KeyboardEvent, MouseEvent } from 'react';

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp?: string;
  error?: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on component mount and add global click handler
  useEffect(() => {
    inputRef.current?.focus();

    // Global click handler to ensure input focus
    const handleGlobalClick = (e: MouseEvent) => {
      const isClickInsideChat = e.currentTarget && 
        (e.currentTarget as HTMLElement).contains(e.target as Node);
      
      if (isClickInsideChat) {
        inputRef.current?.focus();
      }
    };

    // Add event listener to document
    document.addEventListener('click', handleGlobalClick as EventListener);

    // Cleanup listener
    return () => {
      document.removeEventListener('click', handleGlobalClick as EventListener);
    };
  }, []);

  const sendMessage = async () => {
    const userMessage = input.trim();
    
    // Prevent sending empty or loading messages
    if (!userMessage || isLoading) return;

    setInput('');
    setIsLoading(true);
    setError(null);

    // Add user message to chat immediately
    const timestamp = new Date().toISOString();
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      
      // Add bot response to chat
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: data.success ? data.message : data.error,
        timestamp: new Date().toISOString(),
        error: !data.success
      }]);

    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: new Date().toISOString(),
        error: true
      }]);
    } finally {
      setIsLoading(false);
      // Refocus input after sending
      inputRef.current?.focus();
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  // Handle keyboard enter key
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div 
      className="flex flex-col h-[80vh] max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
          <button 
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <span className="sr-only">Dismiss</span>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </button>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : message.error
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              {message.timestamp && (
                <span className="text-xs opacity-75 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        className="p-4 border-t"
      >
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <div 
            className="relative w-[80px]" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isLoading && input.trim()) {
                sendMessage();
              }
            }}
          >
            <button
              ref={sendButtonRef}
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute inset-0 w-full h-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center gap-2 justify-center">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

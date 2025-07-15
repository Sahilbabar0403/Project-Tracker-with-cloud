import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { AiOutlineRobot } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { BsChatDots } from 'react-icons/bs';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.status) { // FIXED: Use "status" instead of "success"
        setMessages(prev => [...prev, {
          text: data.text, // FIXED: Use "data.text" instead of "data.response"
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
        }]);
      } else {
        throw new Error(data.message || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <BsChatDots className="text-2xl" />
      </button>

      {/* Chat Window */}
      <div className={`fixed top-[80px] right-8 w-96 h-[calc(100vh-120px)] bg-white rounded-lg shadow-xl flex flex-col transform transition-all duration-300 z-40 ${isOpen ? 'translate-x-0 scale-100' : 'translate-x-full scale-0'}`}>
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AiOutlineRobot className="text-2xl" />
            <h2 className="font-semibold">Developer Assistant</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-blue-700 p-1 rounded transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start gap-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <FaUser className="text-white text-sm" />
                  ) : (
                    <AiOutlineRobot className="text-white text-lg" />
                  )}
                </div>
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about development..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiSend className="text-xl" />
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBot;

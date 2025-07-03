
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isSystem?: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'System',
      content: 'Alice Johnson joined the meeting',
      timestamp: '10:30 AM',
      isSystem: true
    },
    {
      id: '2',
      sender: 'Alice Johnson',
      content: 'Hello everyone! Ready to start the presentation?',
      timestamp: '10:31 AM'
    },
    {
      id: '3',
      sender: 'Bob Smith',
      content: 'Yes, let\'s begin. I have the slides ready.',
      timestamp: '10:31 AM'
    },
    {
      id: '4',
      sender: 'Carol Davis',
      content: 'Great! I\'ve shared the requirements document in the files.',
      timestamp: '10:32 AM'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-slate-200 flex flex-col h-96">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-800">
          Meeting Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 space-y-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {messages.map((message) => (
            <div key={message.id} className="space-y-1">
              {message.isSystem ? (
                <div className="text-center">
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    {message.content}
                  </span>
                </div>
              ) : (
                <div className={`${message.sender === 'You' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block max-w-[80%] px-3 py-2 rounded-lg ${
                    message.sender === 'You' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-slate-100 text-slate-800'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {message.sender === 'You' ? 'You' : message.sender} • {message.timestamp}
                  </p>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={!newMessage.trim()}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chat;

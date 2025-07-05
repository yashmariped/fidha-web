import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GradientBackground,
  Container,
  Header,
  BackButton,
  Title,
  Card,
  Input,
  Button,
  ChatContainer,
  MessagesContainer,
  MessageBubble,
  ChatInputContainer,
} from '../components/styled';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isSender: boolean;
}

const ChatScreen: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'You both noticed each other. Say what you couldn\'t then.',
      timestamp: new Date().toISOString(),
      isSender: false,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (message.trim().length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message.trim(),
      timestamp: new Date().toISOString(),
      isSender: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');

    // Simulate response after 2 seconds
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thanks for reaching out! I noticed you too.',
        timestamp: new Date().toISOString(),
        isSender: false,
      };
      setMessages((prev) => [...prev, response]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <GradientBackground>
      <Container>
        <Header>
          <BackButton onClick={() => navigate('/home')}>
            ← Back
          </BackButton>
          <Title style={{ fontSize: '24px' }}>Chat</Title>
          <div style={{ width: '50px' }} />
        </Header>

        <ChatContainer>
          <MessagesContainer>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} isSender={msg.isSender}>
                <Card className="message-card">
                  <div style={{ color: 'white', marginBottom: '4px' }}>
                    {msg.content}
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#E0C3FC', 
                    textAlign: 'right' 
                  }}>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </Card>
              </MessageBubble>
            ))}
            <div ref={messagesEndRef} />
          </MessagesContainer>
        </ChatContainer>

        <ChatInputContainer>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            style={{ 
              flex: 1, 
              margin: 0,
              borderRadius: '20px',
              padding: '12px 16px'
            }}
          />
          <Button 
            onClick={handleSend}
            disabled={!message.trim()}
            style={{ 
              borderRadius: '20px',
              padding: '12px 16px',
              minWidth: 'auto',
              opacity: message.trim() ? 1 : 0.5
            }}
          >
            Send
          </Button>
        </ChatInputContainer>
      </Container>
    </GradientBackground>
  );
};

export default ChatScreen; 
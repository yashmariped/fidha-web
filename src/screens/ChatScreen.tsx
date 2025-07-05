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
import { getChatMessages, sendMessage, ChatMessage, getCurrentUser } from '../services/backendService';

const ChatScreen: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = getCurrentUser();

  // For demo purposes, use a fixed chat ID
  const chatId = 'demo_chat_1';

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const chatMessages = await getChatMessages(chatId);
      setMessages(chatMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (message.trim().length === 0) return;

    const trimmedMessage = message.trim();
    setMessage('');

    try {
      // Send message through backend service
      const newMessage = await sendMessage(chatId, trimmedMessage);
      
      // Add message to local state
      setMessages(prev => [...prev, newMessage]);
      
      // The backend service will automatically add a response after 2-5 seconds
      // We'll poll for new messages
      setTimeout(() => {
        loadMessages();
      }, 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading) {
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
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                border: '4px solid rgba(255,255,255,0.3)', 
                borderTop: '4px solid white', 
                borderRadius: '50%', 
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px'
              }} />
              <p style={{ color: 'white' }}>Loading chat...</p>
            </div>
          </div>
        </Container>
      </GradientBackground>
    );
  }

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
              <MessageBubble key={msg.id} isSender={msg.senderId === currentUser.id}>
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
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </GradientBackground>
  );
};

export default ChatScreen; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GradientBackground,
  Container,
  Header,
  BackButton,
  Title,
  Content,
  Card,
  Description,
} from '../components/styled';

interface Moment {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  timestamp: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  status: 'pending' | 'confirmed' | 'rejected';
}

const HistoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [moments, setMoments] = useState<Moment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading moments
    setTimeout(() => {
      const mockMoments: Moment[] = [
        {
          id: '1',
          userId: 'user1',
          username: 'Sarah',
          timestamp: Date.now() - 3600000, // 1 hour ago
          status: 'confirmed',
        },
        {
          id: '2',
          userId: 'user2',
          username: 'Alex',
          timestamp: Date.now() - 86400000, // 1 day ago
          status: 'pending',
        },
        {
          id: '3',
          userId: 'user3',
          username: 'Emma',
          timestamp: Date.now() - 172800000, // 2 days ago
          status: 'rejected',
        },
      ];
      setMoments(mockMoments);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#00FF9D';
      case 'rejected':
        return '#FF3366';
      default:
        return '#FFD700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  return (
    <GradientBackground>
      <Container>
        <Header>
          <BackButton onClick={() => navigate('/home')}>
            ← Back
          </BackButton>
          <Title style={{ fontSize: '24px' }}>Moment History</Title>
          <div style={{ width: '50px' }} />
        </Header>

        <Content style={{ alignItems: 'flex-start', textAlign: 'left' }}>
          <div style={{ textAlign: 'center', width: '100%', marginBottom: '32px' }}>
            <Description>
              Connections that felt real
            </Description>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                border: '4px solid rgba(255,255,255,0.3)', 
                borderTop: '4px solid white', 
                borderRadius: '50%', 
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px'
              }} />
              <Description>Loading moments...</Description>
            </div>
          ) : moments.length === 0 ? (
            <div style={{ textAlign: 'center', width: '100%' }}>
              <Description>No moments yet</Description>
            </div>
          ) : (
            <div style={{ width: '100%', maxWidth: '600px' }}>
              {moments.map((moment) => (
                <Card key={moment.id}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#A084E8',
                        marginRight: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>
                        {moment.username.charAt(0)}
                      </div>
                      <div>
                        <h3 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '18px' }}>
                          {moment.username}
                        </h3>
                        <p style={{ color: '#E0C3FC', margin: 0, fontSize: '14px' }}>
                          {formatTimeAgo(moment.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      backgroundColor: getStatusColor(moment.status),
                      color: '#000',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {getStatusText(moment.status)}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Content>
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

export default HistoryScreen; 
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
  Button,
} from '../components/styled';
import { getNearbyUsers, User } from '../services/backendService';

const FindSomeoneScreen: React.FC = () => {
  const navigate = useNavigate();
  const [nearbyUsers, setNearbyUsers] = useState<User[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    startScanning();
  }, []);

  const startScanning = async () => {
    try {
      setIsScanning(true);
      
      // Use real backend service
      const users = await getNearbyUsers();
      setNearbyUsers(users);
      setIsScanning(false);
    } catch (error) {
      console.error('Error starting scan:', error);
      setIsScanning(false);
    }
  };

  const handleUserSelect = (user: User) => {
    navigate(`/what-was-she-wearing/${user.id}`);
  };

  return (
    <GradientBackground>
      <Container>
        <Header>
          <BackButton onClick={() => navigate('/home')}>
            ← Back
          </BackButton>
          <Title style={{ fontSize: '24px' }}>Find Someone</Title>
          <div style={{ width: '50px' }} />
        </Header>

        <Content>
          {isScanning ? (
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
              <Description>
                Scanning for nearby users...
              </Description>
            </div>
          ) : nearbyUsers.length === 0 ? (
            <div style={{ textAlign: 'center' }}>
              <Description>
                No nearby users found
              </Description>
              <Button onClick={startScanning}>
                Try Again
              </Button>
            </div>
          ) : (
            <div style={{ width: '100%' }}>
              <Description>
                Found {nearbyUsers.length} nearby user(s)
              </Description>
              {nearbyUsers.map((user) => (
                <Card 
                  key={user.id} 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleUserSelect(user)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ color: 'white', margin: '0 0 4px 0' }}>
                        {user.name}
                      </h3>
                      <p style={{ color: '#E0C3FC', margin: 0 }}>
                        {user.isOnline ? 'Online now' : 'Recently seen'}
                      </p>
                    </div>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50%', 
                      backgroundColor: user.isOnline ? '#00FF9D' : '#FFD700' 
                    }} />
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

export default FindSomeoneScreen; 
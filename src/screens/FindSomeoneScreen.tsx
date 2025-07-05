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

interface BLEDevice {
  id: string;
  name: string;
  rssi: number;
  timestamp: string;
  userId?: string;
}

const FindSomeoneScreen: React.FC = () => {
  const navigate = useNavigate();
  const [nearbyDevices, setNearbyDevices] = useState<BLEDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    startScanning();
  }, []);

  const startScanning = async () => {
    try {
      setIsScanning(true);
      
      // Simulate BLE scanning for web demo
      setTimeout(() => {
        const mockDevices: BLEDevice[] = [
          {
            id: '1',
            name: 'Sarah\'s iPhone',
            rssi: -45,
            timestamp: new Date().toISOString(),
            userId: 'user1',
          },
          {
            id: '2',
            name: 'Alex\'s Samsung',
            rssi: -52,
            timestamp: new Date().toISOString(),
            userId: 'user2',
          },
        ];
        setNearbyDevices(mockDevices);
        setIsScanning(false);
      }, 3000);
    } catch (error) {
      console.error('Error starting scan:', error);
      setIsScanning(false);
    }
  };

  const handleDeviceSelect = (device: BLEDevice) => {
    if (device.userId) {
      navigate(`/what-was-she-wearing/${device.userId}`);
    }
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
          ) : nearbyDevices.length === 0 ? (
            <div style={{ textAlign: 'center' }}>
              <Description>
                No nearby users found
              </Description>
              <Button onClick={startScanning}>
                Try Again
              </Button>
            </div>
          ) : (
            <div style={{ width: '100%', maxWidth: '600px' }}>
              <Description>
                Found {nearbyDevices.length} nearby user(s)
              </Description>
              {nearbyDevices.map((device) => (
                <Card 
                  key={device.id} 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDeviceSelect(device)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ color: 'white', margin: '0 0 4px 0' }}>
                        {device.name}
                      </h3>
                      <p style={{ color: '#E0C3FC', margin: 0 }}>
                        {Math.abs(device.rssi)}m away
                      </p>
                    </div>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50%', 
                      backgroundColor: '#00FF9D' 
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
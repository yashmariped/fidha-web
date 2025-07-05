import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GradientBackground,
  Container,
  Content,
  Title,
  Tagline,
  Description,
  ButtonGroup,
  Button,
} from '../components/styled';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <GradientBackground>
      <Container>
        <Content>
          <Title>Fidha</Title>
          <Tagline>Connect with a glance</Tagline>
          
          <ButtonGroup>
            <Button onClick={() => navigate('/find-someone')}>
              Find Someone
            </Button>
            
            <Button onClick={() => navigate('/i-was-seen')}>
              I Was Seen
            </Button>
            
            <Button variant="outline" onClick={() => navigate('/history')}>
              History
            </Button>
          </ButtonGroup>
          
          <Description>
            Discover connections through shared moments
          </Description>
        </Content>
      </Container>
    </GradientBackground>
  );
};

export default HomeScreen; 
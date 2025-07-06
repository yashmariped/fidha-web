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
          <Tagline>Start conversations that matter</Tagline>
          
          <ButtonGroup>
            <Button onClick={() => navigate('/find-someone')}>
              Start a Conversation
            </Button>
            
            <Button onClick={() => navigate('/i-was-seen')}>
              I Was Noticed
            </Button>
            
            <Button variant="outline" onClick={() => navigate('/history')}>
              My Conversations
            </Button>
          </ButtonGroup>
          
          <Description>
            Connect through shared moments and see where conversations lead
          </Description>
        </Content>
      </Container>
    </GradientBackground>
  );
};

export default HomeScreen; 
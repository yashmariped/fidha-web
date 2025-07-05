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
  HeartIcon,
  IconRow,
  AccentDot,
} from '../components/styled';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <GradientBackground>
      <Container>
        <Content>
          <Title>Fidha</Title>
          <Tagline>Express true connection</Tagline>
          
          <IconRow>
            <AccentDot />
            <HeartIcon />
            <AccentDot />
          </IconRow>
          
          <Title style={{ fontSize: '32px', marginBottom: '12px' }}>
            Connect with a glance
          </Title>
          
          <Description>
            Start a search and find someone nearby who also felt a connection.
          </Description>
          
          <ButtonGroup>
            <Button onClick={() => navigate('/home')}>
              Start Searching
            </Button>
          </ButtonGroup>
        </Content>
      </Container>
    </GradientBackground>
  );
};

export default WelcomeScreen; 
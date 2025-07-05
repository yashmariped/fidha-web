import styled from 'styled-components';
import { COLORS, FONTS, SIZES, SPACING, BORDER_RADIUS, SHADOWS, ANIMATION } from '../constants/theme';

// Gradient Background
export const GradientBackground = styled.div`
  background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// Container
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${SPACING.l};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Content
export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${SPACING.xl} 0;
`;

// Typography
export const Title = styled.h1`
  font-size: ${SIZES.h1};
  font-weight: bold;
  color: ${COLORS.text};
  margin-bottom: ${SPACING.s};
  font-family: ${FONTS.bold};
`;

export const Subtitle = styled.h2`
  font-size: ${SIZES.h2};
  font-weight: bold;
  color: ${COLORS.text};
  margin-bottom: ${SPACING.m};
  font-family: ${FONTS.bold};
`;

export const Tagline = styled.p`
  font-size: ${SIZES.body1};
  color: ${COLORS.text};
  margin-bottom: ${SPACING.l};
  font-family: ${FONTS.regular};
`;

export const Description = styled.p`
  font-size: ${SIZES.body2};
  color: ${COLORS.textSecondary};
  line-height: 1.6;
  margin-bottom: ${SPACING.l};
  font-family: ${FONTS.regular};
`;

// Buttons
export const Button = styled.button<{ variant?: 'primary' | 'outline' }>`
  background: ${props => props.variant === 'outline' ? 'transparent' : COLORS.primaryLight};
  border: 2px solid ${COLORS.primaryLight};
  color: ${COLORS.text};
  padding: ${SPACING.m} ${SPACING.xl};
  border-radius: ${BORDER_RADIUS.round};
  font-size: ${SIZES.body1};
  font-weight: bold;
  font-family: ${FONTS.bold};
  cursor: pointer;
  transition: all ${ANIMATION.normal};
  min-width: 200px;
  margin: ${SPACING.s} 0;

  &:hover {
    transform: translateY(-2px);
    ${SHADOWS.medium}
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.m};
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

// Cards
export const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${BORDER_RADIUS.l};
  padding: ${SPACING.l};
  margin-bottom: ${SPACING.m};
  backdrop-filter: blur(10px);
  ${SHADOWS.light}
`;

// Header
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${SPACING.l};
  border-bottom: 1px solid ${COLORS.primaryLight};
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: ${COLORS.text};
  font-size: ${SIZES.body1};
  font-weight: bold;
  font-family: ${FONTS.bold};
  cursor: pointer;
  padding: ${SPACING.s};
  transition: opacity ${ANIMATION.fast};

  &:hover {
    opacity: 0.8;
  }
`;

// Icon
export const HeartIcon = styled.div`
  width: 160px;
  height: 160px;
  background: ${COLORS.primaryLight};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${SPACING.l} 0;
  position: relative;

  &::before {
    content: '♥';
    font-size: 80px;
    color: ${COLORS.text};
  }
`;

// Accent dots
export const AccentDot = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${COLORS.primaryLight};
  opacity: 0.7;
  margin: 0 ${SPACING.s};
`;

export const IconRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${SPACING.l} 0;
`;

// Form elements
export const Input = styled.input`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${BORDER_RADIUS.m};
  padding: ${SPACING.m};
  color: ${COLORS.text};
  font-size: ${SIZES.body1};
  font-family: ${FONTS.regular};
  width: 100%;
  margin-bottom: ${SPACING.m};

  &::placeholder {
    color: ${COLORS.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.primaryLight};
    ${SHADOWS.glow}
  }
`;

export const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${BORDER_RADIUS.m};
  padding: ${SPACING.m};
  color: ${COLORS.text};
  font-size: ${SIZES.body1};
  font-family: ${FONTS.regular};
  width: 100%;
  min-height: 100px;
  resize: vertical;
  margin-bottom: ${SPACING.m};

  &::placeholder {
    color: ${COLORS.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.primaryLight};
    ${SHADOWS.glow}
  }
`;

// Grid
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${SPACING.m};
  margin: ${SPACING.l} 0;
`;

export const GridItem = styled.div<{ selected?: boolean }>`
  background: ${props => props.selected ? COLORS.primaryLight : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${COLORS.primaryLight};
  border-radius: ${BORDER_RADIUS.m};
  padding: ${SPACING.m};
  text-align: center;
  cursor: pointer;
  transition: all ${ANIMATION.normal};
  font-size: ${SIZES.body2};
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
  color: ${COLORS.text};

  &:hover {
    background: ${COLORS.primaryLight};
    transform: translateY(-2px);
    ${SHADOWS.medium}
  }
`;

// Footer
export const Footer = styled.footer`
  padding: ${SPACING.l};
  border-top: 1px solid ${COLORS.primaryLight};
  text-align: center;
`;

// Responsive
export const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    padding: ${SPACING.m};
  }
`;

 
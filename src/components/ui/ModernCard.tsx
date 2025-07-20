import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ModernCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  glass?: boolean;
}

const GlassCard = styled(Box)(() => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  padding: '24px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
}));

const GradientCard = styled(Box)(() => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '16px',
  padding: '24px',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
}));

const ModernCard: React.FC<ModernCardProps> = ({ 
  title, 
  children, 
  className, 
  gradient = false
}) => {
  const CardComponent = gradient ? GradientCard : GlassCard;

  return (
    <CardComponent className={className}>
      {title && (
        <Typography variant="h6" className="mb-4 font-semibold">
          {title}
        </Typography>
      )}
      {children}
    </CardComponent>
  );
};

export default ModernCard;

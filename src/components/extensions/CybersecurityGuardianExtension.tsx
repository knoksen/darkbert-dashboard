import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip
} from '@mui/material';
import { 
  Warning, 
  CheckCircle, 
  BugReport,
  Gavel,
  Science,
  FlashOn,
  ContentCut
} from '@mui/icons-material';
import ModernCard from '@/components/ui/ModernCard';

interface ThreatAlert {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  source: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
  model: string;
}

interface ModelMetrics {
  name: string;
  icon: React.ReactNode;
  threats_detected: number;
  threats_blocked: number;
  accuracy: number;
  color: string;
}

const CybersecurityGuardianExtension: React.FC = () => {
  const [alerts] = useState<ThreatAlert[]>([
    {
      id: '1',
      title: 'EvilBERT Malware Campaign',
      severity: 'critical',
      description: 'Advanced ransomware variant detected targeting enterprise networks',
      source: 'Dark Web Intelligence',
      timestamp: '2024-01-15T10:00:00Z',
      status: 'active',
      model: 'EvilBERT'
    },
    {
      id: '2',
      title: 'RoBERTa Phishing Alert',
      severity: 'high',
      description: 'Sophisticated phishing campaigns leveraging AI-generated content',
      source: 'Email Security',
      timestamp: '2024-01-15T09:30:00Z',
      status: 'investigating',
      model: 'RoBERTa'
    },
    {
      id: '3',
      title: 'BERTroise Botnet Activity',
      severity: 'medium',
      description: 'Botnet coordination detected in cryptocurrency mining operations',
      source: 'Network Monitoring',
      timestamp: '2024-01-15T08:15:00Z',
      status: 'active',
      model: 'BERTroise'
    },
    {
      id: '4',
      title: 'ThorBERT Ransomware Variant',
      severity: 'critical',
      description: 'New ransomware strain targeting cloud infrastructure',
      source: 'Threat Intelligence',
      timestamp: '2024-01-15T07:45:00Z',
      status: 'investigating',
      model: 'ThorBERT'
    },
    {
      id: '5',
      title: 'FakeBERT Disinformation Campaign',
      severity: 'medium',
      description: 'Coordinated misinformation campaign on social media platforms',
      source: 'Social Media Intelligence',
      timestamp: '2024-01-15T06:20:00Z',
      status: 'resolved',
      model: 'FakeBERT'
    }
  ]);

  const modelMetrics: ModelMetrics[] = [
    {
      name: 'EvilBERT',
      icon: <BugReport />,
      threats_detected: 892,
      threats_blocked: 850,
      accuracy: 97.8,
      color: '#ff4444'
    },
    {
      name: 'RoBERTa',
      icon: <Gavel />,
      threats_detected: 734,
      threats_blocked: 700,
      accuracy: 96.5,
      color: '#44ff44'
    },
    {
      name: 'BERTroise',
      icon: <Science />,
      threats_detected: 567,
      threats_blocked: 540,
      accuracy: 95.2,
      color: '#4444ff'
    },
    {
      name: 'ThorBERT',
      icon: <FlashOn />,
      threats_detected: 445,
      threats_blocked: 420,
      accuracy: 94.8,
      color: '#ff8800'
    },
    {
      name: 'FakeBERT',
      icon: <ContentCut />,
      threats_detected: 209,
      threats_blocked: 200,
      accuracy: 93.7,
      color: '#8800ff'
    }
  ];

  // Removed unused getSeverityColor function

  return (
    <Box className="p-6 space-y-6">
      <Typography variant="h4" className="font-bold text-gray-800 dark:text-white">
        Cybersecurity Guardian Extension
      </Typography>
      <Typography variant="body1" className="text-gray-600 dark:text-gray-300">
        Advanced threat detection powered by specialized BERT models including EvilBERT, RoBERTa, BERTroise, ThorBERT, and FakeBERT
      </Typography>

      {/* Model Performance Dashboard */}
      <Grid container spacing={3}>
        {modelMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={4} key={metric.name}>
            <ModernCard title={`${metric.name} Performance`} gradient>
              <Box className="space-y-3">
                <Box className="flex items-center justify-center mb-2">
                  <Avatar sx={{ bgcolor: metric.color, width: 48, height: 48 }}>
                    {metric.icon}
                  </Avatar>
                </Box>
                
                <Box className="flex items-center justify-between">
                  <Typography variant="body2">Threats Detected</Typography>
                  <Typography variant="h6">{metric.threats_detected}</Typography>
                </Box>
                
                <Box className="flex items-center justify-between">
                  <Typography variant="body2">Threats Blocked</Typography>
                  <Typography variant="h6">{metric.threats_blocked}</Typography>
                </Box>
                
                <Box className="flex items-center justify-between">
                  <Typography variant="body2">Accuracy</Typography>
                  <Typography variant="h6">{metric.accuracy}%</Typography>
                </Box>
                
                <LinearProgress 
                  value={metric.accuracy} 
                  variant="determinate" 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: metric.color
                    }
                  }}
                />
              </Box>
            </ModernCard>
          </Grid>
        ))}
      </Grid>

      {/* Threat Alerts Section */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ModernCard title="Active Threat Alerts" gradient>
            <List>
              {alerts.map((alert) => (
                <React.Fragment key={alert.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: alert.severity === 'critical' ? '#ff4444' : 
                        alert.severity === 'high' ? '#ff8800' : 
                        alert.severity === 'medium' ? '#44ff44' : '#4444ff' }}>
                        {alert.severity === 'critical' ? <BugReport /> : 
                         alert.severity === 'high' ? <Warning /> : 
                         alert.severity === 'medium' ? <Science /> : <CheckCircle />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" component="span">
                          {alert.title}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {alert.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Model: {alert.model} | Source: {alert.source} | Status: {alert.status}
                          </Typography>
                        </Box>
                      }
                    />
                    <Chip 
                      label={alert.severity.toUpperCase()} 
                      color={alert.severity === 'critical' ? 'error' : 
                             alert.severity === 'high' ? 'warning' : 
                             alert.severity === 'medium' ? 'info' : 'success'}
                      size="small"
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </ModernCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CybersecurityGuardianExtension;

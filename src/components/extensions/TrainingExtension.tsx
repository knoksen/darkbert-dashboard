import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Button,
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  Stop,
  Settings,
  Speed,
} from "@mui/icons-material";
import ModernCard from "@/components/ui/ModernCard";

interface TrainingMetrics {
  epoch: number;
  loss: number;
  accuracy: number;
  val_loss: number;
  val_accuracy: number;
}

interface TrainingSession {
  id: string;
  name: string;
  status: "running" | "paused" | "completed";
  progress: number;
  metrics: TrainingMetrics[];
  startTime: string;
}

const TrainingExtension: React.FC = () => {
  const [sessions] = useState<TrainingSession[]>([
    {
      id: "1",
      name: "DarkBERT Training Session #1",
      status: "running",
      progress: 75,
      metrics: [
        {
          epoch: 1,
          loss: 0.45,
          accuracy: 0.89,
          val_loss: 0.42,
          val_accuracy: 0.87,
        },
        {
          epoch: 2,
          loss: 0.38,
          accuracy: 0.92,
          val_loss: 0.35,
          val_accuracy: 0.91,
        },
        {
          epoch: 3,
          loss: 0.32,
          accuracy: 0.94,
          val_loss: 0.31,
          val_accuracy: 0.93,
        },
      ],
      startTime: "2024-01-15T10:00:00Z",
    },
  ]);

  return (
    <Box className="p-6 space-y-6">
      <Typography
        variant="h4"
        className="font-bold text-gray-800 dark:text-white"
      >
        Training Extension
      </Typography>

      {/* Training Sessions */}
      <Grid container spacing={3}>
        {sessions.map((session) => (
          <Grid item xs={12} key={session.id}>
            <ModernCard title={session.name} gradient>
              <Box className="space-y-4">
                <Box className="flex items-center justify-between">
                  <Typography variant="h6">{session.name}</Typography>
                  <Box className="flex gap-2">
                    <Button
                      size="small"
                      startIcon={<PlayArrow />}
                      color={
                        session.status === "running" ? "success" : "primary"
                      }
                    >
                      {session.status}
                    </Button>
                    <Button size="small" startIcon={<Pause />} color="warning">
                      Pause
                    </Button>
                    <Button size="small" startIcon={<Stop />} color="error">
                      Stop
                    </Button>
                  </Box>
                </Box>

                <Box className="space-y-2">
                  <Typography variant="body2">
                    Progress: {session.progress}%
                  </Typography>
                  <LinearProgress
                    value={session.progress}
                    variant="determinate"
                  />
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" color="primary">
                          Training Metrics
                        </Typography>
                        <Typography variant="body2">
                          Loss:{" "}
                          {session.metrics[
                            session.metrics.length - 1
                          ]?.loss.toFixed(3)}
                        </Typography>
                        <Typography variant="body2">
                          Accuracy:{" "}
                          {(
                            session.metrics[session.metrics.length - 1]
                              ?.accuracy * 100
                          ).toFixed(1)}
                          %
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" color="secondary">
                          Validation Metrics
                        </Typography>
                        <Typography variant="body2">
                          Val Loss:{" "}
                          {session.metrics[
                            session.metrics.length - 1
                          ]?.val_loss.toFixed(3)}
                        </Typography>
                        <Typography variant="body2">
                          Val Accuracy:{" "}
                          {(
                            session.metrics[session.metrics.length - 1]
                              ?.val_accuracy * 100
                          ).toFixed(1)}
                          %
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </ModernCard>
          </Grid>
        ))}
      </Grid>

      {/* Training Metrics Dashboard */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ModernCard title="Training Progress" gradient>
            <Box className="space-y-4">
              <Box className="flex items-center justify-between">
                <Typography variant="h6">Training Progress</Typography>
                <Typography variant="h6">75%</Typography>
              </Box>
              <LinearProgress value={75} variant="determinate" />
            </Box>
          </ModernCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <ModernCard title="Model Performance" gradient>
            <Box className="space-y-4">
              <Box className="flex items-center justify-between">
                <Typography variant="h6">Model Performance</Typography>
                <Typography variant="h6">94.7%</Typography>
              </Box>
              <LinearProgress value={94.7} variant="determinate" />
            </Box>
          </ModernCard>
        </Grid>
      </Grid>

      {/* Training Controls */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ModernCard title="Training Controls">
            <Box className="space-y-4">
              <Box className="flex gap-2">
                <Button startIcon={<PlayArrow />} color="success">
                  Start Training
                </Button>
                <Button startIcon={<Pause />} color="warning">
                  Pause Training
                </Button>
                <Button startIcon={<Stop />} color="error">
                  Stop Training
                </Button>
              </Box>
            </Box>
          </ModernCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <ModernCard title="Model Configuration">
            <Box className="space-y-4">
              <Box className="flex gap-2">
                <Button startIcon={<Settings />} color="primary">
                  Configure Model
                </Button>
                <Button startIcon={<Speed />} color="secondary">
                  Optimize Model
                </Button>
              </Box>
            </Box>
          </ModernCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrainingExtension;

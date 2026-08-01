import React, { useMemo } from "react";
import { Box, Chip, Grid, Typography, LinearProgress } from "@mui/material";
import {
  Bolt,
  Psychology,
  Visibility,
  MotionPhotosAuto,
  Security,
  PrecisionManufacturing,
  Timeline,
  AutoAwesome,
} from "@mui/icons-material";

type KPI = {
  label: string;
  value: string;
  progress: number;
  color: string;
};

type TimelineEvent = {
  time: string;
  event: string;
  tag: "Pipeline" | "Render" | "AI Core" | "Security";
};

type TelemetryStatus = "Optimal" | "Stable" | "Watch" | "Critical";

type TelemetryItem = {
  label: string;
  value: string;
  status: TelemetryStatus;
  icon: React.ReactNode;
};

const kpis: KPI[] = [
  { label: "Neural Sync", value: "99.2%", progress: 99, color: "#6ee7ff" },
  { label: "MetaHuman Fidelity", value: "4K RT", progress: 93, color: "#a78bfa" },
  { label: "Frame Stability", value: "120 FPS", progress: 96, color: "#34d399" },
  { label: "Threat Latency", value: "18ms", progress: 88, color: "#fb7185" },
];

const timeline: TimelineEvent[] = [
  { time: "08:40", event: "MetaHuman facial rig calibrated", tag: "Pipeline" },
  { time: "09:05", event: "Unreal scene lighting pass completed", tag: "Render" },
  { time: "09:22", event: "Anomaly detection model retrained", tag: "AI Core" },
  { time: "09:44", event: "Secure stream tunnel re-keyed", tag: "Security" },
];

const UnrealMetaHumanDashboard: React.FC = () => {
  const systemHealth = useMemo(() => {
    const averageProgress =
      kpis.reduce((sum, item) => sum + item.progress, 0) / kpis.length;

    if (averageProgress >= 95) return "Optimal";
    if (averageProgress >= 90) return "Stable";
    if (averageProgress >= 80) return "Watch";
    return "Critical";
  }, []);

  const criticalSignals = useMemo(
    () => kpis.filter((item) => item.progress < 90).length,
    [],
  );

  const telemetry: TelemetryItem[] = useMemo(
    () => [
      {
        label: "Power Matrix",
        value: "98.4%",
        status: "Stable",
        icon: <Bolt />,
      },
      {
        label: "Render Pipeline",
        value: "Lumen + Nanite Active",
        status: "Optimal",
        icon: <MotionPhotosAuto />,
      },
      {
        label: "Rig Compiler",
        value: "52 assets synchronized",
        status: "Stable",
        icon: <PrecisionManufacturing />,
      },
      {
        label: "Inference Throughput",
        value: "2.8M events/min",
        status: criticalSignals > 0 ? "Watch" : "Optimal",
        icon: <Timeline />,
      },
    ],
    [criticalSignals],
  );

  return (
    <Box className="ue-root">
      <Box className="ue-bg-orb ue-bg-orb-one" />
      <Box className="ue-bg-orb ue-bg-orb-two" />

      <Box className="ue-hero ue-glass ue-scanline" component="section" aria-label="Command hero panel">
        <Box>
          <Typography className="ue-kicker">UNREAL ENGINE × METAHUMAN</Typography>
          <Typography className="ue-title">Cinematic Command Interface</Typography>
          <Typography className="ue-subtitle">
            Real-time intelligence cockpit with holographic telemetry, photoreal
            avatar orchestration, and adaptive threat cognition.
          </Typography>

          <Box className="ue-chip-row">
            <Chip icon={<AutoAwesome />} label="Lumen-Ready Visual Layer" className="ue-chip" />
            <Chip icon={<Psychology />} label="Neural Behavior Core" className="ue-chip" />
            <Chip icon={<Security />} label="Zero-Trust Runtime" className="ue-chip" />
          </Box>

          <Box className="ue-chip-row ue-chip-row-secondary">
            <Chip
              label={`System Health: ${systemHealth}`}
              className={`ue-chip ue-chip-health ue-status-${systemHealth.toLowerCase()}`}
            />
            <Chip
              label={`Critical Signals: ${criticalSignals}`}
              className={`ue-chip ue-chip-health ${criticalSignals > 0 ? "ue-status-watch" : "ue-status-optimal"}`}
            />
          </Box>
        </Box>

        <Box className="ue-avatar-card ue-glow" component="aside" aria-label="MetaHuman operator">
          <Typography className="ue-panel-title">MetaHuman Operator</Typography>
          <Box className="ue-avatar-ring">
            <Box className="ue-avatar-core">
              <Visibility />
            </Box>
          </Box>
          <Typography className="ue-avatar-name">Mira // Synthetic Analyst</Typography>
          <Typography className="ue-avatar-meta">
            Expression Engine: Active · Eye Tracking: Locked · Voice: Synced
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3} className="ue-grid" component="section" aria-label="KPI status grid">
        {kpis.map((item) => {
          const severityClass =
            item.progress >= 95 ? "ue-status-optimal" : item.progress >= 90 ? "ue-status-stable" : "ue-status-watch";

          return (
            <Grid item xs={12} sm={6} md={3} key={item.label}>
              <Box className={`ue-card ue-glass ${severityClass}`}>
                <Typography className="ue-card-label">{item.label}</Typography>
                <Typography className="ue-card-value">{item.value}</Typography>
                <LinearProgress
                  variant="determinate"
                  value={item.progress}
                  sx={{
                    height: 8,
                    borderRadius: 999,
                    backgroundColor: "rgba(255,255,255,0.12)",
                    "& .MuiLinearProgress-bar": { backgroundColor: item.color },
                  }}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3} component="section" aria-label="Telemetry and timeline panels">
        <Grid item xs={12} md={8}>
          <Box className="ue-card ue-glass ue-panel">
            <Typography className="ue-panel-title">Mission Telemetry</Typography>
            <Box className="ue-telemetry-grid">
              {telemetry.map((item) => (
                <Box key={item.label} className={`ue-telemetry-item ue-status-${item.status.toLowerCase()}`}>
                  {item.icon}
                  <Box>
                    <Typography className="ue-telemetry-label">{item.label}</Typography>
                    <Typography className="ue-telemetry-value">{item.value}</Typography>
                  </Box>
                  <Chip size="small" label={item.status} className="ue-chip ue-telemetry-status" />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box className="ue-card ue-glass ue-panel">
            <Typography className="ue-panel-title">Ops Timeline</Typography>
            <Box className="ue-timeline">
              {timeline.map((entry) => (
                <Box key={`${entry.time}-${entry.event}`} className="ue-timeline-item">
                  <Typography className="ue-time">{entry.time}</Typography>
                  <Box>
                    <Typography className="ue-event">{entry.event}</Typography>
                    <Typography className="ue-tag">{entry.tag}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UnrealMetaHumanDashboard;

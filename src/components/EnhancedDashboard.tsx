import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { TrendingUp, Speed, Security, Analytics } from "@mui/icons-material";
import ModernCard from "@/components/ui/ModernCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import DashboardChart from "@/components/DashboardChart";
import KnowledgeDatabases from "@/components/ui/KnowledgeDatabases";

const EnhancedDashboard: React.FC = () => {
  const metrics = [
    {
      title: "Model Accuracy",
      value: 94.7,
      prefix: "",
      suffix: "%",
      icon: <TrendingUp className="text-green-500" />,
      color: "from-green-400 to-green-600",
      trend: "+2.3%",
    },
    {
      title: "Training Speed",
      value: 156,
      prefix: "",
      suffix: " epochs/hr",
      icon: <Speed className="text-blue-500" />,
      color: "from-blue-400 to-blue-600",
      trend: "+12%",
    },
    {
      title: "Threat Detection",
      value: 1234,
      prefix: "",
      suffix: " threats",
      icon: <Security className="text-red-500" />,
      color: "from-red-400 to-red-600",
      trend: "+45%",
    },
    {
      title: "Data Processed",
      value: 2.3,
      prefix: "",
      suffix: "M samples",
      icon: <Analytics className="text-purple-500" />,
      color: "from-purple-400 to-purple-600",
      trend: "+8%",
    },
  ];

  return (
    <Box className="p-6 space-y-6">
      {/* Header */}
      <Box>
        <Typography
          variant="h4"
          className="font-bold text-gray-800 dark:text-white mb-2"
        >
          DarkBERT Dashboard
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-600 dark:text-gray-300"
        >
          Advanced AI model monitoring and threat detection
        </Typography>
      </Box>

      {/* KPI Metrics */}
      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ModernCard>
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography
                    variant="h6"
                    className="text-gray-600 dark:text-gray-300 mb-1"
                  >
                    {metric.title}
                  </Typography>
                  <AnimatedCounter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    className="text-3xl font-bold text-gray-800 dark:text-white"
                  />
                  <Typography variant="body2" className="text-green-500 mt-1">
                    {metric.trend} from last week
                  </Typography>
                </Box>
                <Box
                  className={`p-3 rounded-full bg-gradient-to-r ${metric.color} bg-opacity-20`}
                >
                  {metric.icon}
                </Box>
              </Box>
            </ModernCard>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <ModernCard title="Training Progress" gradient>
            <DashboardChart />
          </ModernCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <ModernCard title="Model Performance">
            <Box className="space-y-4">
              <Box>
                <Typography
                  variant="body2"
                  className="text-gray-600 dark:text-gray-300"
                >
                  Precision
                </Typography>
                <Box className="w-full bg-gray-200 rounded-full h-2">
                  <Box
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "92%" }}
                  />
                </Box>
                <Typography variant="body2" className="text-right">
                  92%
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  className="text-gray-600 dark:text-gray-300"
                >
                  Recall
                </Typography>
                <Box className="w-full bg-gray-200 rounded-full h-2">
                  <Box
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "89%" }}
                  />
                </Box>
                <Typography variant="body2" className="text-right">
                  89%
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  className="text-gray-600 dark:text-gray-300"
                >
                  F1-Score
                </Typography>
                <Box className="w-full bg-gray-200 rounded-full h-2">
                  <Box
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: "90%" }}
                  />
                </Box>
                <Typography variant="body2" className="text-right">
                  90%
                </Typography>
              </Box>
            </Box>
          </ModernCard>
        </Grid>
      </Grid>

      {/* Additional Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ModernCard title="Recent Activity">
            <Box className="space-y-3">
              {[
                {
                  action: "Model retrained",
                  time: "2 hours ago",
                  status: "success",
                },
                {
                  action: "New threats detected",
                  time: "5 hours ago",
                  status: "warning",
                },
                {
                  action: "Dataset updated",
                  time: "1 day ago",
                  status: "info",
                },
                {
                  action: "Security scan completed",
                  time: "2 days ago",
                  status: "success",
                },
              ].map((activity, index) => (
                <Box
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <Typography variant="body2">{activity.action}</Typography>
                  <Typography variant="caption" className="text-gray-500">
                    {activity.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </ModernCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <ModernCard title="System Health">
            <Box className="space-y-4">
              <Box className="flex items-center justify-between">
                <Typography variant="body2">CPU Usage</Typography>
                <Typography variant="body2" className="text-blue-600">
                  67%
                </Typography>
              </Box>
              <Box className="flex items-center justify-between">
                <Typography variant="body2">Memory</Typography>
                <Typography variant="body2" className="text-green-600">
                  4.2GB / 8GB
                </Typography>
              </Box>
              <Box className="flex items-center justify-between">
                <Typography variant="body2">Storage</Typography>
                <Typography variant="body2" className="text-purple-600">
                  156GB / 500GB
                </Typography>
              </Box>
              <Box className="flex items-center justify-between">
                <Typography variant="body2">Network</Typography>
                <Typography variant="body2" className="text-red-600">
                  Active
                </Typography>
              </Box>
            </Box>
          </ModernCard>
        </Grid>
      </Grid>

      {/* Knowledge Databases Section */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <KnowledgeDatabases />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EnhancedDashboard;

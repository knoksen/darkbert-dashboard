import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Storage,
  CloudUpload,
  DeleteOutline,
  InfoOutlined,
} from "@mui/icons-material";
import ModernCard from "./ModernCard";

interface Database {
  id: string;
  name: string;
  size: string;
  records: number;
  lastUpdated: string;
  status: "active" | "updating" | "error";
  usagePercentage: number;
}

const mockDatabases: Database[] = [
  {
    id: "1",
    name: "Threat Patterns DB",
    size: "2.4 GB",
    records: 1250000,
    lastUpdated: "2025-07-19",
    status: "active",
    usagePercentage: 78,
  },
  {
    id: "2",
    name: "Security Vectors",
    size: "1.8 GB",
    records: 890000,
    lastUpdated: "2025-07-20",
    status: "updating",
    usagePercentage: 45,
  },
  {
    id: "3",
    name: "Attack Signatures",
    size: "3.1 GB",
    records: 1750000,
    lastUpdated: "2025-07-18",
    status: "active",
    usagePercentage: 92,
  },
];

const getStatusColor = (status: Database["status"]) => {
  switch (status) {
    case "active":
      return "text-green-500";
    case "updating":
      return "text-blue-500";
    case "error":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const getStatusText = (status: Database["status"]) => {
  switch (status) {
    case "active":
      return "Active";
    case "updating":
      return "Updating...";
    case "error":
      return "Error";
    default:
      return status;
  }
};

const KnowledgeDatabases: React.FC = () => {
  return (
    <ModernCard className="p-6">
      <Box className="mb-6 flex justify-between items-center">
        <Box className="flex items-center gap-2">
          <Storage className="text-blue-500" />
          <Typography
            variant="h6"
            className="font-bold text-gray-800 dark:text-white"
          >
            Knowledge Databases
          </Typography>
        </Box>
        <Tooltip title="Upload new database">
          <IconButton className="text-blue-500 hover:text-blue-600">
            <CloudUpload />
          </IconButton>
        </Tooltip>
      </Box>

      <Box className="space-y-6">
        {mockDatabases.map((db) => (
          <Box
            key={db.id}
            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <Box className="flex justify-between items-start mb-3">
              <Box>
                <Typography
                  variant="subtitle1"
                  className="font-medium text-gray-800 dark:text-white"
                >
                  {db.name}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-500 dark:text-gray-400"
                >
                  {db.size} • {db.records.toLocaleString()} records
                </Typography>
              </Box>
              <Box className="flex items-center gap-2">
                <Typography
                  variant="caption"
                  className={`${getStatusColor(db.status)} font-medium`}
                >
                  {getStatusText(db.status)}
                </Typography>
                <Tooltip title="Database details">
                  <IconButton
                    size="small"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <InfoOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete database">
                  <IconButton
                    size="small"
                    className="text-gray-400 hover:text-red-500"
                  >
                    <DeleteOutline fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Box className="space-y-1">
              <Box className="flex justify-between items-center mb-1">
                <Typography
                  variant="caption"
                  className="text-gray-500 dark:text-gray-400"
                >
                  Storage usage
                </Typography>
                <Typography
                  variant="caption"
                  className="text-gray-600 dark:text-gray-300 font-medium"
                >
                  {db.usagePercentage}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={db.usagePercentage}
                className={`h-1.5 rounded-full ${
                  db.usagePercentage > 90
                    ? "bg-red-100 dark:bg-red-900"
                    : db.usagePercentage > 70
                    ? "bg-yellow-100 dark:bg-yellow-900"
                    : "bg-blue-100 dark:bg-blue-900"
                }`}
                classes={{
                  bar: `${
                    db.usagePercentage > 90
                      ? "bg-red-500"
                      : db.usagePercentage > 70
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`,
                }}
              />
            </Box>

            <Box className="mt-3 flex items-center gap-4">
              <Typography
                variant="caption"
                className="text-gray-500 dark:text-gray-400"
              >
                Last updated: {new Date(db.lastUpdated).toLocaleDateString()}
              </Typography>
              {db.status === "updating" && (
                <Box className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <Typography variant="caption" className="text-blue-500">
                    Syncing new data...
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      <Box className="mt-4 flex justify-center">
        <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1">
          View all databases
          <span className="text-lg">→</span>
        </button>
      </Box>
    </ModernCard>
  );
};

export default KnowledgeDatabases;

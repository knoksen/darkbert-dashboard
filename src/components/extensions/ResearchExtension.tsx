import React, { useState } from "react";
import { Box, Typography, TextField, Button, Chip, Grid } from "@mui/material";
import { Search, Description, Download, Share } from "@mui/icons-material";
import ModernCard from "@/components/ui/ModernCard";

interface ResearchResult {
  id: string;
  title: string;
  summary: string;
  confidence: number;
  source: string;
  timestamp: string;
}

const ResearchExtension: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<ResearchResult[]>([]);

  const mockResults: ResearchResult[] = [
    {
      id: "1",
      title: "Dark Web Threat Intelligence Report Q4 2024",
      summary:
        "Comprehensive analysis of emerging threats in dark web marketplaces, focusing on ransomware-as-a-service trends.",
      confidence: 94.7,
      source: "DarkBERT AI",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      title: "Cryptocurrency Laundering Patterns",
      summary:
        "Advanced detection of cryptocurrency mixing services and laundering techniques using ML models.",
      confidence: 89.3,
      source: "Blockchain Analysis",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      title: "Underground Forum Activity Analysis",
      summary:
        "Real-time monitoring of underground forums and marketplaces for threat actor communications.",
      confidence: 91.8,
      source: "Forum Intelligence",
      timestamp: "1 day ago",
    },
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <Box className="p-6 space-y-6">
      <Typography
        variant="h4"
        className="font-bold text-gray-800 dark:text-white"
      >
        Research Extension
      </Typography>

      {/* Search Section */}
      <ModernCard title="Advanced Research Query">
        <Box className="space-y-4">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter research query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            InputProps={{
              startAdornment: <Search className="mr-2 text-gray-400" />,
            }}
          />
          <Box className="flex gap-2">
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={isSearching || !query}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
            <Button variant="outlined">Advanced Filters</Button>
          </Box>
        </Box>
      </ModernCard>

      {/* Results Section */}
      <Grid container spacing={3}>
        {results.map((result) => (
          <Grid item xs={12} key={result.id}>
            <ModernCard>
              <Box className="space-y-3">
                <Box className="flex items-start justify-between">
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-800 dark:text-white"
                  >
                    {result.title}
                  </Typography>
                  <Chip
                    label={`${result.confidence}% confidence`}
                    color={result.confidence > 90 ? "success" : "warning"}
                    size="small"
                  />
                </Box>

                <Typography
                  variant="body2"
                  className="text-gray-600 dark:text-gray-300"
                >
                  {result.summary}
                </Typography>

                <Box className="flex items-center justify-between">
                  <Box className="flex items-center gap-4">
                    <Typography variant="caption" className="text-gray-500">
                      Source: {result.source}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {result.timestamp}
                    </Typography>
                  </Box>

                  <Box className="flex gap-2">
                    <Button
                      size="small"
                      startIcon={<Description />}
                      variant="outlined"
                    >
                      View Details
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Download />}
                      variant="outlined"
                    >
                      Export
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Share />}
                      variant="outlined"
                    >
                      Share
                    </Button>
                  </Box>
                </Box>
              </Box>
            </ModernCard>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ModernCard title="Quick Research">
            <Box className="space-y-3">
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Search />}
                className="justify-start"
              >
                Latest Threat Reports
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Search />}
                className="justify-start"
              >
                IOC Analysis
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Search />}
                className="justify-start"
              >
                Vulnerability Research
              </Button>
            </Box>
          </ModernCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ModernCard title="Saved Searches">
            <Box className="space-y-2">
              <Typography
                variant="body2"
                className="text-gray-600 dark:text-gray-300"
              >
                • Ransomware Campaigns
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-600 dark:text-gray-300"
              >
                • APT Group Activities
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-600 dark:text-gray-300"
              >
                • Zero-day Exploits
              </Typography>
            </Box>
          </ModernCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ModernCard title="Research Stats">
            <Box className="space-y-2">
              <Typography variant="body2">
                Total Queries: <strong>1,247</strong>
              </Typography>
              <Typography variant="body2">
                Success Rate: <strong>94.7%</strong>
              </Typography>
              <Typography variant="body2">
                Avg Response Time: <strong>2.3s</strong>
              </Typography>
            </Box>
          </ModernCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResearchExtension;

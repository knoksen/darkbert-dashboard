import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import useMetrics from "@/hooks/useMetrics";

export default function DashboardChart() {
  const { data, isLoading, error } = useMetrics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Error loading metrics
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Validate data structure
  if (
    !Array.isArray(data.epochs) ||
    !Array.isArray(data.train_loss) ||
    !Array.isArray(data.val_loss)
  ) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-center text-gray-600 dark:text-gray-400">
          Invalid metrics data format
        </div>
      </div>
    );
  }

  // Ensure all arrays have the same length
  const minLength = Math.min(
    data.epochs.length,
    data.train_loss.length,
    data.val_loss.length
  );

  const chartData = Array.from({ length: minLength }, (_, idx) => ({
    epoch: data.epochs[idx],
    train: data.train_loss[idx],
    val: data.val_loss[idx],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="epoch" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="train"
          stroke="#3f51b5"
          strokeWidth={2}
        />
        <Line type="monotone" dataKey="val" stroke="#f50057" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

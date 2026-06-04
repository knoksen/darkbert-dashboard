import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  LinearProgress,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
} from "@mui/material";
import { Add, CheckCircleOutline, Replay } from "@mui/icons-material";
import ModernCard from "@/components/ui/ModernCard";

type TaskPriority = "normal" | "high";

type TaskFilter = "all" | "pending" | "completed" | "high";

interface TrainingTask {
  id: string;
  title: string;
  note: string;
  dueDate: string;
  priority: TaskPriority;
  completed: boolean;
}

const todayDate = new Date().toISOString().slice(0, 10);

const initialTasks: TrainingTask[] = [
  {
    id: "1",
    title: "Review dataset labels",
    note: "Confirm annotations before the next training cycle.",
    dueDate: todayDate,
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Refine loss monitoring",
    note: "Add a lightweight checkpoint alert for validation loss.",
    dueDate: todayDate,
    priority: "normal",
    completed: false,
  },
  {
    id: "3",
    title: "Archive completed experiments",
    note: "Move stale runs to the experiment archive.",
    dueDate: "2026-06-07",
    priority: "normal",
    completed: true,
  },
];

const filterOptions: TaskFilter[] = ["all", "pending", "completed", "high"];

const formatDueDate = (dueDate: string) => {
  const date = new Date(dueDate);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};

const TrainingExtension: React.FC = () => {
  const [tasks, setTasks] = useState<TrainingTask[]>(initialTasks);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDueDate, setTaskDueDate] = useState(todayDate);
  const [taskPriority, setTaskPriority] = useState<TaskPriority>("normal");
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("all");

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );
  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  const matchesFilter = (task: TrainingTask) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "pending") return !task.completed;
    if (activeFilter === "completed") return task.completed;
    return task.priority === "high";
  };

  const todayTasks = tasks.filter(
    (task) => !task.completed && task.dueDate === todayDate && matchesFilter(task)
  );
  const upcomingTasks = tasks
    .filter(
      (task) =>
        !task.completed && task.dueDate > todayDate && matchesFilter(task)
    )
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const completedTasks = tasks.filter(
    (task) => task.completed && matchesFilter(task)
  );

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!taskTitle.trim()) {
      return;
    }

    const nextTask: TrainingTask = {
      id: String(Date.now()),
      title: taskTitle.trim(),
      note: "Keep the training pipeline moving with a small, focused action.",
      dueDate: taskDueDate,
      priority: taskPriority,
      completed: false,
    };

    setTasks((current) => [nextTask, ...current]);
    setTaskTitle("");
    setTaskDueDate(todayDate);
    setTaskPriority("normal");
  };

  const toggleComplete = (taskId: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const renderTaskRow = (task: TrainingTask) => (
    <Box
      key={task.id}
      className="rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20"
    >
      <Box className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <Box>
          <Typography
            variant="subtitle1"
            className={task.completed ? "line-through text-slate-400" : ""}
          >
            {task.title}
          </Typography>
          <Typography variant="body2" className="text-slate-400 mt-1">
            {task.note}
          </Typography>
          <Box className="mt-3 flex flex-wrap gap-2">
            <Chip
              label={`Due ${formatDueDate(task.dueDate)}`}
              size="small"
              variant="outlined"
            />
            <Chip
              label={task.priority === "high" ? "High Priority" : "Normal"}
              size="small"
              color={task.priority === "high" ? "error" : "default"}
            />
          </Box>
        </Box>

        <IconButton
          onClick={() => toggleComplete(task.id)}
          color={task.completed ? "secondary" : "primary"}
          size="large"
          aria-label={task.completed ? "Reopen task" : "Complete task"}
        >
          {task.completed ? <Replay /> : <CheckCircleOutline />}
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box className="p-6 space-y-6">
      <Typography variant="h4" className="font-bold text-gray-800 dark:text-white">
        Training To-Do List
      </Typography>

      <ModernCard gradient>
        <Box className="space-y-4">
          <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Box>
              <Typography variant="h6">Weekly training workflow</Typography>
              <Typography variant="body2" className="text-slate-200">
                Track priorities, due dates, and completed steps for model training.
              </Typography>
            </Box>
            <Typography variant="h6">{progress}% complete</Typography>
          </Box>
          <Box className="space-y-2">
            <Typography variant="body2">{completedCount} of {tasks.length} tasks finished</Typography>
            <LinearProgress value={progress} variant="determinate" />
          </Box>
        </Box>
      </ModernCard>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={5}>
          <ModernCard title="Add new training task">
            <Box component="form" className="space-y-4" onSubmit={handleAddTask}>
              <TextField
                label="Task title"
                value={taskTitle}
                onChange={(event) => setTaskTitle(event.target.value)}
                fullWidth
                size="small"
              />
              <Box className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Due date"
                  type="date"
                  value={taskDueDate}
                  onChange={(event) => setTaskDueDate(event.target.value)}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  fullWidth
                />
                <FormControl fullWidth size="small">
                  <InputLabel id="task-priority-label">Priority</InputLabel>
                  <Select
                    labelId="task-priority-label"
                    label="Priority"
                    value={taskPriority}
                    onChange={(event) =>
                      setTaskPriority(event.target.value as TaskPriority)
                    }
                  >
                    <MenuItem value="normal">Normal</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Add />}
                fullWidth
              >
                Add training task
              </Button>
            </Box>
          </ModernCard>

          <ModernCard title="Filters">
            <Box className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <Button
                  key={option}
                  variant={activeFilter === option ? "contained" : "outlined"}
                  size="small"
                  onClick={() => setActiveFilter(option)}
                >
                  {option === "all"
                    ? "All"
                    : option === "pending"
                    ? "Pending"
                    : option === "completed"
                    ? "Completed"
                    : "High Priority"}
                </Button>
              ))}
            </Box>
          </ModernCard>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ModernCard title="Today">
                <Box className="space-y-4">
                  {todayTasks.length ? (
                    todayTasks.map(renderTaskRow)
                  ) : (
                    <Typography variant="body2" className="text-slate-400">
                      No training tasks scheduled for today.
                    </Typography>
                  )}
                </Box>
              </ModernCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <ModernCard title="Upcoming">
                <Box className="space-y-4">
                  {upcomingTasks.length ? (
                    upcomingTasks.map(renderTaskRow)
                  ) : (
                    <Typography variant="body2" className="text-slate-400">
                      No upcoming training tasks yet.
                    </Typography>
                  )}
                </Box>
              </ModernCard>
            </Grid>
            <Grid item xs={12}>
              <ModernCard title="Completed">
                <Box className="space-y-4">
                  {completedTasks.length ? (
                    completedTasks.map(renderTaskRow)
                  ) : (
                    <Typography variant="body2" className="text-slate-400">
                      Completed tasks will appear here once you mark them done.
                    </Typography>
                  )}
                </Box>
              </ModernCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrainingExtension;

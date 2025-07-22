import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  prefix = "",
  suffix = "",
  className,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;

    if (start === end) {
      setCount(end);
      return;
    }

    const incrementTime = Math.max(16, duration / Math.abs(end - start));
    const step = Math.max(
      1,
      Math.ceil(Math.abs(end - start) / (duration / incrementTime))
    );

    const timer = setInterval(() => {
      if (start < end) {
        start = Math.min(start + step, end);
      } else {
        start = Math.max(start - step, end);
      }

      setCount(start);

      if (start === end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <Typography className={className}>
      {prefix}
      {Math.round(count).toLocaleString()}
      {suffix}
    </Typography>
  );
};

export default AnimatedCounter;

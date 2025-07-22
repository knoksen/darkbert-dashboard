import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

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
  prefix = '',
  suffix = '',
  className,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const incrementTime = (duration / end) * 10;
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / 10));
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <Typography className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </Typography>
  );
};

export default AnimatedCounter;

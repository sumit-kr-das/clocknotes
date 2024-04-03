"use client";
import React from "react";

type props = {
  startAt: Date;
};

export const pad = (n: number) => n.toString().padStart(2, "0");

const TimerActivity = ({ startAt }: props) => {
  const [elapsed, setElapsed] = React.useState<number>(0);
  const now = new Date();

  React.useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = now.getTime() - startAt.getTime();
      setElapsed(elapsed);
    }, 1000);
    return () => clearInterval(interval);
  });

  const hours = Math.floor(elapsed / 1000 / 60 / 60);
  const minutes = Math.floor((elapsed / 1000 / 60) % 60);
  const seconds = Math.floor((elapsed / 1000) % 60);

  return (
    <div className="flex justify-center items-center h-full">
      <span className="slashed-zero tabular-nums text-9xl">
        {pad(hours)}:{pad(minutes)}
        <span className="text-gray-500">:{pad(seconds)}</span>
      </span>
    </div>
  );
};

export default TimerActivity;

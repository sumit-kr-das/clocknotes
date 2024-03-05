import React from "react";

type props = {
  startAt: Date;
};

const pad = (n: number) => n.toString().padStart(2, "0");

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
    <div className="slashed-zero tabular-nums text-lg font-bold w-[200px]">
      {pad(hours)} : {pad(minutes)} : {pad(seconds)}
    </div>
  );
};

export default TimerActivity;

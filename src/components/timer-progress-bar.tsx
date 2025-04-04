import { useEffect, useState } from "react";

export default function TimerProgressBar({
  currentTime,
  totalTime,
}: {
  currentTime: number;
  totalTime: number;
}) {
  const [percent, setPercent] = useState(100);
  useEffect(() => {
    const newPercent = ((totalTime - currentTime) / totalTime) * 100;
    setPercent(newPercent > 0 ? newPercent : 0);
  }, [currentTime, totalTime]);
  return (
    <div className={"h-1 w-full bg-gray-200 rounded-full"}>
      <div
        className={`h-full transition-all duration-300 ${
          percent > 50
            ? "bg-green-500"
            : percent > 20
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}

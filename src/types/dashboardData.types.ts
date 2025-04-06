export type userPerformanceDataType = {
  weekData: chartAllDataType | null;
  monthData: chartAllDataType | null;
  yearData: chartAllDataType | null;
  allData: chartAllDataType | null;
};

export type chartAllDataType = {
  chartHeaders: {
    averages: {
      // average values of that time frame based on chartOptions
      avgAccuracy: number;
      avgSpeed: number;
      avgScore: number;
    };
    improvements: {
      // +ve if improved compared to last time period, -ve otherwise
      accuracy: number;
      speed: number;
      score: number;
    };
  };
  chartData: chartDataType;
};

export type chartDataType = {
  timestamp: number;
  accuracy: number;
  speed: number;
  score: number;
}[];

export type metricType = "accuracy" | "speed" | "score";

export type intervalType = "week" | "month" | "year" | "all" | undefined;

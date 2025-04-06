"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Gauge,
  Star,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  chartAllDataType,
  intervalType,
  metricType,
  userPerformanceDataType,
} from "@/types/dashboardData.types";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { format } from "date-fns";
import Header from "@/components/header";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Dashboard() {
  // data for dev
  const userProfileData = {
    name: "Vatsal Mavani",
    // average over last 10 to 15 sessions
    data: {
      avgAccuracy: 93.2,
      avgSpeed: 2.04,
      avgScore: 4293,
    },
  };

  const [metric, setMetric] = useState<metricType>("accuracy");
  const [interval, setInterval] = useState<intervalType>(undefined);

  const [userPerformanceData, setUserPerformanceData] =
    useState<userPerformanceDataType>({
      weekData: null,
      monthData: null,
      yearData: null,
      allData: null,
    });

  // add chart data if not already done
  useEffect(() => {
    if (interval && !userPerformanceData[`${interval}Data`]) {
      const fetchUserData = (interval: intervalType) => {
        // async request to backend

        // data for dev
        const someData: chartAllDataType = {
          chartHeaders: {
            averages: {
              // average values of that time frame based on chartOptions
              avgAccuracy: 98.14,
              avgSpeed: 4.28,
              avgScore: 980,
            },
            improvements: {
              // +ve if improved compared to last time period, -ve otherwise
              accuracy: 2.91,
              speed: 0.48,
              score: -72,
            },
          },
          chartData: [
            { timestamp: 1733424000, accuracy: 95.32, speed: 3.75, score: 812 },
            { timestamp: 1833510400, accuracy: 87.45, speed: 4.28, score: 677 },
            { timestamp: 1933596800, accuracy: 91.78, speed: 5.15, score: 721 },
            { timestamp: 2033683200, accuracy: 99.12, speed: 3.62, score: 945 },
            { timestamp: 2133769600, accuracy: 82.39, speed: 5.87, score: 591 },
            { timestamp: 2233856000, accuracy: 88.67, speed: 4.01, score: 684 },
            { timestamp: 2333942400, accuracy: 73.25, speed: 3.46, score: 825 },
            { timestamp: 2534028800, accuracy: 85.9, speed: 5.42, score: 638 },
            { timestamp: 2734115200, accuracy: 97.1, speed: 3.21, score: 912 },
            {
              timestamp: 3034201600,
              accuracy: 90.45,
              speed: 1.89,
              score: 759,
            },
          ],
        };
        return someData;
      };
      const userData = fetchUserData(interval);

      const getLabeledData = (userData: chartAllDataType) => {
        let labeled = null;
        if (interval === "week") {
          labeled = userData.chartData.map((ob) => {
            return { ...ob, timestamp: format(new Date(ob.timestamp), "EEE") };
          });
        } else if (interval === "month") {
          labeled = userData.chartData.map((ob) => {
            return {
              ...ob,
              timestamp: format(new Date(ob.timestamp), "d MMM"),
            };
          });
        } else if (interval === "year") {
          labeled = userData.chartData.map((ob) => {
            return { ...ob, timestamp: format(new Date(ob.timestamp), "MMM") };
          });
        } else if (interval === "all") {
          labeled = userData.chartData.map((ob) => {
            return {
              ...ob,
              timestamp: format(new Date(ob.timestamp), "MMM yy"),
            };
          });
        }
        return {
          ...userData,
          chartData: labeled,
        };
      };
      const labeledData = getLabeledData(userData);

      setUserPerformanceData((prev) => {
        return {
          ...prev,
          [`${interval}Data`]: labeledData,
        };
      });
    }
  }, [interval]);

  const getChartColor = () => {
    if (userPerformanceData && interval) {
      const arr = userPerformanceData[`${interval}Data`]?.chartData;
      if (arr) {
        const diff = arr[arr.length - 1][`${metric}`] - arr[0][`${metric}`];
        if (metric === "accuracy" || metric === "score") {
          if (diff > 0) return "var(--chart-positive)";
          else return "var(--chart-negative)";
        } else if (metric === "speed") {
          if (diff > 0) return "var(--chart-negative)";
          else return "var(--chart-positive)";
        }
      }
      return "";
    }
    return "";
  };

  const getChartDomain = () => {
    if (userPerformanceData && interval) {
      const arr = userPerformanceData[`${interval}Data`]?.chartData;
      if (arr) {
        if (metric === "accuracy") {
          const mn = Math.min(...arr.map((d) => d[metric])) - 5;
          const mx = Math.max(...arr.map((d) => d[metric])) + 5;
          const mnRound = Math.floor(mn / 5) * 5;
          const mxRound = Math.ceil(mx / 5) * 5;
          return [Math.max(0, mnRound), Math.min(100, mxRound)];
        } else if (metric === "speed") {
          const mn = Math.min(...arr.map((d) => d[metric])) - 2;
          const mx = Math.max(...arr.map((d) => d[metric])) + 2;
          const mnRound = Math.floor(mn / 2) * 2;
          const mxRound = Math.ceil(mx / 2) * 2;
          return [Math.max(0, mnRound), Math.min(100, mxRound)];
        } else if (metric === "score") {
          const mn = Math.min(...arr.map((d) => d[metric])) - 100;
          const mx = Math.max(...arr.map((d) => d[metric])) + 100;
          const mnRound = Math.floor(mn / 100) * 100;
          const mxRound = Math.ceil(mx / 100) * 100;
          return [Math.max(0, mnRound), Math.min(5000, mxRound)];
        }
      }
      return [0, 100];
    }
    return [0, 100];
  };

  const getTickCount = () => {
    if (userPerformanceData && interval) {
      const arr = userPerformanceData[`${interval}Data`]?.chartData;
      if (arr) {
        const domain = getChartDomain();
        if (metric === "accuracy") {
          return Math.round((domain[1] - domain[0]) / 5) + 1;
        } else if (metric === "speed") {
          return Math.round((domain[1] - domain[0]) / 2) + 1;
        } else if (metric === "score") {
          return Math.round((domain[1] - domain[0]) / 100) + 1;
        }
      }
      return 11;
    }
    return 11;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link
            href="/score-calculation"
            className="text-sm font-medium hover:text-primary"
          >
            Scoring
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
        </nav>
      </Header>
      <main className="flex-1 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col inset-0 mx-auto max-w-5xl py-8 md:py-12">
          {/* Profile Section */}
          <div className="flex justify-center items-center">
            <div className="text-5xl font-semibold rounded-full bg-muted size-24 flex justify-center items-center">
              {userProfileData.name.charAt(0)}
            </div>
            <div className="flex flex-col ml-4">
              <div className="text-4xl font-semibold mb-2">
                {userProfileData.name}
              </div>
              <Separator />
              <div className="text-sm mt-2 text-muted-foreground">
                Accuracy: {userProfileData.data.avgAccuracy}% | Speed:{" "}
                {userProfileData.data.avgSpeed}s | Score:{" "}
                {userProfileData.data.avgScore}
              </div>
            </div>
          </div>

          {/* Charts */}
          <Tabs
            defaultValue="accuracy"
            onValueChange={(val) => setMetric(val as metricType)}
            value={metric}
            className="mt-8"
          >
            {/* Select a metric */}
            {/* TODO: animate the sliding effect */}
            <TabsList className="mx-auto w-full h-10 max-w-md border p-0">
              <TabsTrigger value="accuracy">
                <Target className="h-6 w-6" />
                Accuracy
              </TabsTrigger>
              <TabsTrigger value="speed">
                <Gauge />
                Speed
              </TabsTrigger>
              <TabsTrigger value="score">
                <Star />
                Score
              </TabsTrigger>
            </TabsList>

            {/* Select an interval */}
            <div className="flex justify-center items-center mt-4 gap-2">
              <Calendar />
              <Select
                defaultValue={undefined}
                value={interval}
                onValueChange={(val) => setInterval(val as intervalType)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last week</SelectItem>
                  <SelectItem value="month">Last month</SelectItem>
                  <SelectItem value="year">Last year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Chart */}
            <div className="border rounded-2xl mt-4 p-4">
              {interval ? (
                userPerformanceData[`${interval}Data`] ? (
                  <>
                    <TabsContent value="accuracy">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-2 items-center justify-center">
                          <Target className="h-8 w-8" />
                          <div className="flex flex-col">
                            <div className="text-xl font-semibold">
                              Accuracy
                            </div>
                            <Separator />
                            <div className="text-muted-foreground text-sm">
                              % of correct answers
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="text-2xl">
                                  {
                                    userPerformanceData[`${interval}Data`]
                                      ?.chartHeaders.averages.avgAccuracy
                                  }
                                  %
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                {interval !== "all" ? (
                                  <p>
                                    Average {metric} of this {interval}
                                  </p>
                                ) : (
                                  <p>Average {metric} of all time</p>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          {interval !== "all" && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className={`flex text-sm items-center justify-center ${
                                      (userPerformanceData[`${interval}Data`]
                                        ?.chartHeaders.improvements
                                        .accuracy as number) > 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {(userPerformanceData[`${interval}Data`]
                                      ?.chartHeaders.improvements
                                      .accuracy as number) > 0 ? (
                                      <ArrowUp className="h-4 w-4" />
                                    ) : (
                                      <ArrowDown className="h-4 w-4" />
                                    )}
                                    <div>
                                      {Math.abs(
                                        userPerformanceData[`${interval}Data`]
                                          ?.chartHeaders.improvements
                                          .accuracy as number
                                      )}
                                      %
                                    </div>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    Improvement over previous {interval}'s
                                    average
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                      <ChartContainer
                        config={{ accuracy: { label: "Accuracy" } }}
                        className="h-64 sm:h-100 w-full aspect-auto"
                      >
                        <AreaChart
                          data={
                            userPerformanceData[`${interval}Data`]?.chartData
                          }
                        >
                          <defs>
                            <linearGradient
                              id="fillAccuracy"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor={getChartColor()}
                                stopOpacity={0.35}
                              />
                              <stop
                                offset="100%"
                                stopColor={getChartColor()}
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            dataKey="accuracy"
                            type="natural"
                            fill="url(#fillAccuracy)"
                            stroke={getChartColor()}
                          />
                          <CartesianGrid vertical={false} />
                          <ChartTooltip
                            content={<ChartTooltipContent indicator="line" />}
                            cursor={false}
                          />
                          <XAxis dataKey="timestamp" tickCount={11} />
                          <YAxis
                            domain={getChartDomain()}
                            tickFormatter={(value) => `${value}%`}
                            tickCount={getTickCount()}
                          />
                        </AreaChart>
                      </ChartContainer>
                    </TabsContent>

                    <TabsContent value="speed">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-2 items-center justify-center">
                          <Gauge className="h-8 w-8" />
                          <div className="flex flex-col">
                            <div className="text-xl font-semibold">Speed</div>
                            <Separator />
                            <div className="text-muted-foreground text-sm">
                              time (in seconds) per problem
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="text-2xl">
                                  {
                                    userPerformanceData[`${interval}Data`]
                                      ?.chartHeaders.averages.avgSpeed
                                  }
                                  s
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                {interval !== "all" ? (
                                  <p>
                                    Average {metric} of this {interval}
                                  </p>
                                ) : (
                                  <p>Average {metric} of all time</p>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          {interval !== "all" && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className={`flex text-sm items-center justify-center ${
                                      (userPerformanceData[`${interval}Data`]
                                        ?.chartHeaders.improvements
                                        .speed as number) > 0
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }`}
                                  >
                                    {(userPerformanceData[`${interval}Data`]
                                      ?.chartHeaders.improvements
                                      .speed as number) > 0 ? (
                                      <ArrowUp className="h-4 w-4" />
                                    ) : (
                                      <ArrowDown className="h-4 w-4" />
                                    )}
                                    <div>
                                      {Math.abs(
                                        userPerformanceData[`${interval}Data`]
                                          ?.chartHeaders.improvements
                                          .speed as number
                                      )}
                                      s
                                    </div>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    Improvement over previous {interval}'s
                                    average
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                      <ChartContainer
                        config={{ speed: { label: "Speed" } }}
                        className="h-64 sm:h-100 w-full aspect-auto"
                      >
                        <AreaChart
                          data={
                            userPerformanceData[`${interval}Data`]?.chartData
                          }
                        >
                          <defs>
                            <linearGradient
                              id="fillSpeed"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor={getChartColor()}
                                stopOpacity={0.35}
                              />
                              <stop
                                offset="100%"
                                stopColor={getChartColor()}
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            dataKey="speed"
                            type="natural"
                            fill="url(#fillSpeed)"
                            stroke={getChartColor()}
                          />
                          <CartesianGrid vertical={false} />
                          <ChartTooltip
                            content={<ChartTooltipContent indicator="line" />}
                            cursor={false}
                          />
                          <XAxis dataKey="timestamp" tickCount={11} />
                          <YAxis
                            domain={getChartDomain()}
                            tickFormatter={(value) => `${value}s`}
                            tickCount={getTickCount()}
                          />
                        </AreaChart>
                      </ChartContainer>
                    </TabsContent>

                    <TabsContent value="score">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-2 items-center justify-center">
                          <Star className="h-8 w-8" />
                          <div className="flex flex-col">
                            <div className="text-xl font-semibold">Score</div>
                            <Separator />
                            <div className="text-muted-foreground text-sm">
                              combined metric of speed and accuracy
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="text-2xl">
                                  {
                                    userPerformanceData[`${interval}Data`]
                                      ?.chartHeaders.averages.avgScore
                                  }
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                {interval !== "all" ? (
                                  <p>
                                    Average {metric} of this {interval}
                                  </p>
                                ) : (
                                  <p>Average {metric} of all time</p>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          {interval !== "all" && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className={`flex text-sm items-center justify-center ${
                                      (userPerformanceData[`${interval}Data`]
                                        ?.chartHeaders.improvements
                                        .score as number) > 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {(userPerformanceData[`${interval}Data`]
                                      ?.chartHeaders.improvements
                                      .score as number) > 0 ? (
                                      <ArrowUp className="h-4 w-4" />
                                    ) : (
                                      <ArrowDown className="h-4 w-4" />
                                    )}
                                    <div>
                                      {Math.abs(
                                        userPerformanceData[`${interval}Data`]
                                          ?.chartHeaders.improvements
                                          .score as number
                                      )}
                                    </div>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    Improvement over previous {interval}'s
                                    average
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                      <ChartContainer
                        config={{ score: { label: "Score" } }}
                        className="h-64 sm:h-100 w-full aspect-auto"
                      >
                        <AreaChart
                          data={
                            userPerformanceData[`${interval}Data`]?.chartData
                          }
                        >
                          <defs>
                            <linearGradient
                              id="fillScore"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor={getChartColor()}
                                stopOpacity={0.35}
                              />
                              <stop
                                offset="100%"
                                stopColor={getChartColor()}
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            dataKey="score"
                            type="natural"
                            fill="url(#fillScore)"
                            stroke={getChartColor()}
                          />
                          <CartesianGrid vertical={false} />
                          <ChartTooltip
                            content={<ChartTooltipContent indicator="line" />}
                            cursor={false}
                          />
                          <XAxis dataKey="timestamp" tickCount={11} />
                          <YAxis
                            domain={getChartDomain()}
                            tickCount={getTickCount()}
                          />
                        </AreaChart>
                      </ChartContainer>
                    </TabsContent>
                  </>
                ) : (
                  <div className="text-muted-foreground flex items-center justify-center">
                    Loading the chart...
                  </div>
                )
              ) : (
                <div className="text-muted-foreground flex items-center justify-center">
                  Please select a time period to see a chart
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

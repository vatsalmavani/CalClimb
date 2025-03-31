"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Clock,
  SkipForward,
  RefreshCw,
  ChevronLeft,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";

export default function PracticePage() {
  // State for the current problem
  const [problem, setProblem] = useState({
    question: "847 × 36",
    answer: "30492",
    difficulty: "Medium",
    category: "Multiplication",
  });

  // State for user input and validation
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Stats
  const [stats, setStats] = useState({
    solved: 0,
    correct: 0,
    streak: 0,
    averageTime: 0,
  });

  // Ref for input auto-focus
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Format seconds to MM:SS
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Generate a new problem
  const generateNewProblem = () => {
    // In a real app, this would fetch from an API or generate algorithmically
    // For this example, we'll just use a few hardcoded problems
    const problems = [
      {
        question: "847 × 36",
        answer: "30492",
        difficulty: "Medium",
        category: "Multiplication",
      },
      {
        question: "1254 + 879",
        answer: "2133",
        difficulty: "Easy",
        category: "Addition",
      },
      {
        question: "5280 ÷ 12",
        answer: "440",
        difficulty: "Medium",
        category: "Division",
      },
      {
        question: "23% of 850",
        answer: "195.5",
        difficulty: "Hard",
        category: "Percentages",
      },
      {
        question: "√529",
        answer: "23",
        difficulty: "Medium",
        category: "Square Roots",
      },
    ];

    const newProblem = problems[Math.floor(Math.random() * problems.length)];
    setProblem(newProblem);
    setUserAnswer("");
    setIsCorrect(null);
    setShowFeedback(false);
    setSeconds(0);
    setIsTimerRunning(true);

    // Re-focus the input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Stop the timer
    setIsTimerRunning(false);

    // Check if the answer is correct
    const isAnswerCorrect = userAnswer === problem.answer;
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    // Update stats
    setStats((prev) => {
      const newStats = {
        solved: prev.solved + 1,
        correct: isAnswerCorrect ? prev.correct + 1 : prev.correct,
        streak: isAnswerCorrect ? prev.streak + 1 : 0,
        averageTime: Math.round(
          (prev.averageTime * prev.solved + seconds) / (prev.solved + 1)
        ),
      };
      return newStats;
    });
  };

  // Handle "Next Problem" after answering
  const handleNextProblem = () => {
    generateNewProblem();
  };

  // Handle skipping a problem
  const handleSkip = () => {
    setStats((prev) => ({
      ...prev,
      solved: prev.solved + 1,
      streak: 0,
    }));
    generateNewProblem();
  };

  // Determine timer color based on seconds elapsed
  const getTimerColor = () => {
    if (seconds < 10) return "text-green-500";
    if (seconds < 30) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex items-center gap-4">
        <Badge variant="outline" className="ml-4">
          {problem.category}
        </Badge>
        <Badge variant="secondary">{problem.difficulty}</Badge>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back to Home</span>
          </Link>
        </Button>
      </div>

      <main className="flex-1 container py-6 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Timer */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span
                className={`text-xl font-mono font-bold ${getTimerColor()}`}
              >
                {formatTime(seconds)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSkip}
                disabled={showFeedback}
              >
                <SkipForward className="h-4 w-4 mr-2" />
                Skip
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={generateNewProblem}
                disabled={showFeedback}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                New Problem
              </Button>
            </div>
          </div>

          {/* Problem Card */}
          <Card className="mb-8 shadow-lg border-2">
            <CardContent className="pt-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Calculate:
                </h1>
                <div className="text-3xl md:text-5xl font-mono bg-muted py-8 px-4 rounded-lg">
                  {problem.question}
                </div>
              </div>

              {/* Answer Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="answer" className="text-lg font-medium">
                      Your Answer:
                    </label>
                    {showFeedback && (
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-green-500 font-medium">
                              Correct!
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 text-red-500" />
                            <span className="text-red-500 font-medium">
                              Incorrect. The answer is {problem.answer}
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <Input
                    id="answer"
                    ref={inputRef}
                    type="text"
                    value={userAnswer}
                    onChange={handleInputChange}
                    className={`text-xl font-mono h-14 text-center ${
                      showFeedback
                        ? isCorrect
                          ? "border-green-500 focus-visible:ring-green-500"
                          : "border-red-500 focus-visible:ring-red-500"
                        : "border-primary focus-visible:ring-primary"
                    }`}
                    placeholder="Enter your answer here"
                    disabled={showFeedback}
                    autoComplete="off"
                  />
                </div>

                {showFeedback ? (
                  <Button
                    type="button"
                    className="w-full h-12 text-lg"
                    onClick={handleNextProblem}
                  >
                    Next Problem
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full h-12 text-lg"
                    disabled={!userAnswer}
                  >
                    Submit Answer
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Stats Section - Visible on all screen sizes */}
          <div className="space-y-4 mt-8">
            <h2 className="text-xl font-bold">Session Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-muted-foreground">Solved</p>
                    <p className="text-3xl font-bold">{stats.solved}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-muted-foreground">Correct</p>
                    <p className="text-3xl font-bold">{stats.correct}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-muted-foreground">Streak</p>
                    <p className="text-3xl font-bold">{stats.streak}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-muted-foreground">Avg Time</p>
                    <p className="text-3xl font-bold">
                      {formatTime(stats.averageTime)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium">Session Accuracy</h2>
              <span className="text-sm text-muted-foreground">
                {stats.solved > 0
                  ? `${Math.round((stats.correct / stats.solved) * 100)}%`
                  : "0%"}
              </span>
            </div>
            <Progress
              value={
                stats.solved > 0 ? (stats.correct / stats.solved) * 100 : 0
              }
              className="h-2"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

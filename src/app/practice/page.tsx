"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { SkipForward } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ruleDefinitionsType } from "@/types/difficultyLevel.types";
import { defaultRules, difficultyLevels } from "@/lib/constants";
import TimerProgressBar from "@/components/timer-progress-bar";
import { generateProblem } from "@/lib/utils";
import { problemType } from "@/types/problem.types";

export default function PracticePage() {
  // get rule definitions chosen by the user from backend
  const [ruleDefinitions, setRuleDefinitions] =
    useState<ruleDefinitionsType | null>(null);
  const getRuleDefinitions = (): ruleDefinitionsType => {
    return difficultyLevels[0].ruleDefinitions; // api call to backend
  };
  const def = getRuleDefinitions(); // await
  setTimeout(() => setRuleDefinitions(def), 1000);

  const [problem, setProblem] = useState<problemType | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [time, setTime] = useState(0); // time (in seconds) elapsed after the starting of a session

  const inputRef = useRef<HTMLInputElement>(null);
  const startTime = useRef(Date.now());
  const endTime = useRef(Date.now());
  const isFirstRun = useRef(true);
  const skipped = useRef(false);

  const [stats, setStats] = useState({
    solved: 0,
    correct: 0,
    streak: 0,
    totalTime: 0,
    score: 0,
  });

  useEffect(() => {
    if (!problem) return;
    if (inputRef) {
      inputRef.current?.focus();
      setUserAnswer("");
    }
    if (isFirstRun.current) {
      setStats({
        solved: 0,
        correct: 0,
        streak: 0,
        totalTime: 0,
        score: 0,
      });
      isFirstRun.current = false;
    } else {
      endTime.current = Date.now();
      const elapsedTime = endTime.current - startTime.current;
      startTime.current = Date.now();
      if (skipped.current) {
        setStats((prev) => ({
          solved: prev.solved + 1,
          correct: prev.correct,
          streak: 0,
          totalTime: prev.totalTime + elapsedTime,
          score: prev.score - problem.score / 2,
        }));
      } else {
        setStats((prev) => ({
          solved: prev.solved + 1,
          correct: prev.correct + 1,
          streak: prev.streak + 1,
          totalTime: prev.totalTime + elapsedTime,
          score: prev.score + problem.score,
        }));
      }
    }
  }, [problem]);

  useEffect(() => {
    if (ruleDefinitions) {
      setTime(0);
      const interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      startTime.current = Date.now();
      setProblem(generateProblem(ruleDefinitions));
      return () => clearInterval(interval);
    }
  }, [ruleDefinitions]);

  // generate new problem if solved
  useEffect(() => {
    const isCorrectAnswer =
      Math.abs(
        Number.parseFloat(userAnswer) - (problem?.solution ?? Infinity)
      ) < 0.001;
    if (userAnswer && isCorrectAnswer) {
      skipped.current = false;
      const newProblem = generateProblem(ruleDefinitions ?? defaultRules);
      setProblem(newProblem);
    }
  }, [userAnswer]);

  const handleSkip = () => {
    setProblem(generateProblem(ruleDefinitions ?? defaultRules));
    skipped.current = true;
  };

  if (!ruleDefinitions)
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-center px-4 md:px-6 lg:px-8">
          <div className="flex items-center font-bold text-xl">
            <Link href="/" className="text-primary hover:text-primary/80">
              CalClimb
            </Link>
          </div>
        </div>
        <TimerProgressBar
          currentTime={time}
          totalTime={ruleDefinitions.timeLimit}
        />
      </header>

      <main className="bg-muted flex-1 flex justify-center items-start md:items-center px-4 md:px-8 lg:px-12">
        <div className="flex-1 mx-auto max-w-5xl py-4 md:py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 md:relative md:translate-y-[-5%]">
            {/* Stats on PC */}
            <div className="md:col-span-2 flex items-center md:pr-4">
              <div className="max-md:hidden grid grid-cols-2 gap-4">
                <Card className="shadow-none">
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">Solved</p>
                    <p className="text-3xl font-bold">{stats.solved}</p>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">Streak</p>
                    <p className="text-3xl font-bold">{stats.streak}</p>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">Accuracy</p>
                    <p className="text-3xl font-bold">
                      {stats.solved > 0
                        ? ((stats.correct / stats.solved) * 100).toFixed(2)
                        : 100}
                      %
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">Avg Time</p>
                    <p className="text-3xl font-bold">
                      {stats.solved > 0
                        ? (
                            Math.round(stats.totalTime / stats.solved) / 1000
                          ).toFixed(2)
                        : "0.00"}
                      s
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Problem */}
            <div className="md:col-span-3 flex flex-col justify-center md:pl-4">
              <Card className="w-full shadow-md">
                <CardHeader>
                  <CardTitle className="text-center text-2xl md:text-3xl m-4">
                    Calculate:
                  </CardTitle>
                  <CardTitle className="bg-muted text-center text-4xl md:text-6xl m-4 py-4 px-8 rounded-lg">
                    {problem?.problem}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="number"
                    placeholder="Enter your answer here"
                    autoComplete="off"
                    className="h-8 w-1/2 mx-auto text-center"
                    value={userAnswer ?? ""}
                    onChange={(e) => setUserAnswer(e.target.value ?? "")}
                    ref={inputRef}
                  />
                </CardContent>
                <CardFooter className="mx-auto">
                  <Button variant="outline" onClick={handleSkip}>
                    <SkipForward className="h-4 w-4" />
                    Skip
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Stats on mobile */}
            <div className="md:hidden flex flex-col gap-2 my-8">
              <div className="text-bold">Stats:</div>
              <Separator />
              <div className="grid grid-cols-2">
                <div>
                  <span>Solved: </span>
                  <span className="text-muted-foreground">{stats.solved}</span>
                </div>
                <div>
                  <span>Streak: </span>
                  <span className="text-muted-foreground">{stats.streak}</span>
                </div>
                <div>
                  <span>Accuracy: </span>
                  <span className="text-muted-foreground">
                    {stats.solved > 0
                      ? ((stats.correct / stats.solved) * 100).toFixed(2)
                      : 100}
                    %
                  </span>
                </div>
                <div>
                  <span>Average Time: </span>
                  <span className="text-muted-foreground">
                    {stats.solved > 0
                      ? (
                          Math.round(stats.totalTime / stats.solved) / 1000
                        ).toFixed(2)
                      : "0.00"}
                    s
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

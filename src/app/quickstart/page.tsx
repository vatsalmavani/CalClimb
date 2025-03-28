"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  Trophy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ruleBook } from "@/lib/utils";

export default function PracticePage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );

  const difficultyLevels = [
    {
      id: "easy",
      title: "Easy",
      description:
        "Basic operations with smaller numbers. Perfect for beginners or warming up.",
      examples: ["23 + 45", "78 - 32", "6 × 8"],
      timeLimit: 45,
      icon: <Brain className="h-8 w-8" />,
      color: "bg-green-100 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      id: "medium",
      title: "Medium",
      description:
        "More complex calculations with larger numbers. Good for regular practice.",
      examples: ["127 + 385", "243 - 167", "24 × 16"],
      timeLimit: 60,
      icon: <Clock className="h-8 w-8" />,
      color: "bg-amber-100 dark:bg-amber-900/20",
      borderColor: "border-amber-200 dark:border-amber-800",
      textColor: "text-amber-600 dark:text-amber-400",
    },
    {
      id: "hard",
      title: "Hard",
      description:
        "Advanced calculations requiring multiple steps. For those seeking a challenge.",
      examples: ["847 × 36", "1250 ÷ 16", "15% of 840"],
      timeLimit: 90,
      icon: <Trophy className="h-8 w-8" />,
      color: "bg-red-100 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      textColor: "text-red-600 dark:text-red-400",
    },
  ];

  const tips = [
    "Start with an easier level if you're new to speed arithmetic",
    "Practice regularly - even 10 minutes daily makes a big difference",
    "Focus on accuracy first, then work on improving your speed",
    "Learn mental math shortcuts to solve problems more efficiently",
  ];

  const handleStartChallenge = () => {
    // In a real application, this would navigate to the challenge page
    // with the selected difficulty
    console.log(`Starting ${selectedDifficulty} challenge`);
    // You could use router.push(`/challenges/${selectedDifficulty}`) here
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
          <div className="flex items-center font-bold text-xl">CalClimb</div>
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
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Log in
            </Link>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col inset-0 mx-auto max-w-5xl py-12 md:py-16 lg:py-20">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Choose Your Challenge Level
            </h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Select a difficulty level that matches your current skills. You
              can always change levels later.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {difficultyLevels.map((level) => (
              <Card
                key={level.id}
                className={`m-0 p-0 cursor-pointer transition-all hover:shadow-md ${
                  selectedDifficulty === level.id
                    ? `border-2 ${level.borderColor} shadow-md`
                    : "border"
                }`}
                onClick={() => setSelectedDifficulty(level.id)}
              >
                <CardHeader className={`${level.color} rounded-t-lg p-4`}>
                  <CardTitle className="flex justify-between items-center">
                    <div className={level.textColor}>{level.icon}</div>
                    {selectedDifficulty === level.id && (
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    )}
                  </CardTitle>
                  <CardTitle className="text-2xl">{level.title}</CardTitle>
                  <CardDescription className="text-foreground/70">
                    {level.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Rules:</h3>
                      <ul className="space-y-1">
                        {ruleBook
                          .find((l) => l.id === level.id)
                          ?.rules.map((rule, index) => (
                            <li
                              key={index}
                              className="text-muted-foreground mt-1"
                            >
                              {rule}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Example Problems:</h3>
                      <ul className="space-y-1">
                        {level.examples.map((example, index) => (
                          <li key={index} className="text-muted-foreground">
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Time Limit:</h3>
                      <p className="text-muted-foreground">
                        {level.timeLimit.toString()} seconds
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pb-4">
                  <Button
                    variant={
                      selectedDifficulty === level.id ? "default" : "outline"
                    }
                    className="w-full"
                    onClick={() => setSelectedDifficulty(level.id)}
                  >
                    Select {level.title}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center">
            <Button
              size="lg"
              className="gap-2"
              disabled={!selectedDifficulty}
              onClick={handleStartChallenge}
            >
              Start Challenge
              <ArrowRight className="h-4 w-4" />
            </Button>
            {!selectedDifficulty && (
              <p className="mt-2 text-sm text-muted-foreground">
                Please select a difficulty level to continue
              </p>
            )}
          </div>

          <div className="mt-16 rounded-lg border bg-muted/50 p-6">
            <h2 className="text-xl font-semibold mb-4">Tips for Success</h2>
            <ul className="flex flex-col gap-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex gap-2">
                  <span className="max-sm:mt-1 flex justify-center items-center rounded-full bg-primary/20 h-6 aspect-square">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <footer className="w-full flex justify-center items-center py-4 bg-foreground">
        <div className="text-sm text-background">
          &copy; {new Date().getFullYear()} CalClimb. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

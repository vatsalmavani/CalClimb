"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { generateEasy, generateHard, generateMedium } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { difficultyLevels } from "@/lib/constants";

export default function PracticePage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [easyExamples, setEasyExamples] = useState<string[]>([]);
  const [mediumExamples, setMediumExamples] = useState<string[]>([]);
  const [hardExamples, setHardExamples] = useState<string[]>([]);

  useEffect(() => {
    setEasyExamples(Array.from({ length: 3 }, () => generateEasy().problem));
    setMediumExamples(
      Array.from({ length: 3 }, () => generateMedium().problem)
    );
    setHardExamples(Array.from({ length: 3 }, () => generateHard().problem));
  }, []);

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

  let levels = difficultyLevels;
  levels = levels.map((level) => {
    return {
      ...level,
      examples:
        level.id === "easy"
          ? easyExamples
          : level.id === "medium"
          ? mediumExamples
          : hardExamples,
    };
  });

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
        <div className="flex flex-col inset-0 mx-auto max-w-5xl py-12 md:py-16 lg:py-20">
          {/* Header Section */}
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

          {/* Difficulty Selection */}
          <div className="grid gap-6 md:grid-cols-3">
            {levels.map((level) => (
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
                    {<level.icon className={`${level.textColor} h-8 w-8`} />}
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
                        {levels
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
                        {level.ruleDefinitions.timeLimit.toString()} seconds
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
      <Footer />
    </div>
  );
}

import {
  difficultyLevelType,
  ruleDefinitionsType,
} from "@/types/difficultyLevel.types";
import { BrainIcon, ClockIcon, TrophyIcon } from "lucide-react";

export const difficultyLevels: difficultyLevelType[] = [
  {
    id: "easy",
    title: "Easy",
    description:
      "Basic operations with smaller numbers. Perfect for beginners or warming up.",
    examples: [""],
    icon: BrainIcon,
    color: "bg-green-100 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800",
    textColor: "text-green-600 dark:text-green-400",
    rules: [
      "Addition, subtraction, multiplication, division and percentages",
      "No decimals or fractions",
      "Single-step calculations",
    ],
    ruleDefinitions: {
      addSubRange: { range: [0, 100], decimalPrecision: 0 },
      multDivRange: { range: [2, 15], decimalPrecision: 0 },
      percentRange: {
        percent: [0, 20],
        value: [0, 100],
      },
      timeLimit: 45,
    },
  },
  {
    id: "medium",
    title: "Medium",
    description:
      "More complex calculations with larger numbers. Good for regular practice.",
    examples: [""],
    icon: ClockIcon,
    color: "bg-amber-100 dark:bg-amber-900/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    textColor: "text-amber-600 dark:text-amber-400",
    rules: [
      "Addition, subtraction, multiplication, division and percentages",
      "No decimals or fractions",
      "Single-step calculations",
    ],
    ruleDefinitions: {
      addSubRange: { range: [0, 1000], decimalPrecision: 0 },
      multDivRange: { range: [2, 25], decimalPrecision: 0 },
      percentRange: {
        percent: [0, 100],
        value: [0, 1000],
      },
      timeLimit: 60,
    },
  },
  {
    id: "hard",
    title: "Hard",
    description:
      "Advanced calculations requiring multiple steps. For those seeking a challenge.",
    examples: [""],
    icon: TrophyIcon,
    color: "bg-red-100 dark:bg-red-900/20",
    borderColor: "border-red-200 dark:border-red-800",
    textColor: "text-red-600 dark:text-red-400",
    rules: [
      "Addition, subtraction, multiplication, division, and percentages",
      "Includes decimals and fractions",
      "Multi-step calculations",
    ],
    ruleDefinitions: {
      addSubRange: { range: [1000, 10000], decimalPrecision: 2 },
      multDivRange: { range: [20, 50], decimalPrecision: 1 },
      percentRange: {
        percent: [0, 500],
        value: [0, 1000],
      },
      timeLimit: 90,
    },
  },
];

export const defaultRules: ruleDefinitionsType = {
  addSubRange: { range: [0, 100], decimalPrecision: 0 },
  multDivRange: { range: [0, 100], decimalPrecision: 0 },
  percentRange: {
    percent: [0, 100],
    value: [0, 100],
  },
  timeLimit: 60,
};

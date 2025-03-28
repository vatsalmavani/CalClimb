import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ruleBook = [
  {
    id: "easy",
    rules: [
      "Addition, subtraction, multiplication, and division only",
      "No decimals or fractions",
      "Single-step calculations",
    ],
    rulesObject: {
      addSubRange: {
        min: 10,
        max: 999,
      },
      multDivRange: {
        min: 2,
        max: 15,
      },
    },
  },
  {
    id: "medium",
    rules: [
      "Addition, subtraction, multiplication, division and percentages",
      "No decimals or fractions",
      "Single-step calculations",
    ],
    rulesObject: {
      addSubRange: {
        min: 100,
        max: 9999,
      },
      multDivRange: {
        min: 10,
        max: 25,
      },
      percentRange: {
        percent: {
          min: 1,
          max: 100,
        },
        percentOf: {
          min: 100,
          max: 1000,
        },
      },
    },
  },
  {
    id: "hard",
    rules: [
      "Addition, subtraction, multiplication, division, and percentages",
      "Includes decimals and fractions",
      "Multi-step calculations",
    ],
    rulesObject: {
      addSubRange: {
        min: 1000,
        max: 99999,
      },
      multDivRange: {
        min: 20,
        max: 50,
      },
      percentRange: {
        percent: {
          min: 1,
          max: 500,
        },
        percentOf: {
          min: 1000,
          max: 10000,
        },
      },
      decimalRange: {
        min: 0,
        max: 100,
        step: 0.01,
      },
    },
  },
];

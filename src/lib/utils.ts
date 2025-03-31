import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { difficultyLevels } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// v2: enable users to select only part of the rulebook
export const generateProblem = (rulebook: {
  addSubRange?: { range: number[]; decimalPrecision: number };
  multDivRange?: { range: number[]; decimalPrecision: number };
  percentRange?: { percent: number[]; value: number[] };
}) => {
  const addSubRange = rulebook.addSubRange;
  const multDivRange = rulebook.multDivRange;
  const percentRange = rulebook.percentRange;

  const generateAddition = addSubRange
    ? () => {
        {
          const num1 =
            (Math.floor(
              Math.random() * (addSubRange.range[1] - addSubRange.range[0] + 1)
            ) +
              addSubRange.range[0]) /
            Math.pow(
              10,
              Math.floor(Math.random() * (addSubRange.decimalPrecision + 1))
            );
          const num2 =
            (Math.floor(
              Math.random() * (addSubRange.range[1] - addSubRange.range[0] + 1)
            ) +
              addSubRange.range[0]) /
            Math.pow(
              10,
              Math.floor(Math.random() * (addSubRange.decimalPrecision + 1))
            );
          return `${num1} + ${num2}`;
        }
      }
    : undefined;

  const generateSubtraction = addSubRange
    ? () => {
        {
          const num1 =
            (Math.floor(
              Math.random() * (addSubRange.range[1] - addSubRange.range[0] + 1)
            ) +
              addSubRange.range[0]) /
            Math.pow(
              10,
              Math.floor(Math.random() * (addSubRange.decimalPrecision + 1))
            );
          const num2 =
            (Math.floor(
              Math.random() * (addSubRange.range[1] - addSubRange.range[0] + 1)
            ) +
              addSubRange.range[0]) /
            Math.pow(
              10,
              Math.floor(Math.random() * (addSubRange.decimalPrecision + 1))
            );
          return `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
        }
      }
    : undefined;

  const generateMultiplication = multDivRange
    ? () => {
        {
          const num1 =
            (Math.floor(
              Math.random() *
                (multDivRange.range[1] - multDivRange.range[0] + 1)
            ) +
              multDivRange.range[0]) /
            Math.pow(
              10,
              Math.floor(Math.random() * (multDivRange.decimalPrecision + 1))
            );
          const num2 =
            (Math.floor(
              Math.random() *
                (multDivRange.range[1] - multDivRange.range[0] + 1)
            ) +
              multDivRange.range[0]) /
            Math.pow(
              10,
              Math.floor(Math.random() * (multDivRange.decimalPrecision + 1))
            );
          return `${num1} × ${num2}`;
        }
      }
    : undefined;

  const generateDivision = multDivRange
    ? () => {
        {
          const num1 =
            (Math.floor(
              Math.random() *
                (multDivRange.range[1] - multDivRange.range[0] + 1)
            ) +
              multDivRange.range[0]) /
            Math.pow(
              10,
              Math.floor(Math.random() * (multDivRange.decimalPrecision + 1))
            );
          const num2 =
            (Math.floor(
              Math.random() *
                (multDivRange.range[1] - multDivRange.range[0] + 1)
            ) +
              multDivRange.range[0]) /
            Math.pow(
              10,
              Math.floor(Math.random() * (multDivRange.decimalPrecision + 1))
            );
          const num =
            Math.round(
              num1 * num2 * Math.pow(10, multDivRange.decimalPrecision ?? 0)
            ) / Math.pow(10, multDivRange.decimalPrecision ?? 0);
          return `${num} ÷ ${num2}`;
        }
      }
    : undefined;

  const generatePercentage = percentRange
    ? () => {
        const percent = Math.floor(
          Math.random() *
            (percentRange.percent[1] - percentRange.percent[0] + 1) +
            percentRange.percent[0]
        );
        const num = Math.floor(
          Math.random() * (percentRange.value[1] - percentRange.value[0] + 1) +
            percentRange.value[0]
        );
        return `${percent}% of ${num}`;
      }
    : undefined;

  const operations = [
    generateAddition,
    generateSubtraction,
    generateMultiplication,
    generateDivision,
    generatePercentage,
  ].filter((f) => f !== undefined);

  const randomOperation =
    operations[Math.floor(Math.random() * operations.length)];
  return randomOperation();
};

export const generateEasy = () =>
  generateProblem(difficultyLevels[0].ruleDefinitions);

export const generateMedium = () =>
  generateProblem(difficultyLevels[1].ruleDefinitions);

export const generateHard = () =>
  generateProblem(difficultyLevels[2].ruleDefinitions);

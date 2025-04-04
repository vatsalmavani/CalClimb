import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { difficultyLevels } from "./constants";
import { ruleDefinitionsType } from "@/types/difficultyLevel.types";
import { OPERATORS } from "@/types/operators.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getProblemScore = (
  num1: number,
  num2: number,
  operator: OPERATORS
) => {
  const getRangeScore = (num1: number, num2: number) => {
    const n1 = num1.toString().replace(".", "").length;
    const n2 = num2.toString().replace(".", "").length;
    return n1 + n2;
  };

  const getOperatorScore = (operator: OPERATORS) => {
    if (operator === OPERATORS.MULTIPLY || operator === OPERATORS.PERCENT)
      return 2;
    if (operator === OPERATORS.DIVIDE) return 2.5;
    return 1;
  };

  const normalize = (num: number) => {
    const min = 2;
    const max = 22.5;
    return ((num - min) / (max - min)) * 100;
  };

  const normal = normalize(
    getRangeScore(num1, num2) * getOperatorScore(operator)
  );
  return Math.min(100, Math.max(0, Math.round(normal)));
};

// v2: enable users to select only part of the rulebook
export const generateProblem = (rulebook: ruleDefinitionsType) => {
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
          return {
            num1,
            num2,
            operator: OPERATORS.ADD,
            problem: `${num1} + ${num2}`,
            solution: num1 + num2,
          };
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
          return {
            num1: Math.max(num1, num2),
            num2: Math.min(num1, num2),
            operator: OPERATORS.SUBTRACT,
            problem: `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`,
            solution: Math.max(num1, num2) - Math.min(num1, num2),
          };
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
          return {
            num1,
            num2,
            operator: OPERATORS.MULTIPLY,
            problem: `${num1} × ${num2}`,
            solution: num1 * num2,
          };
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
          return {
            num1: num,
            num2,
            operator: OPERATORS.DIVIDE,
            problem: `${num} ÷ ${num2}`,
            solution: num / num2,
          };
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
        return {
          num1: percent,
          num2: num,
          operator: OPERATORS.PERCENT,
          problem: `${percent}% of ${num}`,
          solution: (percent * num) / 100,
        };
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

  const res = randomOperation();
  const score = getProblemScore(res.num1, res.num2, res.operator);
  return { ...res, score };
};

export const generateEasy = () =>
  generateProblem(difficultyLevels[0].ruleDefinitions);

export const generateMedium = () =>
  generateProblem(difficultyLevels[1].ruleDefinitions);

export const generateHard = () =>
  generateProblem(difficultyLevels[2].ruleDefinitions);

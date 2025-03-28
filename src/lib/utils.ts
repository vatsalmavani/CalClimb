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
    ruleDefinitions: {
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
    ruleDefinitions: {
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
    ruleDefinitions: {
      addSubRange: {
        min: 10000,
        max: 99999,
        decimalPrecision: 2,
      },
      multDivRange: {
        min: 20,
        max: 50,
        decimalPrecision: 1,
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
    },
  },
];

export const generateEasy = (): [number, number, string] | null => {
  const easy = ruleBook.find((rule) => rule.id === "easy");
  if (!easy) return null;

  const { addSubRange, multDivRange } = easy.ruleDefinitions;

  const generateAddition = (): [number, number, string] => {
    const num1 =
      Math.floor(Math.random() * (addSubRange.max - addSubRange.min + 1)) +
      addSubRange.min;
    const num2 =
      Math.floor(Math.random() * (addSubRange.max - addSubRange.min + 1)) +
      addSubRange.min;
    return [num1, num2, `${num1} + ${num2}`];
  };

  const generateSubtraction = (): [number, number, string] => {
    const num1 =
      Math.floor(Math.random() * (addSubRange.max - addSubRange.min + 1)) +
      addSubRange.min;
    const num2 =
      Math.floor(Math.random() * (addSubRange.max - addSubRange.min + 1)) +
      addSubRange.min;
    return [
      Math.max(num1, num2),
      Math.min(num1, num2),
      `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`,
    ];
  };

  const generateMultiplication = (): [number, number, string] => {
    const num1 =
      Math.floor(Math.random() * (multDivRange.max - multDivRange.min + 1)) +
      multDivRange.min;
    const num2 =
      Math.floor(Math.random() * (multDivRange.max - multDivRange.min + 1)) +
      multDivRange.min;
    return [num1, num2, `${num1} × ${num2}`];
  };

  const generateDivision = (): [number, number, string] => {
    const num1 =
      Math.floor(Math.random() * (multDivRange.max - multDivRange.min + 1)) +
      multDivRange.min;
    const num2 =
      Math.floor(Math.random() * (multDivRange.max - multDivRange.min + 1)) +
      multDivRange.min;
    return [num1 * num2, num1, `${num1 * num2} ÷ ${num1}`];
  };

  const operations: (() => [number, number, string])[] = [
    generateAddition,
    generateSubtraction,
    generateMultiplication,
    generateDivision,
  ];
  const randomOperation =
    operations[Math.floor(Math.random() * operations.length)];
  return randomOperation();
};

export const generateMedium = (): [number, number, string] | null => {
  const medium = ruleBook.find((rule) => rule.id === "medium");
  if (!medium) return null;

  const { addSubRange, multDivRange, percentRange } = medium.ruleDefinitions;

  const generateAddition = (): [number, number, string] => {
    const num1 =
      Math.floor(Math.random() * (addSubRange.max - addSubRange.min + 1)) +
      addSubRange.min;
    const num2 =
      Math.floor(Math.random() * (addSubRange.max - addSubRange.min + 1)) +
      addSubRange.min;
    return [num1, num2, `${num1} + ${num2}`];
  };

  const generateSubtraction = (): [number, number, string] => {
    const num1 =
      Math.floor(Math.random() * (addSubRange.max - addSubRange.min + 1)) +
      addSubRange.min;
    const num2 =
      Math.floor(Math.random() * (addSubRange.max - addSubRange.min + 1)) +
      addSubRange.min;
    return [
      Math.max(num1, num2),
      Math.min(num1, num2),
      `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`,
    ];
  };

  const generateMultiplication = (): [number, number, string] => {
    const num1 =
      Math.floor(Math.random() * (multDivRange.max - multDivRange.min + 1)) +
      multDivRange.min;
    const num2 =
      Math.floor(Math.random() * (multDivRange.max - multDivRange.min + 1)) +
      multDivRange.min;
    return [num1, num2, `${num1} × ${num2}`];
  };

  const generateDivision = (): [number, number, string] => {
    const num1 =
      Math.floor(Math.random() * (multDivRange.max - multDivRange.min + 1)) +
      multDivRange.min;
    const num2 =
      Math.floor(Math.random() * (multDivRange.max - multDivRange.min + 1)) +
      multDivRange.min;
    return [num1 * num2, num1, `${num1 * num2} ÷ ${num1}`];
  };

  const generatePercentage = (): [number, number, string] => {
    const percent =
      Math.floor(
        Math.random() *
          ((percentRange?.percent.max ?? 0) -
            (percentRange?.percent.min ?? 0) +
            1)
      ) + (percentRange?.percent.min ?? 0);
    const num =
      Math.floor(
        Math.random() *
          ((percentRange?.percentOf.max ?? 0) -
            (percentRange?.percentOf.min ?? 0) +
            1)
      ) + (percentRange?.percentOf.min ?? 0);
    return [percent, num, `${percent}% of ${num}`];
  };

  const operations: (() => [number, number, string])[] = [
    generateAddition,
    generateSubtraction,
    generateMultiplication,
    generateDivision,
    generatePercentage,
  ];
  const randomOperation =
    operations[Math.floor(Math.random() * operations.length)];
  return randomOperation();
};

export const generateHard = (): [number, number, string] | null => {
  const hard = ruleBook.find((rule) => rule.id === "hard");
  if (!hard) return null;

  const { addSubRange, multDivRange, percentRange } = hard.ruleDefinitions;

  const generateAddition = (): [number, number, string] => {
    let num1 =
      (Math.floor(Math.random() * (addSubRange.max - addSubRange.min + 1)) +
        addSubRange.min) /
      Math.pow(
        10,
        Math.floor(Math.random() * ((addSubRange.decimalPrecision ?? -1) + 1))
      );
    let num2 =
      (Math.floor(Math.random() * (addSubRange.max - addSubRange.min + 1)) +
        addSubRange.min) /
      Math.pow(
        10,
        Math.floor(Math.random() * ((addSubRange.decimalPrecision ?? -1) + 1))
      );
    num1 =
      Math.round(num1 * Math.pow(10, addSubRange.decimalPrecision ?? 0)) /
      Math.pow(10, addSubRange.decimalPrecision ?? 0);
    num2 =
      Math.round(num2 * Math.pow(10, addSubRange.decimalPrecision ?? 0)) /
      Math.pow(10, addSubRange.decimalPrecision ?? 0);
    return [num1, num2, `${num1} + ${num2}`];
  };

  const generateSubtraction = (): [number, number, string] => {
    let num1 =
      (Math.floor(Math.random() * (addSubRange.max - addSubRange.min + 1)) +
        addSubRange.min) /
      Math.pow(
        10,
        Math.floor(Math.random() * ((addSubRange.decimalPrecision ?? -1) + 1))
      );
    let num2 =
      (Math.floor(Math.random() * (addSubRange.max - addSubRange.min + 1)) +
        addSubRange.min) /
      Math.pow(
        10,
        Math.floor(Math.random() * ((addSubRange.decimalPrecision ?? -1) + 1))
      );
    num1 =
      Math.round(num1 * Math.pow(10, addSubRange.decimalPrecision ?? 0)) /
      Math.pow(10, addSubRange.decimalPrecision ?? 0);
    num2 =
      Math.round(num2 * Math.pow(10, addSubRange.decimalPrecision ?? 0)) /
      Math.pow(10, addSubRange.decimalPrecision ?? 0);
    return [
      Math.max(num1, num2),
      Math.min(num1, num2),
      `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`,
    ];
  };

  const generateMultiplication = (): [number, number, string] => {
    let num1 =
      (Math.floor(Math.random() * (multDivRange.max - multDivRange.min + 1)) +
        multDivRange.min) /
      Math.pow(
        10,
        Math.floor(Math.random() * ((multDivRange.decimalPrecision ?? -1) + 1))
      );
    let num2 =
      (Math.floor(Math.random() * (multDivRange.max - multDivRange.min + 1)) +
        multDivRange.min) /
      Math.pow(
        10,
        Math.floor(Math.random() * ((multDivRange.decimalPrecision ?? -1) + 1))
      );
    num1 =
      Math.round(num1 * Math.pow(10, multDivRange.decimalPrecision ?? 0)) /
      Math.pow(10, multDivRange.decimalPrecision ?? 0);
    num2 =
      Math.round(num2 * Math.pow(10, multDivRange.decimalPrecision ?? 0)) /
      Math.pow(10, multDivRange.decimalPrecision ?? 0);
    return [num1, num2, `${num1} × ${num2}`];
  };

  const generateDivision = (): [number, number, string] => {
    let num1 =
      (Math.floor(Math.random() * (multDivRange.max - multDivRange.min + 1)) +
        multDivRange.min) /
      Math.pow(
        10,
        Math.floor(Math.random() * ((multDivRange.decimalPrecision ?? -1) + 1))
      );
    let num2 =
      (Math.floor(Math.random() * (multDivRange.max - multDivRange.min + 1)) +
        multDivRange.min) /
      Math.pow(
        10,
        Math.floor(Math.random() * ((multDivRange.decimalPrecision ?? -1) + 1))
      );
    num1 =
      Math.round(num1 * Math.pow(10, multDivRange.decimalPrecision ?? 0)) /
      Math.pow(10, multDivRange.decimalPrecision ?? 0);
    num2 =
      Math.round(num2 * Math.pow(10, multDivRange.decimalPrecision ?? 0)) /
      Math.pow(10, multDivRange.decimalPrecision ?? 0);
    const num =
      Math.round(
        num1 * num2 * Math.pow(10, multDivRange.decimalPrecision ?? 0)
      ) / Math.pow(10, multDivRange.decimalPrecision ?? 0);
    return [num, num1, `${num} ÷ ${num1}`];
  };

  const generatePercentage = (): [number, number, string] => {
    const percent =
      Math.floor(
        Math.random() *
          ((percentRange?.percent.max ?? 0) -
            (percentRange?.percent.min ?? 0) +
            1)
      ) + (percentRange?.percent.min ?? 0);
    const num =
      Math.floor(
        Math.random() *
          ((percentRange?.percentOf.max ?? 0) -
            (percentRange?.percentOf.min ?? 0) +
            1)
      ) + (percentRange?.percentOf.min ?? 0);
    return [percent, num, `${percent}% of ${num}`];
  };

  const operations: (() => [number, number, string])[] = [
    generateAddition,
    generateSubtraction,
    generateMultiplication,
    generateDivision,
    generatePercentage,
  ];
  const randomOperation =
    operations[Math.floor(Math.random() * operations.length)];
  return randomOperation();
};

import { OPERATORS } from "./operators.types";

export type problemType = {
  num1: number;
  num2: number;
  operator: OPERATORS;
  problem: string;
  solution: number;
  score: number;
};

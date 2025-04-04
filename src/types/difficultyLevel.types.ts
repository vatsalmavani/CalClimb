import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type ruleDefinitionsType = {
  addSubRange: { range: [number, number]; decimalPrecision: number };
  multDivRange: { range: [number, number]; decimalPrecision: number };
  percentRange: {
    percent: [number, number];
    value: [number, number];
  };
  timeLimit: number;
};

export type difficultyLevelType = {
  id: string;
  title: string;
  description: string;
  examples: string[];
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  color: string;
  borderColor: string;
  textColor: string;
  rules: string[];
  ruleDefinitions: ruleDefinitionsType;
};

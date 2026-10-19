export interface CombinationResult {
  n: number;
  r: number;
  nMinusR: number;
  nFact: bigint;
  rFact: bigint;
  nMinusRFact: bigint;
  denominator: bigint;
  combination: bigint;
  isValid: boolean;
  errorMessage?: string;
  steps: {
    title: string;
    description: string;
    math: string;
  }[];
}

export interface JavaCodeSnippet {
  id: string;
  title: string;
  badge: string;
  description: string;
  fileName: string;
  code: string;
  highlights: string[];
}

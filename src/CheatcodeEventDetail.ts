export default interface CheatcodeEventDetail {
  code: string;
  complete: boolean;
  completions: number;
  correct: boolean;
  input: string;
  progress: number;
}

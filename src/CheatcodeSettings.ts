import CheatcodeEvent from "./CheatcodeEvent";

export default interface CheatcodeSettings {
  code: string;
  once?: boolean;
  listener?: (event: CheatcodeEvent) => void;
}

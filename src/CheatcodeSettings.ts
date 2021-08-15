export default interface CheatcodeSettings {
  code: string;
  listener?: EventListener;
  once?: boolean;
  target: EventTarget;
}

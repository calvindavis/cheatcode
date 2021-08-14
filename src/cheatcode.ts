import CheatcodeEvent from "./CheatcodeEvent";
import CheatcodeSettings from "./CheatcodeSettings";

export default function cheatcode(
  target: EventTarget,
  code: string | CheatcodeSettings,
  settings: CheatcodeSettings = undefined
): () => void {
  let config: CheatcodeSettings;

  if (typeof code === "string" && settings === undefined) {
    config = { code };
  }

  if (typeof code === "string" && settings !== undefined) {
    config = settings;
    config.code = code;
  }

  if (typeof code !== "string" && code !== null) {
    config = code as CheatcodeSettings;
  }

  console.log("config", config);

  let input = "";
  let completions = 0;

  const handler = (event: KeyboardEvent) => {
    input += event.key;

    const correct = config.code.startsWith(input);
    const progress = correct ? input.length / config.code.length : 0;
    const complete = progress === 1;

    console.log(input, correct, progress);

    if (complete || correct === false) {
      input = "";
    }

    if (complete) {
      completions += 1;

      if (config.once) {
        off();
      }
    }

    const e: CheatcodeEvent = new CheatcodeEvent("cheatcode", {
      detail: {
        correct,
        progress,
        completions,
        code: config.code,
        complete,
        input,
      },
    });

    target.dispatchEvent(e);
  };

  const off = (): void => {
    target.removeEventListener("keypress", handler);
  };

  target.addEventListener("keypress", handler);

  if (config.listener) {
    target.addEventListener("cheatcode", config.listener);
  }

  return off;
}

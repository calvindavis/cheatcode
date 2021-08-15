import CheatcodeEvent from "./CheatcodeEvent";
import CheatcodeSettings from "./CheatcodeSettings";

export default class Cheatcode {
  private _input: string = "";
  private _completions: number = 0;
  private _settings: CheatcodeSettings;

  constructor(settings: CheatcodeSettings) {
    this._settings = settings;
    console.log("settings", this._settings);

    this._settings.target.addEventListener("keypress", this._keypressListener);

    if (this._settings.listener) {
      this._settings.target.addEventListener(
        CheatcodeEvent.TYPE_ARG,
        this._settings.listener
      );
    }
  }

  public off(): void {
    this._settings.target.removeEventListener(
      "keypress",
      this._keypressListener
    );
  }

  private _keypressListener: EventListener = (event: Event): void => {
    const keyboardEvent = event as KeyboardEvent;
    this._input += keyboardEvent.key;

    const correct = this._settings.code.startsWith(this._input);
    const progress = correct
      ? this._input.length / this._settings.code.length
      : 0;
    const complete = progress === 1;

    console.log(this._input, correct, progress);

    if (complete || correct === false) {
      this._input = "";
    }

    if (complete) {
      this._completions += 1;

      if (this._settings.once) {
        this.off();
      }
    }

    this._settings.target.dispatchEvent(
      new CheatcodeEvent({
        detail: {
          code: this._settings.code,
          complete,
          completions: this._completions,
          correct,
          input: this._input,
          progress,
        },
      })
    );
  };
}

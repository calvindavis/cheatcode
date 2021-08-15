import CheatcodeEventDetail from "./CheatcodeEventDetail";

export default class CheatcodeEvent extends CustomEvent<CheatcodeEventDetail> {
  public static TYPE_ARG = "cheatcode";

  constructor(eventInitDict: CustomEventInit<CheatcodeEventDetail>) {
    super(CheatcodeEvent.TYPE_ARG, eventInitDict);
  }
}

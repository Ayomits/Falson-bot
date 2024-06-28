import { EventConfig } from "@src/types/djs";

export default class BaseEvent {
  declare readonly options: EventConfig;
  constructor(options: EventConfig) {
    this.options = options;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public execute(...args: any[]) {
    throw new Error("Method not implemented.");
  }
}

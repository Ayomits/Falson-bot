import { Events } from "discord.js";

export default class BaseEvent {
  declare readonly name: Events;
  declare readonly once: boolean;

  constructor(name: Events, once: boolean = false) {
    this.name = name;
    this.once = once;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public execute(...args: any[]) {
    throw new Error("Method not implemented.");
  }
}

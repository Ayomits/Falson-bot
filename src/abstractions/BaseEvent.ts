import { Events } from "discord.js";

export default abstract class BaseEvent {
  readonly name: Events;
  readonly once: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static execute(...args: any[]): void | PromiseLike<void> {
    throw new Error("Method not implemented.");
  }

}

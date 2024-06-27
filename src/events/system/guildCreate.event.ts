import BaseEvent from "@src/abstractions/BaseEvent";
import { Events } from "discord.js";

export class GuildCreateEvent extends BaseEvent {
  declare name: Events;
  declare once: boolean;

  constructor() {
    super();
    this.name = Events.InteractionCreate;
    this.once = false;
  }
}

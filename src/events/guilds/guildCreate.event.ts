import BaseEvent from "@src/abstractions/BaseEvent";
import { Events, Guild } from "discord.js";

export class GuildCreateEvent extends BaseEvent {
  constructor() {
    super({
      name: Events.GuildCreate,
      once: false,
    });
  }

  public async execute(guild: Guild) {
    return guild;
  }
}

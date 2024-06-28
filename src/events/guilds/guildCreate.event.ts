import BaseEvent from "@src/abstractions/BaseEvent";
import { Events, Guild } from "discord.js";

export class GuildCreateEvent extends BaseEvent {
  constructor() {
    super(Events.GuildCreate, false);
  }

  public async execute(guild: Guild) {
    return guild;
  }
}

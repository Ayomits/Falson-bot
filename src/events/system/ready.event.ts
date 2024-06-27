import { Client, Events } from "discord.js";
import { EventReadyService } from "./ready.service";
import BaseEvent from "@src/abstractions/BaseEvent";

export class Ready extends BaseEvent {
  declare name: Events;
  declare once: boolean;

  constructor() {
    super();
    this.name = Events.ClientReady;
    this.once = false;
  }

  public async execute(client: Client) {
    const ready = new EventReadyService(client);
    await Promise.all([await ready.commandActions(), ready.statusChanger()]);
  }
}

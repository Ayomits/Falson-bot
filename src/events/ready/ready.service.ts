import {
  Client,
  Guild,
  REST,
  Routes,
} from "discord.js";
import InteractionCollector from "./collectors/interaction.collector";

export class EventReadyService {

  constructor(
    private readonly client: Client,
    private readonly interactionCollector: InteractionCollector = new InteractionCollector(
      client
    )
  ) {}


  public async commandActions(): Promise<void> {
    await this.interactionCollector.collect();
  }

}

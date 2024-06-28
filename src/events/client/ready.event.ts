import BaseEvent from "@src/abstractions/BaseEvent";
import InteractionCollector from "@src/utils/interaction.collector";
import { ActivityType, Client, Events } from "discord.js";

export class ReadyEvent extends BaseEvent {
  private declare client: Client;
  constructor() {
    super(Events.ClientReady, true);
  }

  public async execute(client: Client) {
    this.client = client;
    await Promise.all([this.commandActions(), this.statusChanger()]);
  }

  private async commandActions(): Promise<void> {
    await new InteractionCollector(this.client).collect();
  }

  private async statusChanger() {
    const status = () => {
      let membersCount = 0;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [_, guild] of this.client.guilds.cache) {
        membersCount += guild.memberCount;
      }
      this.client.user.setActivity({
        type: ActivityType.Playing,
        name: `with ${membersCount} participants and ${this.client.guilds.cache.size} servers`,
      });
    };
    setInterval(() => {
      status();
    }, 30_000);
  }
}

import InteractionCollector from "@src/utils/interaction.collector";
import { ActivityType, Client } from "discord.js";

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

  public async statusChanger() {
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

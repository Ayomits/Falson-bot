import BaseEvent from "@src/abstractions/BaseEvent";

import { configService } from "@src/services/ConfigService";

import { ActivityType, Client, Events, REST, Routes } from "discord.js";

export class ReadyEvent extends BaseEvent {
  private declare client: Client;
  constructor() {
    super({
      name: Events.ClientReady,
      once: true,
    });
  }

  public async execute(client: Client) {
    this.client = client;
    await Promise.all([this.statusChanger(), this.commandRegister()]);
  }

  private async commandRegister() {
    const rest = new REST({ version: "10" }).setToken(
      configService.get("TOKEN")
    );
    try {
      await rest.put(Routes.applicationCommands(this.client.user.id), {
        body: this.client.commands
          .filter((command) => command.options.isSlash)
          .map((command) => command.options.builder.toJSON()),
      });
    } catch (err) {
      throw err;
    }
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

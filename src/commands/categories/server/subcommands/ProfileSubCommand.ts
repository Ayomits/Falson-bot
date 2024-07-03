import { BaseSubCommand } from "@src/abstractions/BaseSubCommand";
import { GuildType } from "@src/types";
import { CommandInteraction, InteractionResponse } from "discord.js";

export class ServerProfileCommand extends BaseSubCommand {
  constructor() {
    super({
      name: `profile`,
      parentName: `server`,
      type: GuildType.Everyone,
      allowDms: false,
    });
  }

  async execute(interaction: CommandInteraction): Promise<InteractionResponse> {
    return await interaction.reply({
      content: `hello world by subcommand`,
    });
  }
}

import { BaseSubCommand } from "@src/abstractions/BaseSubCommand";
import { GuildType } from "@src/types";
import { CommandInteraction } from "discord.js";

export class ServerProfileCommand extends BaseSubCommand {
  constructor() {
    super({
      name: `profile`,
      parentName: `server`,
      type: GuildType.Everyone,
      allowDms: false,
    });
  }

  async execute(interaction: CommandInteraction) {
    try {
      await interaction.deferReply();
      interaction.editReply({ content: `idk` });
    } catch (err) {
      throw err;
    }
  }
}

import BaseCommand from "@src/abstractions/BaseCommand";
import { GuildType } from "@src/types";
import {
  CommandInteraction,

  SlashCommandBuilder,
} from "discord.js";

export class SettingsCommand extends BaseCommand {
  constructor() {
    super({
      isSlash: true,
      type: GuildType.Everyone,
      builder: new SlashCommandBuilder()
        .setName(`settings`)
        .setDescription(`Verification settings`)
        .setNameLocalizations({
          ru: "настройки",
          "en-US": "settings",
          "en-GB": "settings",
        })
        .setDescriptionLocalizations({
          ru: "Настройки верификации",
          "en-US": "Verification settings",
          "en-GB": "Verification settings",
        }),
    });
  }

  async execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });
    return interaction.editReply({ content: `idk` });
  }
}

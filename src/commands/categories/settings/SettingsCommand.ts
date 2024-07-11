import BaseCommand from "@src/abstractions/BaseCommand";
import { PermissionError } from "@src/errors/PermissionError";
import { guildSettings } from "@src/rest/FalsonApiREST";
import { GuildType } from "@src/types";
import {
  CommandInteraction,
  GuildMember,
  SlashCommandBuilder,
} from "discord.js";
import { generateEmbed } from "./embedGenerator";

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
    // TODO: перевод всех команд и опций внутри
    await interaction.deferReply({ ephemeral: true });
    const guild = await guildSettings.fetchGuildSettings(interaction.guild.id);
    if (
      interaction.user.id !== interaction.guild.ownerId &&
      !(interaction.member as GuildMember).roles.cache.some((role) =>
        guild.trustedRoles.includes(role.id)
      )
    ) {
      return new PermissionError(interaction);
    }
    const data = generateEmbed(interaction);
    return interaction.editReply(data);
  }
}

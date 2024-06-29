import BaseCommand from "@src/abstractions/BaseCommand";
import guildLanguageManager from "@src/locales/I18nGuildManager";
import { GuildType } from "@src/types";
import { FalsonEmbedColors } from "@src/types/djs/Colors";
import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export class PingCommand extends BaseCommand {
  constructor() {
    super({
      isSlash: true,
      type: GuildType.Everyone,
      builder: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`Check bot latency`),
    });
  }

  async execute(interaction: CommandInteraction) {
    await interaction.deferReply();
    const embed = new EmbedBuilder()
      .setColor(FalsonEmbedColors.Discord)
      .setTitle(
        `${guildLanguageManager.translate("pingCommand.embed.title", interaction.guild.id)}`
      )
      .setFields(
        {
          name: `> ${guildLanguageManager.translate(`pingCommand.embed.ws_latency`, interaction.guild.id)}`,
          value: `${interaction.client.ws.ping} ms`,
          inline: true,
        },
        {
          name: `> ${guildLanguageManager.translate(`pingCommand.embed.message_latency`, interaction.guild.id)}`,
          value: `${Math.floor((Date.now() - interaction.createdTimestamp) / 1000)} ms`,
          inline: true,
        }
      )
      .setThumbnail(interaction.user.displayAvatarURL());
    return interaction.editReply({ embeds: [embed] });
  }
}

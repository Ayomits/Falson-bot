import BaseCommand from "@src/abstractions/BaseCommand";
import i18n from "@src/locales/i18n-instance";
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
      .setTitle(`${await i18n.translate("pingCommand.embed.title")}`)
      .setFields(
        {
          name: `> ${await i18n.translate(`pingCommand.embed.ws_latency`)}`,
          value: `${interaction.client.ws.ping} ms`,
          inline: true,
        },
        {
          name: `> ${await i18n.translate(`pingCommand.embed.message_latency`)}`,
          value: `${Math.floor((Date.now() - interaction.createdTimestamp) / 1000)} ms`,
          inline: true,
        }
      )
      .setThumbnail(interaction.user.displayAvatarURL());
    return interaction.editReply({ embeds: [embed] });
  }
}

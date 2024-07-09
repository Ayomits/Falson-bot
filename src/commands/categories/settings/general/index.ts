import BaseSelectMenuValue from "@src/abstractions/BaseSelectMenuValue";
import { FalsonEmbedColors } from "@src/types";
import { EmbedBuilder, StringSelectMenuInteraction } from "discord.js";

// TODO: перевести все сообщения

export class GeneralSettings extends BaseSelectMenuValue {
  value: string = "global";
  async execute(interaction: StringSelectMenuInteraction) {
    const embed = new EmbedBuilder()
      .setTitle(`Глобальная настройка`)
      .setColor(FalsonEmbedColors.Discord)
      .setThumbnail(interaction.guild.iconURL())
      .setFields({
        name: `adads`,
        value: `idk`,
      });
    return interaction.reply({ embeds: [embed], ephemeral: true });
  }
}

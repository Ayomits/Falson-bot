import BaseComponent from "@src/abstractions/BaseComponent";
import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { generateEmbed } from "./embedGenerator";

export function generateButton() {
  return new ButtonBuilder()
    .setCustomId(`backToMain`)
    .setLabel(`Назад`)
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("⬅");
}

export class BackToMainButton extends BaseComponent {
  customId: string = "backToMain";
  async execute(interaction: ButtonInteraction) {
    await interaction.deferUpdate();
    const data = generateEmbed(interaction);
    return interaction.editReply(data);
  }
}

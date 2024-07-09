import BaseSelectMenuValue from "@src/abstractions/BaseSelectMenuValue";
import { StringSelectMenuInteraction } from "discord.js";
import { generalEmbedGenerator } from "./embedGenerator";

// TODO: перевести все сообщения

export class GeneralSettings extends BaseSelectMenuValue {
  value: string = "global";
  async execute(interaction: StringSelectMenuInteraction) {
    await interaction.deferReply({ ephemeral: true });
    const data = await generalEmbedGenerator(interaction.guild);
    return interaction.editReply({
      ...data
    });
  }
}

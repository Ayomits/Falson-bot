import BaseComponent from "@src/abstractions/BaseComponent";
import { generalVerification } from "@src/rest/FalsonApiREST";
import { StringSelectMenuInteraction } from "discord.js";
import { traditionEmbedGenerator } from "./embedGenerator";

export class VerificationTypeChanger extends BaseComponent {
  customId: string = "verificationTypeChanger";
  async execute(
    interaction: StringSelectMenuInteraction,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _args?: string[]
  ) {
    await interaction.deferUpdate();
    const value = interaction.values[0];
    const guild = interaction.guild;
    await generalVerification.updateGeneralSettings(guild.id, {
      type: Number(value),
    });
    const data = await traditionEmbedGenerator(guild);
    return await interaction.editReply({
      embeds: [data.embed],
      components: [data.verificationTypeSelect],
    });
  }
}

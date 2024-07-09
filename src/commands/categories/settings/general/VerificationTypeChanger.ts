import BaseComponent from "@src/abstractions/BaseComponent";
import { generalVerification } from "@src/rest/FalsonApiREST";
import { StringSelectMenuInteraction } from "discord.js";
import { traditionEmbedGenerator } from "./embedGenerator";
import { ForbidenException } from "@src/errors/ForbidenException";

// TODO: перевести все сообщения
export class VerificationTypeChanger extends BaseComponent {
  customId: string = "verificationTypeChanger";
  async execute(
    interaction: StringSelectMenuInteraction,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _args?: string[]
  ) {
    const value = interaction.values[0];
    const guild = interaction.guild;
    const updated = await generalVerification.updateGeneralSettings(guild.id, {
      type: Number(value),
    });
    if (!updated) {
      return new ForbidenException(interaction);
    }
    await interaction.deferUpdate();
    const data = await traditionEmbedGenerator(guild);
    return await interaction.editReply({
      embeds: [data.embed],
      components: [data.verificationTypeSelect],
    });
  }
}

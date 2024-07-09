import BaseComponent from "@src/abstractions/BaseComponent";
import { ApiError } from "@src/errors/ApiError";
import { generalVerification } from "@src/rest/FalsonApiREST";
import { RoleSelectMenuInteraction } from "discord.js";
import { generalEmbedGenerator } from "./embedGenerator";

// TODO: перевести все сообщения

export class VerificationRolesSelectMenu extends BaseComponent {
  customId: string = "verificationRolesSelect";
  async execute(interaction: RoleSelectMenuInteraction) {
    const values = interaction.values;
    const settings = await generalVerification.fetchGeneralSettings(
      interaction.guild.id
    );
    if (!settings) {
      return new ApiError(interaction, true, true);
    }
    const newSettings = await generalVerification.updateGeneralSettings(
      interaction.guild.id,
      { verificationRoles: values }
    );
    if (!newSettings) {
      return new ApiError(interaction, true, true);
    }
    await interaction.deferUpdate();
    interaction.editReply(await generalEmbedGenerator(interaction.guild));
  }
}

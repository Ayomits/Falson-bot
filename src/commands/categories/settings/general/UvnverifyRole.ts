import BaseComponent from "@src/abstractions/BaseComponent";
import { ApiError } from "@src/errors/ApiError";
import { generalVerification } from "@src/rest/FalsonApiREST";
import { RoleSelectMenuInteraction } from "discord.js";
import { generalEmbedGenerator } from "./embedGenerator";

export class UnverifyRoleSelect extends BaseComponent {
  customId: string = `unverifyRoleSelect`;
  async execute(interaction: RoleSelectMenuInteraction) {
    const role = interaction.values[0];
    const updated = await generalVerification.updateGeneralSettings(
      interaction.guild.id,
      { unverifyRole: role }
    );
    if (!updated) {
      return new ApiError(interaction, true, true);
    }
    await interaction.deferUpdate();
    interaction.editReply(await generalEmbedGenerator(interaction.guild));
  }
}

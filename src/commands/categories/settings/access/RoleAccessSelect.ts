import BaseComponent from "@src/abstractions/BaseComponent";
import { ApiError } from "@src/errors/ApiError";
import { PermissionError } from "@src/errors/PermissionError";
import { guildSettings } from "@src/rest/FalsonApiREST";
import { RoleSelectMenuInteraction } from "discord.js";
import { AccessManager } from ".";

export class RolesAccessSelect extends BaseComponent {
  customId: string = "roleAccessSelect";
  async execute(interaction: RoleSelectMenuInteraction) {
    if (interaction.guild.ownerId !== interaction.user.id) {
      return new PermissionError(interaction);
    }
    const values = interaction.values;
    const updated = await guildSettings.updateTrustedRoles(
      interaction.guild.id,
      values
    );
    if (!updated) {
      return new ApiError(interaction, true, true);
    }
    await interaction.deferUpdate();
    interaction.editReply(AccessManager.generateEmbed(interaction, updated));
  }
}

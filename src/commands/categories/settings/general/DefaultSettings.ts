import BaseComponent from "@src/abstractions/BaseComponent";
import { generalVerification, guildSettings } from "@src/rest/FalsonApiREST";
import { LanguageType, VerificationType } from "@src/types";
import { ButtonInteraction } from "discord.js";
import { generalEmbedGenerator } from "./embedGenerator";
import { ApiError } from "@src/errors/ApiError";
import guildLanguageManager from "@src/locales/I18nGuildManager";

export class DefaultSettingsButton extends BaseComponent {
  customId: string = "defaultSettings";
  async execute(interaction: ButtonInteraction) {
    const updated = await Promise.all([
      generalVerification.updateGeneralSettings(interaction.guild.id, {
        type: VerificationType.Traditional,
        verificationRoles: [],
        unverifyRole: null,
      }),
      guildSettings.updateLanguage(interaction.guild.id, {
        interfaceLanguage: LanguageType.English,
      }),
      guildLanguageManager.setLanguageForGuild(
        interaction.guild.id,
        LanguageType.English
      ),
    ]);
    if (!updated) {
      return new ApiError(interaction, true, true);
    }
    await interaction.deferUpdate();
    interaction.editReply(await generalEmbedGenerator(interaction.guild));
  }
}

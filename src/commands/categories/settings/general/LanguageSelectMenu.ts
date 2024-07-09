import BaseComponent from "@src/abstractions/BaseComponent";
import { ApiError } from "@src/errors/ApiError";
import guildLanguageManager from "@src/locales/I18nGuildManager";
import { guildSettings } from "@src/rest/FalsonApiREST";
import { LanguageType } from "@src/types";
import { StringSelectMenuInteraction } from "discord.js";
import { generalEmbedGenerator } from "./embedGenerator";

export class LanguageSelectMenu extends BaseComponent {
  customId: string = "languageSelectMenu";
  async execute(interaction: StringSelectMenuInteraction) {
    const guildSettingsFromDb = await guildSettings.fetchGuildSettings(
      interaction.guild.id
    );
    if (!guildSettingsFromDb) {
      return new ApiError(interaction, true, true);
    }
    const language = interaction.values[0];
    await Promise.all([
      guildLanguageManager.setLanguageForGuild(
        interaction.guild.id,
        language.slice(0, 2).toLowerCase()
      ),
      guildSettings.updateLanguage(interaction.guild.id, {
        interfaceLanguage: language as LanguageType,
      }),
    ]);
    await interaction.deferUpdate();
    return interaction.editReply(
      await generalEmbedGenerator(interaction.guild)
    );
  }
}

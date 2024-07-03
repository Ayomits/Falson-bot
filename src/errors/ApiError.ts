import { BaseCommandError } from "@src/abstractions/BaseError";
import guildLanguageManager from "@src/locales/I18nGuildManager";
import { FalsonEmbedColors } from "@src/types/djs/Colors";
import { CommandInteraction } from "discord.js";

export class ApiError extends BaseCommandError {
  constructor(interaction: CommandInteraction) {
    super({
      interaction: interaction,
      title: guildLanguageManager.translate(
        `errors.ApiError.title`,
        interaction.guild.id
      ) as string,
      description: guildLanguageManager.translate(
        `errors.ApiError.description`,
        interaction.guild.id
      ) as string,
      color: FalsonEmbedColors.Error,
    });
  }
}

import { BaseCommandError } from "@src/abstractions/BaseError";
import guildLanguageManager from "@src/locales/I18nGuildManager";
import { FalsonEmbedColors } from "@src/types/djs/Colors";
import { CommandInteraction } from "discord.js";

export class DmsError extends BaseCommandError {
  constructor(interaction: CommandInteraction) {
    super({
      interaction: interaction,
      title: guildLanguageManager.translate(`errors.DmsError.title`, interaction.guild.id) as string,
      description: guildLanguageManager.translate(`errors.DmsError.description`, interaction.guild.id) as string,
      color: FalsonEmbedColors.Error,
    });
  }
}

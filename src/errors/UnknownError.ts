import { BaseCommandError } from "@src/abstractions/BaseError";
import guildLanguageManager from "@src/locales/I18nGuildManager";
import { FalsonEmbedColors } from "@src/types/djs/Colors";
import { CommandInteraction } from "discord.js";

export class UnknownError extends BaseCommandError {
  constructor(interaction: CommandInteraction) {
    super({
      interaction: interaction,
      title: guildLanguageManager.translate(
        `errors.UnknownError.title`,
        interaction.guild?.id
      ) as string || "Unknown Error",
      description: guildLanguageManager.translate(
        `errors.UnknownError.description`,
        interaction.guild?.id
      ) as string || "If you see this error and are confident that this command should work correctly, please file a bug using `bug report",
      color: FalsonEmbedColors.Error,
    });
  }
}

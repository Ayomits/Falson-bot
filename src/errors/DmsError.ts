import { BaseCommandError } from "@src/abstractions/BaseError";
import guildLanguageManager from "@src/locales/I18nGuildManager";
import { FalsonEmbedColors } from "@src/types/djs/Colors";
import { CommandInteraction } from "discord.js";

export class DmsError extends BaseCommandError {
  constructor(interaction: CommandInteraction) {
    super({
      interaction: interaction,
      title:
        (guildLanguageManager.translate(
          `errors.DmsError.title`
        ) as string) || `Dms error`,
      description:
        (guildLanguageManager.translate(
          `errors.DmsError.description`
        ) as string) || `Dms error`,
      color: FalsonEmbedColors.Error,
    });
  }
}

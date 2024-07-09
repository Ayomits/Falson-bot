import { BaseCommandError } from "@src/abstractions/BaseError";
import guildLanguageManager from "@src/locales/I18nGuildManager";
import { FalsonEmbedColors } from "@src/types/djs/Colors";

export class DmsError extends BaseCommandError {
  constructor(
    interaction: any,
    mustReply: boolean = false,
    ephemeral: boolean = false
  ) {
    super({
      interaction: interaction,
      title:
        (guildLanguageManager.translate(`errors.DmsError.title`) as string) ||
        `Dms error`,
      description:
        (guildLanguageManager.translate(
          `errors.DmsError.description`
        ) as string) || `Dms error`,
      color: FalsonEmbedColors.Error,
      isMustReply: mustReply,
      ephemeral: ephemeral,
    });
  }
}

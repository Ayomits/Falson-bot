import { BaseCommandError } from "@src/abstractions/BaseError";
import guildLanguageManager from "@src/locales/I18nGuildManager";
import { FalsonEmbedColors } from "@src/types/djs/Colors";

export class UnknownError extends BaseCommandError {
  constructor(
    interaction: any,
    mustReply: boolean = false,
    ephemeral: boolean = false
  ) {
    super({
      interaction: interaction,
      title:
        (guildLanguageManager.translate(
          `errors.UnknownError.title`
        ) as string) || "Unknown Error",
      description:
        (guildLanguageManager.translate(
          `errors.UnknownError.description`
        ) as string) ||
        "If you see this error and are confident that this command should work correctly, please file a bug using `bug report",
      color: FalsonEmbedColors.Error,
      isMustReply: mustReply,
      ephemeral: ephemeral,
    });
  }
}

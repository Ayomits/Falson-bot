import { BaseCommandError } from "@src/abstractions/BaseError";
import guildLanguageManager from "@src/locales/I18nGuildManager";
import { FalsonEmbedColors } from "@src/types/djs/Colors";


export class ApiError extends BaseCommandError {
  constructor(
    interaction: any,
    mustReply: boolean = false,
    ephemeral: boolean = false
  ) {
    super({
      interaction: interaction,
      title: `${
        (guildLanguageManager.translate(`errors.ApiError.title`) as string) ||
        `Http service is currently is unavailable`
      }`,
      description: `${
        (guildLanguageManager.translate(
          `errors.ApiError.description`
        ) as string) || "Http service currently is unavailable"
      }`,
      color: FalsonEmbedColors.Error,
      isMustReply: mustReply,
      ephemeral: ephemeral,
    });
  }
}

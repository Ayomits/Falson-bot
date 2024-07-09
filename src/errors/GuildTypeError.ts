import { BaseCommandError } from "@src/abstractions/BaseError";
import guildLanguageManager from "@src/locales/I18nGuildManager";
import { FalsonEmbedColors } from "@src/types/djs/Colors";

export class GuildTypeError extends BaseCommandError {
  constructor(
    interaction: any,
    mustReply: boolean = false,
    ephemeral: boolean = false
  ) {
    super({
      interaction: interaction,
      title: guildLanguageManager.translate(
        `errors.GuildTypeError.title`
      ) as string,
      description: guildLanguageManager.translate(
        `errors.GuildTypeError.description`
      ) as string,
      color: FalsonEmbedColors.Error,
      isMustReply: mustReply,
      ephemeral: ephemeral,
    });
  }
}

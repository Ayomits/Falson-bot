import { BaseCommandError } from "@src/abstractions/BaseError";
import guildLanguageManager from "@src/locales/I18nGuildManager";
import { FalsonEmbedColors } from "@src/types/djs/Colors";
import { CommandInteraction } from "discord.js";

export class GuildTypeError extends BaseCommandError {
  constructor(interaction: CommandInteraction) {
    super({
      interaction: interaction,
      title: guildLanguageManager.translate(
        `errors.GuildTypeError.title`
      ) as string,
      description: guildLanguageManager.translate(
        `errors.GuildTypeError.description`
      ) as string,
      color: FalsonEmbedColors.Error,
    });
  }
}

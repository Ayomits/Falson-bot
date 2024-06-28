import { BaseCommandError } from "@src/abstractions/BaseError";
import { FalsonEmbedColors } from "@src/types/djs/Colors";
import { CommandInteraction } from "discord.js";

export class ApiError extends BaseCommandError {
  constructor(interaction: CommandInteraction) {
    super({
      interaction: interaction,
      title: `Ошибка применения команды`,
      description: `В данный момент сервис обрабатывающий HTTP запрос неактивен. Команда не была вызвана`,
      color: FalsonEmbedColors.Error,
    });
  }
}

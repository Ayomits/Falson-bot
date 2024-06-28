import { BaseCommandError } from "@src/abstractions/BaseError";
import { FalsonEmbedColors } from "@src/types/djs/Colors";
import { CommandInteraction } from "discord.js";

export class DmsError extends BaseCommandError {
  constructor(interaction: CommandInteraction) {
    super({
      interaction: interaction,
      title: `Ошибка примененения команды`,
      description: `Команды данного типа невозможно применять в личных сообщениях!`,
      color: FalsonEmbedColors.Error,
    });
  }
}

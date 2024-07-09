import { BaseCommandError } from "@src/abstractions";
import { FalsonEmbedColors } from "@src/types";
import {
  AnySelectMenuInteraction,
  ButtonInteraction,
  CommandInteraction,
  ModalSubmitInteraction,
} from "discord.js";

export class ForbidenException extends BaseCommandError {
  constructor(
    interaction:
      | CommandInteraction
      | AnySelectMenuInteraction
      | ButtonInteraction
      | ModalSubmitInteraction
  ) {
    super({
      title: `Ошибка статуса`,
      description: `Ваш сервер не имеет достаточного статуса для использования этой функции`,
      color: FalsonEmbedColors.Error,
      interaction: interaction,
      isMustReply: true,
      ephemeral: true,
    });
  }
}

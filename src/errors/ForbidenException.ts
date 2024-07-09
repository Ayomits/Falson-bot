import { BaseCommandError } from "@src/abstractions";
import { FalsonEmbedColors } from "@src/types";

export class ForbidenException extends BaseCommandError {
  constructor(
    interaction: any,
    mustReply: boolean = false,
    ephemeral: boolean = false
  ) {
    super({
      title: `Ошибка статуса`,
      description: `Ваш сервер не имеет достаточного статуса для использования этой функции`,
      color: FalsonEmbedColors.Error,
      interaction: interaction,
      isMustReply: mustReply,
      ephemeral: ephemeral,
    });
  }
}

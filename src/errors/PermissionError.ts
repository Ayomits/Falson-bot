import { BaseCommandError } from "@src/abstractions";
import { FalsonEmbedColors } from "@src/types";

export class PermissionError extends BaseCommandError {
  constructor(
    interaction: any,
    mustReply: boolean = false,
    ephemeral: boolean = false
  ) {
    super({
      title: `Недостаток прав`,
      description: `У Вас недостаточно прав для совершения этого действия`,
      color: FalsonEmbedColors.Error,
      interaction: interaction,
      isMustReply: mustReply,
      ephemeral: ephemeral,
    });
  }
}

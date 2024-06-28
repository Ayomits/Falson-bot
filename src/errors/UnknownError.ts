import { BaseCommandError } from "@src/abstractions/BaseError";
import { FalsonEmbedColors } from "@src/types/djs/Colors";
import { CommandInteraction } from "discord.js";

export class UnknownError extends BaseCommandError {
  constructor(interaction: CommandInteraction) {
    super({
      interaction: interaction,
      title: `Unknown error`,
      description: `Unknown error. We're don't know how to help you and what's wrong. So sorry <3`,
      color: FalsonEmbedColors.Error,
    });
  }
}

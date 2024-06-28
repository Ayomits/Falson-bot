import { BaseCommandError } from "@src/abstractions/BaseError";
import { FalsonEmbedColors } from "@src/types/djs/Colors";
import { CommandInteraction } from "discord.js";

export class GuildTypeError extends BaseCommandError {
  constructor(interaction: CommandInteraction) {
    super({
      interaction: interaction,
      title: `Command error`,
      description: `This command is not available for your server`,
      color: FalsonEmbedColors.Error,
    });
  }
}

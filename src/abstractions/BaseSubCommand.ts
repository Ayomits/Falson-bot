import { SubCommandConfig } from "@src/types/djs/SubCommandConfig";
import { AutocompleteInteraction, CommandInteraction } from "discord.js";

export class BaseSubCommand {
  declare options: SubCommandConfig;
  constructor(options: SubCommandConfig) {
    this.options = options;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autoComplete(interaction: AutocompleteInteraction) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(interaction: CommandInteraction) {}
}

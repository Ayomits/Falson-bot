import { CommandConfig } from "@src/types/djs";
import { AutocompleteInteraction, CommandInteraction } from "discord.js";

export default class BaseCommand {
  declare readonly options: CommandConfig;

  constructor(options: CommandConfig) {
    this.options = options;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public execute(interaction: CommandInteraction) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public autoComplete?(interaction: AutocompleteInteraction) {}
}

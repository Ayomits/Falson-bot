import { AutocompleteInteraction, CommandInteraction } from "discord.js";

export default class BaseCommand {
  declare readonly name: string;
  declare readonly isSlash: boolean;
  declare readonly translations: {
    ru: string;
    en: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public execute(interaction: CommandInteraction) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public autoComplete?(interaction: AutocompleteInteraction) {}
}

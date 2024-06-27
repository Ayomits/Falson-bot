import {
  AutocompleteInteraction,
  CommandInteraction,
} from "discord.js";

export default abstract class BaseCommand {
  readonly name: string;
  readonly isSlash: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(interaction: CommandInteraction): any {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autoComplete?(interaction: AutocompleteInteraction): any {};
}

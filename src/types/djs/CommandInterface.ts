import {
  AutocompleteInteraction,
  CommandInteraction,
} from "discord.js";

/**
 * Этот класс нужен тупо для типов
 */
export class SlashCommandStructure {}

/**
 * Для работы с свойствами
 */
export interface ISlashCommandStructure {
  readonly name: string;
  isSlash: boolean;
  execute(interaction: CommandInteraction): any;
  autoComplete?(interaction: AutocompleteInteraction | any): any;
}

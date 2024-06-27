import {
  AutocompleteInteraction,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

/**
 * Этот класс нужен тупо для типов
 */
export class SlashCommandStructure {}

/**
 * Для работы с свойствами
 */
export interface ISlashCommandStructure {
  readonly data: SlashCommandBuilder;
  isSlash: boolean;
  execute(interaction: CommandInteraction): any;
  autoComplete?(interaction: AutocompleteInteraction | any): any;
}

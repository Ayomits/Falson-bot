import BaseEvent from "@src/abstractions/BaseEvent";
import { CommandInteraction, Events, Interaction } from "discord.js";
import { ApiError } from "@src/errors/ApiError";
import { UnknownError } from "@src/errors/UnknownError";
import guildLanguageManager from "@src/locales/I18nGuildManager";
import i18n from "@src/locales/i18n-instance";
import BaseCommand from "@src/abstractions/BaseCommand";
import { BaseSubCommand } from "@src/abstractions/BaseSubCommand";
import { GuildTypeError } from "@src/errors/GuildTypeError";
import { guildSettings } from "@src/rest/FalsonApiREST";

export class InteractionCreate extends BaseEvent {
  constructor() {
    super({
      name: Events.InteractionCreate,
      once: false,
    });
  }

  public execute(interaction: Interaction) {
    if (interaction.isCommand()) {
      try {
        try {
          const subCommand = (interaction.options as any)?.getSubcommand();
          if (subCommand) {
            const subCommandFromCache = interaction.client.subCommands.get(
              `${interaction.commandName}-${subCommand}`
            );
            return this.checkType(subCommandFromCache, interaction);
          }
        } catch {}
        const command = interaction.client.commands.get(
          `${interaction.commandName}`
        );
        if (!command) return;
        if (!command.options.isSlash) return;
        return this.checkType(command, interaction);
      } catch (err) {
        console.log(err);
        i18n.changeLanguage(interaction.locale.slice(0, 2));
        return new UnknownError(interaction);
      }
    }
    if (
      interaction.isAnySelectMenu() ||
      interaction.isButton() ||
      interaction.isModalSubmit()
    ) {
      const splitedCustomId = interaction.customId.split("_");
      const component = interaction.client.buttons.get(splitedCustomId[0]);
      if (interaction.isAnySelectMenu()) {
        const value = interaction.values[0];
        const valueCallback = interaction.client.values.get(value);
        if (valueCallback) {
          return valueCallback.execute(interaction);
        }
      }
      if (component) {
        return component.execute(interaction, splitedCustomId.slice(1));
      }
    }
  }

  private async checkType(
    command: BaseCommand | BaseSubCommand,
    interaction: CommandInteraction
  ) {
    try {
      const response = await guildSettings.fetchGuildSettings(
        interaction.guild.id
      );
      const guildLanguage = response.interfaceLanguage
        .slice(0, 2)
        .toLowerCase();
      guildLanguageManager.changeGuild(interaction.guild.id);
      if (
        guildLanguage !==
        guildLanguageManager.getLanguageForGuild(interaction.guild.id)
      ) {
        guildLanguageManager.setLanguageForGuild(
          interaction.guild.id,
          guildLanguage
        );
      }
      if (response.type < command.options.type)
        return new GuildTypeError(interaction);
      command.execute(interaction);
    } catch (err) {
      i18n.changeLanguage(interaction.locale.slice(0, 2));
      console.log(err);
      return new ApiError(interaction, false, true);
    }
  }
}

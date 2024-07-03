import BaseEvent from "@src/abstractions/BaseEvent";
import { DmsError } from "@src/errors/DmsError";
import { GuildResponse } from "@src/types/api/Responses";
import { FalsonAPIRoutes } from "@src/types/api/Routes";
import axios from "axios";
import { CommandInteraction, Events, Interaction } from "discord.js";
import { ApiError } from "@src/errors/ApiError";
import { UnknownError } from "@src/errors/UnknownError";
import guildLanguageManager from "@src/locales/I18nGuildManager";
import i18n from "@src/locales/i18n-instance";
import BaseCommand from "@src/abstractions/BaseCommand";
import { BaseSubCommand } from "@src/abstractions/BaseSubCommand";
import { GuildTypeError } from "@src/errors/GuildTypeError";
import { configService } from "@src/services/ConfigService";

export class InteractionCreate extends BaseEvent {
  constructor() {
    super({
      name: Events.InteractionCreate,
      once: false,
    });
  }

  public async execute(interaction: Interaction) {
    if (interaction.isCommand()) {
      try {
        await i18n.init();
        const subCommand = (interaction.options as any)?.getSubcommand();
        if (subCommand) {
          const subCommandFromCache = interaction.client.subCommands.get(
            `${interaction.commandName}-${subCommand}`
          );
          return this.checkType(subCommandFromCache, interaction);
        }
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
  }

  private async checkType(
    command: BaseCommand | BaseSubCommand,
    interaction: CommandInteraction
  ) {
    try {
      const start = Date.now();
      const response = (
        await axios.get(
          FalsonAPIRoutes.guildSettingsForGuild(interaction.guild?.id),
          {
            headers: {
              "x-bot-token": configService.get(`TOKEN`),
            },
          }
        )
      ).data as GuildResponse;
      const guildLanguage = response.interfaceLanguage;
      if (
        guildLanguage !==
        guildLanguageManager.getLanguageForGuild(interaction.guild.id)
      ) {
        guildLanguageManager.setLanguageForGuild(
          interaction.guild.id,
          guildLanguage.slice(0, 2).toLowerCase()
        );
      }
      if (response.type < command.options.type)
        return new GuildTypeError(interaction);
      await command.execute(interaction);
      console.log(Date.now() - start);
    } catch (err) {
      i18n.changeLanguage(interaction.locale.slice(0, 2));
      return new ApiError(interaction);
    }
  }

  private checkDms(
    command: BaseCommand | BaseSubCommand,
    interaction: CommandInteraction
  ) {
    if (!command.options.allowDms && interaction.channel?.isDMBased())
      return new DmsError(interaction);
    return true;
  }
}

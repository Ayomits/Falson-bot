import BaseEvent from "@src/abstractions/BaseEvent";
import { DmsError } from "@src/errors/DmsError";
import { GuildTypeError } from "@src/errors/GuildTypeError";
import { configService } from "@src/services/ConfigService";
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
        try {
          const subCommand = (interaction.options as any)?.getSubcommand();
          if (subCommand) {
            const subCommandFromCache = interaction.client.subCommands.get(
              `${interaction.commandName}-${subCommand}`
            );
            if (
              typeof this.checkDms(subCommandFromCache, interaction) !==
              "boolean"
            )
              return;
            return this.checkType(subCommandFromCache, interaction);
          }
        } catch {}
        const command = interaction.client.commands.get(
          interaction.commandName
        );

        if (!command) return;
        if (!command.options.isSlash) return;
        if (typeof this.checkDms(command, interaction) !== "boolean") return;
        return command.execute(interaction);
      } catch (err) {
        console.error(err);
        return new UnknownError(interaction);
      }
    }
  }

  private async checkType(
    command: BaseCommand | BaseSubCommand,
    interaction: CommandInteraction
  ) {
    try {
      const guildFromDb = await axios.get(
        FalsonAPIRoutes.guildSettingsForGuild(interaction.guild.id),
        {
          headers: {
            "x-bot-token": configService.get("TOKEN"),
          },
        }
      );
      const response = guildFromDb.data as GuildResponse;

      if (response.type < command.options.type) {
        return new GuildTypeError(interaction);
      }
      const resLang = response.interfaceLanguage.toLowerCase().slice(0, 2);
      const languageFromCache = guildLanguageManager.getLanguageForGuild(
        interaction.guild.id
      );
      if (languageFromCache !== resLang) {
        guildLanguageManager.setLanguageForGuild(interaction.guild.id, resLang);
      }

      return command.execute(interaction);
    } catch {
      return new ApiError(interaction);
    }
  }

  private checkDms(
    command: BaseCommand | BaseSubCommand,
    interaction: CommandInteraction
  ) {
    if (!command.options.allowDms && interaction.channel.isDMBased())
      return new DmsError(interaction);
    return true;
  }
}

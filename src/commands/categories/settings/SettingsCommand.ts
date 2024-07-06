import BaseCommand from "@src/abstractions/BaseCommand";
import { configService } from "@src/services/ConfigService";
import { GuildType } from "@src/types";
import { GuildResponse } from "@src/types/api/Responses";
import { FalsonAPIRoutes } from "@src/types/api/Routes";
import { FalsonEmbedColors } from "@src/types/djs/Colors";
import axios from "axios";
import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export class SettingsCommand extends BaseCommand {
  constructor() {
    super({
      isSlash: true,
      type: GuildType.Everyone,
      builder: new SlashCommandBuilder()
        .setName(`settings`)
        .setDescription(`Verification settings`)
        .setNameLocalizations({
          ru: "настройки",
          "en-US": "settings",
          "en-GB": "settings",
        })
        .setDescriptionLocalizations({
          ru: "Настройки верификации",
          "en-US": "Verification settings",
          "en-GB": "Verification settings",
        }),
    });
  }

  async execute(interaction: CommandInteraction) {
    await interaction.deferReply();
    const [guild, verificationSettings] = await Promise.all([
      axios.get(FalsonAPIRoutes.guildSettingsForGuild(interaction.guild.id), {
        headers: {
          "x-bot-token": configService.get("TOKEN"),
        },
      }),
      axios.get(
        FalsonAPIRoutes.verificationSettingsForGuild(interaction.guild.id),
        {
          headers: {
            "x-bot-token": configService.get("TOKEN"),
          },
        }
      ),
    ]);
    const embed = new EmbedBuilder()
      .setTitle(`Настройки для сервера`)
      .setColor(FalsonEmbedColors.Discord)
      .setThumbnail(interaction.guild.iconURL());
    console.log(guild);
    console.log(verificationSettings);
    return interaction.reply({ content: `idk`, ephemeral: true });
  }
}

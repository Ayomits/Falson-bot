import BaseCommand from "@src/abstractions/BaseCommand";
import { FalsonEmbedColors, GuildType } from "@src/types";
import {
  ActionRowBuilder,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
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
    // TODO: перевод всех команд и опций внутри
    await interaction.deferReply({ ephemeral: true });
    const embed = new EmbedBuilder()
      .setTitle(`Управление верификацией`)
      .setDescription(`При помощи меню ниже выберите настраиваемую категорию`)
      .setColor(FalsonEmbedColors.Discord)
      .setThumbnail(interaction.guild.iconURL());
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId(`settingscategory_${interaction.guild.id}`)
      .setOptions(
        {
          label: `Глобальная настройка`,
          value: `global`,
          description: `Установка общих настроек касающихся каждого типа верификации`,
          emoji: "⚙",
        },
        {
          label: `Голосовая верификация`,
          value: `voice`,
          description: `Настройка системы голосовой верификации`,
          emoji: "🔊",
        },
        {
          label: `Традиционная верификация`,
          value: `tradition`,
          description: `Настройка системы традиционной верификации`,
          emoji: "📖",
        },
        {
          label: `Логирование`,
          value: `logs`,
          description: `Настройка логирования`,
          emoji: "📝",
        }
      );
    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      selectMenu
    );
    return interaction.editReply({ components: [row], embeds: [embed] });
  }
}

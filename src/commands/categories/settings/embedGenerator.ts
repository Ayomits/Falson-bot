import { FalsonEmbedColors } from "@src/types";
import { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";

export function generateEmbed(interaction: any) {
  const embed = new EmbedBuilder()
    .setTitle(`Управление верификацией`)
    .setDescription(`При помощи меню ниже выберите настраиваемую категорию`)
    .setColor(FalsonEmbedColors.Discord)
    .setThumbnail(interaction.guild.iconURL());
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId(`settingscategory`)
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
      },
      {
        label: `Управление доступом`,
        value: `access`,
        description: "Роли, что смогут управлять этой панелью",
        emoji: "🗝",
      }
    )
    .setPlaceholder(`Выберите категорию настроек`);
  const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    selectMenu
  );

  return { embeds: [embed], components: [row] };
}

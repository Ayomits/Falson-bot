import { BaseSubCommand } from "@src/abstractions/BaseSubCommand";
import { UnknownError } from "@src/errors/UnknownError";
import { guildSettings } from "@src/rest/FalsonApiREST";

import {
  BadgesEmoji,
  FalsonEmbedColors,
  GuildType,
  GuildTypeNames,
} from "@src/types";
import { StringMerger } from "@src/utils/StringMerger";
import { CommandInteraction, EmbedBuilder } from "discord.js";

// TODO: перевести все сообщения

export class ServerProfileCommand extends BaseSubCommand {
  constructor() {
    super({
      name: `profile`,
      parentName: `server`,
      type: GuildType.Everyone,
      allowDms: false,
    });
  }

  async execute(interaction: CommandInteraction) {
    try {
      await interaction.deferReply();
      /**
       * guildSettings - штука, которая позволяет запрашивать к бекенду
       * Все подобные "врапперы" находятся в src/rest
       * Тебе в основном нужны методы начинающиеся на fetch и начинающиеся на update
       * В целом, это всё
       * Всё крайне хорошо затипизировано, так что ты можешь спокойно пихать те данные, что внутри DTO
       */
      const guild = await guildSettings.fetchGuildSettings(
        interaction.guild.id
      );
      const embed = new EmbedBuilder()
        .setColor(FalsonEmbedColors.Discord)
        .setTitle(`Профиль сервера ${interaction.guild.name}`)
        .addFields(
          {
            name: `**Основная информация**`,
            value: `👥 Количество участников: **${interaction.guild.memberCount}**\n🤖 Бот добавлен: <t:${Math.floor(new Date(guild.createdAt).getTime() / 1000)}>`,
            inline: false,
          },
          {
            name: `**Статус сервера**`,
            value: `\`${GuildTypeNames[guild.type]}\``,
            inline: true,
          },
          {
            name: `**Значки сервера**`,
            value: `**${guild.badges.length <= 0 ? "Нет" : StringMerger.emojiMerger(guild.badges, BadgesEmoji)}**`,
            inline: true,
          },
          {
            name: `**Язык интерфейса**`,
            value: `\`${guild.interfaceLanguage}\``,
          }
        )
        .setThumbnail(interaction.guild.iconURL())
        .setFooter({
          text: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp(new Date());
      interaction.editReply({ embeds: [embed] });
    } catch (err) {
      return new UnknownError(interaction);
    }
  }
}

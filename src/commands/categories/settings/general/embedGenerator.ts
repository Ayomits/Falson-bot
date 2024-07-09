import { generalVerification, guildSettings } from "@src/rest/FalsonApiREST";
import {
  FalsonEmbedColors,
  VerificationType,
  VerificationTypeWords,
} from "@src/types";
import { StringMerger } from "@src/utils/StringMerger";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Guild,
  RoleSelectMenuBuilder,
  StringSelectMenuBuilder,
} from "discord.js";

export async function generalEmbedGenerator(guild: Guild) {
  const [settings, guildFromDb] = await Promise.all([
    generalVerification.fetchGeneralSettings(guild.id),
    guildSettings.fetchGuildSettings(guild.id),
  ]);
  const embed = new EmbedBuilder()
    .setTitle(`Глобальная настройка`)
    .setColor(FalsonEmbedColors.Discord)
    .setThumbnail(guild.iconURL())
    .setFields(
      {
        name: `Тип верификации`,
        value: `**${VerificationTypeWords[settings.type]}**`,
        inline: false,
      },
      {
        name: `Язык`,
        value: `**${guildFromDb.interfaceLanguage}**`,
        inline: true,
      },
      {
        name: `Роли неверифицированного пользователя`,
        value: `${settings.unverifyRole ? StringMerger.roleMerger([settings.unverifyRole]) : "**Нет**"}`,
        inline: false,
      },
      {
        name: "Роли для верификации",
        value: `${settings.verificationRoles.length >= 1 ? StringMerger.roleMerger(settings.verificationRoles) : "**Нет**"}`,
        inline: false,
      }
    );
  const verificationTypeSelect =
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(`verificationTypeChanger`)
        .setPlaceholder(`Выберите тип верификации`)
        .setOptions(
          {
            label: `Традиционная`,
            value: `${VerificationType.Traditional}`,
            description: "Привычная всем верификация по кнопкам",
            emoji: "📖",
          },
          {
            label: `Голосовая`,
            value: `${VerificationType.Voice}`,
            description: "Полноценная система support как на крупных серверах",
            emoji: "🔊",
          },
          {
            label: `Двойной [PREMIUM]`,
            value: `${VerificationType.Both}`,
            description: "Система с голосовой и традиционной верификацией",
            emoji: "🛠",
          }
        )
    );
  const languageSelectMenu =
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(`languageSelectMenu`)
        .setPlaceholder(`Выберите язык интерфейса верификации`)
        .setOptions(
          {
            label: `Русский`,
            value: "Russian",
            emoji: "🇷🇺",
          },
          {
            label: `English`,
            value: `English`,
            emoji: "🇺🇸",
          }
        )
    );
  const unverifyRole =
    new ActionRowBuilder<RoleSelectMenuBuilder>().addComponents(
      new RoleSelectMenuBuilder()
        .setCustomId(`unverifyRoleSelect`)
        .setPlaceholder(`Выберите роль неверифицированного участника`)
    );
  const verificationRoles =
    new ActionRowBuilder<RoleSelectMenuBuilder>().addComponents(
      new RoleSelectMenuBuilder()
        .setCustomId(`verificationRolesSelect`)
        .setMaxValues(25)
        .setDefaultRoles(
          settings.verificationRoles
            ? settings.verificationRoles.filter((role) =>
                guild.roles.cache.get(role)
              )
            : []
        )

        .setPlaceholder(`Выберите роли верификации`)
    );
  const defaultSettings = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`defaultSettings`)
      .setLabel(`Сбросить настройки`)
      .setStyle(ButtonStyle.Danger)
  );
  return {
    embeds: [embed],
    components: [
      verificationTypeSelect,
      languageSelectMenu,
      unverifyRole,
      verificationRoles,
      defaultSettings,
    ],
  };
}

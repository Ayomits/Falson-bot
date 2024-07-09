import { generalVerification } from "@src/rest/FalsonApiREST";
import {
  FalsonEmbedColors,
  VerificationType,
  VerificationTypeWords,
} from "@src/types";
import { StringMerger } from "@src/utils/StringMerger";
import {
  ActionRowBuilder,
  EmbedBuilder,
  Guild,
  StringSelectMenuBuilder,
} from "discord.js";

export async function traditionEmbedGenerator(guild: Guild) {
  const settings = await generalVerification.fetchGeneralSettings(guild.id);
  const embed = new EmbedBuilder()
    .setTitle(`Глобальная настройка`)
    .setColor(FalsonEmbedColors.Discord)
    .setThumbnail(guild.iconURL())
    .setFields(
      {
        name: `Тип верификации`,
        value: `${VerificationTypeWords[settings.type]}`,
        inline: false,
      },
      {
        name: `Роли неверифицированного пользователя`,
        value: `${settings.unverifyRole ? StringMerger.roleMerger([settings.unverifyRole]) : "**Нет**"}`,
        inline: true,
      },
      {
        name: "Роли для верификации",
        value: `${settings.verificationRoles.length >= 1 ? StringMerger.roleMerger(settings.verificationRoles) : "**Нет**"}`,
        inline: true,
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

  return { embed, verificationTypeSelect };
}

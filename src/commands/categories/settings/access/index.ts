import BaseSelectMenuValue from "@src/abstractions/BaseSelectMenuValue";
import { ApiError } from "@src/errors/ApiError";
import { guildSettings } from "@src/rest/FalsonApiREST";
import { FalsonEmbedColors, GuildResponse } from "@src/types";
import { StringMerger } from "@src/utils/StringMerger";
import {
  ActionRowBuilder,
  AnySelectMenuInteraction,
  ButtonBuilder,
  EmbedBuilder,
  RoleSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { generateButton } from "../BackToMain";

// TODO: перевести все сообщения

export class AccessManager extends BaseSelectMenuValue {
  value: string = "access";
  async execute(interaction: StringSelectMenuInteraction) {
    const guild = await guildSettings.fetchGuildSettings(interaction.guild.id);
    if (!guild) {
      return new ApiError(interaction, true, true);
    }
    await interaction.deferUpdate();

    return interaction.editReply(
      AccessManager.generateEmbed(interaction, guild)
    );
  }

  static generateEmbed(
    interaction: AnySelectMenuInteraction,
    guild: GuildResponse
  ) {
    const embed = new EmbedBuilder()
      .setTitle(`Управление доступом к команде settings`)
      .setColor(FalsonEmbedColors.Discord)
      .setThumbnail(interaction.guild.iconURL())
      .addFields({
        name: `Роли с доступом`,
        value: `${guild.trustedRoles.length >= 1 ? StringMerger.roleMerger(guild.trustedRoles) : "Нет"}`,
      });
    const rolesSelect =
      new ActionRowBuilder<RoleSelectMenuBuilder>().addComponents(
        new RoleSelectMenuBuilder()
          .setCustomId(`roleAccessSelect`)
          .setMaxValues(25)
          .setDefaultRoles(
            guild.trustedRoles.filter((role) =>
              interaction.guild.roles.cache.get(role)
            )
          )
          .setPlaceholder(`Выберите роли для выдачи доступа к панели настроек`)
      );
    const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      generateButton()
    );
    return { embeds: [embed], components: [rolesSelect, buttonsRow] };
  }
}

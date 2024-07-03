import BaseCommand from "@src/abstractions/BaseCommand";
import { GuildType } from "@src/types";
import { SlashCommandBuilder } from "discord.js";

export class ServerCommand extends BaseCommand {
  constructor() {
    super({
      type: GuildType.Everyone,
      isSlash: true,
      builder: new SlashCommandBuilder()
        .setName(`server`)
        .setDescription(`Actions with server inside a bot`)
        .setDMPermission(false)
        .setNameLocalizations({
          ru: "сервер",
          "en-US": "server",
        })
        .setDescriptionLocalizations({
          ru: "Действия с сервером внутри бота",
          "en-US": "Actions with server inside a bot",
        })
        .addSubcommand((command) =>
          command
            .setName(`profile`)
            .setDescription(`Information about your server`)
            .setNameLocalizations({
              ru: "профиль",
              "en-US": "profile",
            })
            .setDescriptionLocalizations({
              ru: "Информация о вашем сервере",
              "en-US": "Information about your server",
            })
        )
        .addSubcommand((command) =>
          command
            .setName(`partner`)
            .setDescription(`Becoming server partner`)
            .setNameLocalizations({
              ru: "партнёр",
              "en-US": "partner",
            })
            .setDescriptionLocalizations({
              ru: "Становление сервером партнёром",
              "en-US": "Becoming server partner",
            })
        ),
    });
  }
}

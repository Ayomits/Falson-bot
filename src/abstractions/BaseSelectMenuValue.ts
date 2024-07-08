import {
  AnySelectMenuInteraction,
  ChannelSelectMenuInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
} from "discord.js";

export default class BaseSelectMenuValue {
  declare readonly value: string;
  async execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _interaction:
      | StringSelectMenuInteraction
      | RoleSelectMenuInteraction
      | ChannelSelectMenuInteraction
      | UserSelectMenuInteraction
      | AnySelectMenuInteraction
  ) {}
}

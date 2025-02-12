import {
  AnySelectMenuInteraction,
  ButtonInteraction,
  ChannelSelectMenuInteraction,
  ModalSubmitInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
} from "discord.js";

export default class BaseComponent {
  declare readonly customId: string;
  execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interaction:
      | ButtonInteraction
      | ModalSubmitInteraction
      | StringSelectMenuInteraction
      | RoleSelectMenuInteraction
      | ChannelSelectMenuInteraction
      | AnySelectMenuInteraction,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    args?: string[]
  ) {}
}

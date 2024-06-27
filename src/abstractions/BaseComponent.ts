import {
  ButtonInteraction,
  ChannelSelectMenuInteraction,
  ModalSubmitInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
} from "discord.js";

export default abstract class BaseComponent {
  readonly customId: string;
  execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interaction:
      | ButtonInteraction
      | ModalSubmitInteraction
      | StringSelectMenuInteraction
      | RoleSelectMenuInteraction
      | ChannelSelectMenuInteraction
  ): any {}
}

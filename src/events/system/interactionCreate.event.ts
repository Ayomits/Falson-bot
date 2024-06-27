import BaseEvent from "@src/abstractions/BaseEvent";
import { Events, Interaction } from "discord.js";

export class InteractionCreate extends BaseEvent {
  declare name: Events;
  declare once: boolean;

  constructor() {
    super();
    this.name = Events.InteractionCreate;
    this.once = false;
  }

  public async execute(interaction: Interaction) {
    if (interaction.isCommand()) {
      const command = interaction.client.commands?.get(interaction.commandName);
      if (!command || !command.isSlash) return;

      try {
        return command?.execute(interaction);
      } catch (err) {
        console.log(err);
      }
    } else if (
      interaction.isButton() ||
      interaction.isAnySelectMenu() ||
      interaction.isModalSubmit()
    ) {
      const component = interaction.client.buttons?.get(interaction.customId);
      try {
        return component?.execute(interaction as any);
      } catch (err) {
        console.log(err);
      }
    } else if (interaction.isAutocomplete()) {
      const command = interaction.client.commands?.get(interaction.commandName);
      if (command?.autoComplete) {
        try {
          return command?.autoComplete(interaction);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
}

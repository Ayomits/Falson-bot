import { ColorResolvable, CommandInteraction } from "discord.js";

export type ErrorConfig = {
  description: string;
  title: string;
  color: ColorResolvable;
  interaction: CommandInteraction;
};

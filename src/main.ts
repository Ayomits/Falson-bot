import { Client, Collection, GatewayIntentBits } from "discord.js";
import { configService } from "./services/ConfigService";
import BaseCommand from "./abstractions/BaseCommand";
import BaseComponent from "./abstractions/BaseComponent";
import ActionCollector from "./utils/ActionCollector";
import { BaseSubCommand } from "./abstractions/BaseSubCommand";
import i18n from "./locales/i18n-instance";

declare module "discord.js" {
  export interface Client {
    commands?: Collection<string, BaseCommand>;
    buttons?: Collection<string, BaseComponent>;
    subCommands?: Collection<string, BaseSubCommand>;
  }
}
export async function discordJsInitialize() {
  const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ];

  const client: Client = new Client({ intents: intents });

  client.commands = new Collection<string, BaseCommand>(); // Команды
  client.subCommands = new Collection<string, BaseSubCommand>();
  client.buttons = new Collection<string, BaseComponent>(); // Кнопки, селекты, модалки и т.п.
  await i18n.init();
  new ActionCollector(client);
  client
    .login(configService.get(`TOKEN`))
    .then(() =>
      console.log(
        `${client.user.tag}\nКоличество команд: ${client.commands.size}`
      )
    );
}

discordJsInitialize();

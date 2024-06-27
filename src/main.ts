import { Client, Collection, GatewayIntentBits } from "discord.js";
import EventHandlerService from "./utils/event.collector";
import { configService } from "./services/ConfigService";
import BaseCommand from "./abstractions/BaseCommand";
import BaseComponent from "./abstractions/BaseComponent";

declare module "discord.js" {
  export interface Client {
    commands?: Collection<string, BaseCommand>;
    buttons?: Collection<string, BaseComponent>;
  }
}
export function discordJsInitialize() {
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
  client.buttons = new Collection<string, BaseComponent>(); // Кнопки, селекты, модалки и т.п.

  new EventHandlerService(client);
  client
    .login(configService.get(`TOKEN`))
    .then(() => console.log(`${client.user.tag}`));
}

discordJsInitialize();

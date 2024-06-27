import "module-alias/register";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import EventHandlerService from "./events/ready/collectors/event.collector";
import { ISlashCommandStructure } from "./types/djs/CommandInterface";
import { configService } from "./services/ConfigService";
import { IComponentStructure } from "./types/djs";

declare module "discord.js" {
  export interface Client {
    commands?: Collection<string, ISlashCommandStructure>;
    buttons?: Collection<string, IComponentStructure>;
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

  client.commands = new Collection<string, ISlashCommandStructure>(); // Команды
  client.buttons = new Collection<string, IComponentStructure>(); // Кнопки, селекты, модалки и т.п.

  new EventHandlerService(client);
  client
    .login(configService.get(`TOKEN`))
    .then(() => console.log(`${client.user.tag}`));
}

discordJsInitialize();
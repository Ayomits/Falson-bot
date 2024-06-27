import { Client, Collection, GatewayIntentBits } from "discord.js";
import EventHandlerService from "./events/ready/collectors/event.collector";
import { ISlashCommandStructure } from "./types/interfaces/CommandInterface";
import { configService } from "./services/ConfigService";
import { IComponentStructure } from "./types/interfaces";

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildVoiceStates,
];

export const client: Client = new Client({ intents: intents });

client.commands = new Collection<string, ISlashCommandStructure>(); // Команды
client.buttons = new Collection<string, IComponentStructure>(); // Кнопки, селекты, модалки и т.п.

new EventHandlerService(client);
client.login(configService.get(`TOKEN`));

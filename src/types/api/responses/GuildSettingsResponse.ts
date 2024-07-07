import { Badges, LanguageType } from "../../guilds";

export type GuildResponse = {
  guildId: string;
  type: number;
  createdAt: Date;
  trustedRoles: string[];
  badges: Badges[];
  interfaceLanguage: LanguageType;
};
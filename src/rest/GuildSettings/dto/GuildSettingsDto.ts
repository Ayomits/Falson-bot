import { Badges, LanguageType } from "@src/types";

export type CreateGuildSettingsDto = {
  guildId: string;
  type?: number;
  createdAt?: Date;
  trustedRoles?: string[];
  badges?: Badges[];
  interfaceLanguage?: LanguageType;
};

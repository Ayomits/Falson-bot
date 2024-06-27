import { LanguageType, Badges } from "../guilds";

export type GuildResponse = {
  guildId: string;
  type: number;
  createdAt: Date;
  trustedRoles: string[];
  badges: Badges[];
  commandLanguage: LanguageType;
  interfaceLanguage: LanguageType;
};

export type GuildCommandResponse = {
  guildId: string;
  commandName: string;
  isEnabled: boolean;
};

export type VerificationEmbedResponse = {
  guildId: string;
  title: string;
  description: string;
  thumbnail: string;
  image: string;
  footer: {
    url: string;
    value: string;
  };
  author: {
    url: string;
    value: string;
  };
};

export type VerificationGeneralResponse = {
  guildId: string;
  feedbacksLog: string;
  acceptionLog: string;
  verificationLog: string;
  verificationRoles: string[];
};
export type VerificationTraditionResponse = {
  guildId: string;
  channelId: string;
  isDouble: boolean;
};
export type VerificationVoiceResponse = {
  guildId: string;
  verificationCategories: string[];
  verificationIgnoredChannels: string[];
  verificationStaffCurators: string[];
  verificationStaffSupports: string[];
};

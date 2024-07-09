import { Badges, GuildType, LanguageType } from "@src/types/guilds";

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
export type DeleteResponse = { message: string };


export type GuildResponse = {
  guildId: string;
  type: number;
  createdAt: Date;
  trustedRoles: string[];
  badges: Badges[];
  interfaceLanguage: LanguageType;
};

export type GuildMemberResponse = {
  guildId: string;
  joinedTimestamp: number;
  premiumSinceTimestamp: Date | null;
  nickname: string | null;
  pending: boolean;
  communicationDisabledUntilTimestamp: Date | null;
  userId: string;
  avatar: string | null;
  flags: number;
  displayName: string;
  roles: string[];
  avatarURL: string | null;
  displayAvatarURL: string;
};

export type VerificationVoiceResponse = {
  guildId: string;
  verificationCategories: string[];
  verificationIgnoredChannels: string[];
  verificationStaffFullAccess: string[];
  verificationStaffCurators: string[];
  verificationStaffSupport: string;
};


export type VerificationGeneralResponse = {
  guildId: string;
  verificationRoles: string[];
  unverifyRole: string
  type: GuildType
};

export type VerificationTraditionResponse = {
  guildId: string;
  channelId: string;
  isDouble: boolean;
};

export type VerificationLogsResponse = {
  feedbacksLog: string;
  acceptionLog: string;
  verificationLog: string;
};


export type VerificationResponse = {
  tradition: VerificationTraditionResponse;
  general: VerificationGeneralResponse;
  voice: VerificationVoiceResponse;
  embeds: VerificationEmbedResponse[];
  logs: VerificationLogsResponse;
};

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
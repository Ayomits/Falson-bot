export type VerificationVoiceResponse = {
  guildId: string;
  verificationCategories: string[];
  verificationIgnoredChannels: string[];
  verificationStaffCurators: string[];
  verificationStaffSupports: string[];
};
export type VerificationVoiceResponse = {
  guildId: string;
  verificationCategories: string[];
  verificationIgnoredChannels: string[];
  verificationStaffFullAccess: string[];
  verificationStaffCurators: string[];
  verificationStaffSupport: string;
};

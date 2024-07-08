export type GeneralSettingsDto = {
  guildId: string;
  feedbacksLog?: string;
  acceptionLog?: string;
  verificationLog?: string;
  verificationRoles?: string[];
  unverifyRole?: string
}
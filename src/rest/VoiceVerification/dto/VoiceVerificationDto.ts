export type CreateVoiceVerificationDto = {
  guildId: string;
  verificationCategories?: string[];
  verificationIgnoredChannels?: string[];
  verificationStaffCurators?: string[];
  verificationStaffSupports?: string[];
};

export type UpdateVoiceVerificationDto = {
  verificationCategories?: string[];
  verificationIgnoredChannels?: string[];
  verificationStaffCurators?: string[];
  verificationStaffSupports?: string[];
};

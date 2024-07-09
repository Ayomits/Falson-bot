import { VerificationType } from "@src/types";

export type GeneralSettingsDto = {
  guildId?: string;
  verificationRoles?: string[];
  unverifyRole?: string
  type?: VerificationType
}
import { VerificationEmbedResponse } from "./VerificationEmbedResponse";
import { VerificationGeneralResponse } from "./VerificationGeneralResponse";
import { VerificationTraditionResponse } from "./VerificationTradition";
import { VerificationVoiceResponse } from "./VerificationVoiceResponse";

export type VerificationResponse = {
  tradition: VerificationTraditionResponse;
  general: VerificationGeneralResponse;
  voice: VerificationVoiceResponse;
  embeds: VerificationEmbedResponse[];
};
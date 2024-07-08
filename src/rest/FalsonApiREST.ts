import { GeneralSettingsREST } from "./GeneralSettings";
import { GuildSettingsREST } from "./GuildSettings";
import { TraditionVerificationREST } from "./TraditionVerification";
import { TraditionVerificationEmbedREST } from "./TraditionVerificationEmbed";
import { VerificationREST } from "./Verification";
import { VoiceVerificationREST } from "./VoiceVerification";

export const guildSettings = new GuildSettingsREST();
export const traditionVerification = new TraditionVerificationREST();
export const traditionVerificationEmbed = new TraditionVerificationEmbedREST();
export const verification = new VerificationREST();
export const voiceVerification = new VoiceVerificationREST();
export const generalVerification = new GeneralSettingsREST();

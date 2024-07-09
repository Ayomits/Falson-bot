import { GeneralSettingsREST } from "./GeneralSettings";
import { GuildSettingsREST } from "./GuildSettings";
import { TraditionVerificationREST } from "./TraditionVerification";
import { TraditionVerificationEmbedREST } from "./TraditionVerificationEmbed";
import { VoiceVerificationREST } from "./VoiceVerification";

/**
 * А вот собственно и Rest
 * Тут находятся подобные "врапперы"
 * От них в основном нужны методы fetch и update
 * Можешь зайти во внутрь любого и понять это
 * 
 */

export const guildSettings = new GuildSettingsREST();
export const traditionVerification = new TraditionVerificationREST();
export const traditionVerificationEmbed = new TraditionVerificationEmbedREST();
export const voiceVerification = new VoiceVerificationREST();
export const generalVerification = new GeneralSettingsREST();

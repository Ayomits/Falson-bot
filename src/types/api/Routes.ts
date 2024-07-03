import { configService } from "@src/services/ConfigService";

export class FalsonAPIRoutes {
  static backendUrl = configService.get(`BACKEND_URL`);

  /**
   * Routes FOR:
   * - GET `/commands/documentation/{language}`
   */
  static documentationCommands(language: string): string {
    return `${this.backendUrl}/commands/documentation/${language}`;
  }

  /**
   * Routes FOR:
   * - GET `/commands/documentation/{language}/{commandName}`
   */
  static documentationCommand(language: string, commandName: string): string {
    return `${this.backendUrl}/commands/documentation/${language}/${commandName}`;
  }
  
  /**
   * Routes FOR:
   * - POST `/commands/guild-settings/`
   */
  static guildSettings() {
    return `${this.backendUrl}/guilds-settings`;
  }

  /**
   * Routes FOR:
   * - GET `/guild-settings/{guildId}`
   * - PUT `/guild-settings/{guildId}`
   * - DELETE `/guild-settings/{guildId}`
   * - HEADERS: `X-BOT-TOKEN: BOT TOKEN`
   */
  static guildSettingsForGuild(guildId: string): string {
    return `${this.backendUrl}/guild-settings/${guildId}`;
  }

  /**
   * Routes FOR:
   * - PATCH `/guild-settings/${guildId}/languages`
   * - HEADERS: `X-BOT-TOKEN: BOT TOKEN`
   */
  static guildSettingsForGuildLanguages(guildId: string) {
    return `${this.backendUrl}/guild-settings/${guildId}/languages`;
  }

  /**
   * Routes FOR:
   * - GET `/stats/bot`
   */
  static botStats() {
    return `${this.backendUrl}/stats/bot`;
  }
  /**
   * Routes FOR:
   * - GET `/verifications/{guildId}`
   * - HEADERS: `X-BOT-TOKEN: BOT TOKEN`
   */
  static verificationSettingsForGuild(guildId: string) {
    return `${this.backendUrl}/verifications/${guildId}`;
  }

  /**
   * Routes FOR:
   * - Patch `/verifications/${guildId}/type`
   */
  static verificationSettingsType(guildId: string) {
    return `${this.backendUrl}/verifications/${guildId}/type`;
  }

  /**
   * Routes FOR:
   * - POST `/verifications/embeds/{guildId}`
   */
  static verificationGuildEmbedCreate(guildId: string) {
    return `${this.backendUrl}/verifications/${guildId}`;
  }

  /**
   * Routes FOR:
   * - GET `verifications/embeds/{guildId}/all
   */

  static verificationGuildEmbeds(guildId: string) {
    return `${this.backendUrl}/verifications/${guildId}/embeds/all`;
  }

  /**
   * Routes FOR:
   * - GET `verifications/embeds/{guildId}/{objectId}
   * - PATCH `verifications/embeds/{guildId}/{objectId}`
   * - DELETE `verifications/embeds/{guildId}/{objectId}`
   */
  static verificationGuildEmbed(guildId: string, objectId: string) {
    return `${this.backendUrl}/verifications/${guildId}/embeds/${objectId}`;
  }

  /**
   * Routes FOR:
   * - POST `/verifications/general`
   */
  static generalVerification() {
    return `${this.backendUrl}/verifications/general`;
  }
  /**
   * Routes FOR:
   * - GET `/verifications/general/${guildId}`
   * - PATCH `/verifications/general/${guildId}`
   */
  static generalVerificationForGuild(guildId: string) {
    return `${this.backendUrl}/verifications/general/${guildId}`;
  }

  /**
   * Routes FOR:
   * - POST `/verifications/tradition`
   */
  static traditionVerification() {
    return `${this.backendUrl}/verifications/tradition`;
  }

  /**
   * Routes FOR:
   * - GET `/verifications/general/${guildId}`
   * - PATCH `/verifications/general/${guildId}`
   * - DELETE `/verifications/general/${guildId}`
   */
  static traditionVerificationForGuild(guildId: string) {
    return `${this.backendUrl}/verifications/tradition/${guildId}`;
  }

  /**
   * Routes FOR:
   * - POST `/verifications/voice`
   */
  static voiceVerification() {
    return `${this.backendUrl}/verifications/voice`;
  }

  /**
   * Routes FOR:
   * - GET `/verifications/voice/${guildId}`
   * - PATCH `/verifications/voice/${guildId}`
   * - DELETE `/verifications/voice/${guildId}`
   */
  static voiceVerificationForGuild(guildId: string) {
    return `${this.backendUrl}/verifications/voice/${guildId}`;
  }
}

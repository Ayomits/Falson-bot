import { BaseRest } from "@src/abstractions/";

export class GuildSettings extends BaseRest {
  constructor() {
    super();
  }

  /**
   * - **GET** запрос к `guild-settings/${guildId}`
   */
  async fetchGuildSettings() {}

  /**
   * - **PATCH** запрос к `guild-settings/${guildId}/languages`
   */
  async updateLanguage(dto: { interfaceLanguage: string }) {}
}

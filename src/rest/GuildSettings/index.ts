export * from "./dto";
import { FalsonAPIRoutes } from "@src/types/";
import { BaseRest } from "@src/abstractions/";
import { DeleteResponse, GuildResponse } from "@src/types/";
import { CreateGuildSettingsDto, LanguagesDto } from "./dto";

export class GuildSettingsREST extends BaseRest {
  constructor() {
    super();
  }

  /**
   * - **GET** запрос к `guild-settings/${guildId}`
   */
  async fetchGuildSettings(guildId: string): Promise<GuildResponse | null> {
    const guild = await this.baseQuery<GuildResponse>(
      FalsonAPIRoutes.guildSettingsForGuild(guildId),
      "GET"
    );
    return guild;
  }
  /**
   *
   * - **POST** запрос к `guild-settings/${guildId}`
   */
  async createGuildSettings(
    guildId: string,
    dto: CreateGuildSettingsDto
  ): Promise<GuildResponse | null> {
    const guild = await this.baseQuery<GuildResponse>(
      FalsonAPIRoutes.guildSettingsForGuild(guildId),
      "POST",
      { ...dto }
    );
    return guild;
  }

  /**
   * - **PATCH** запрос к `guild-settings/${guildId}/languages`
   */
  async updateLanguage(
    guildId: string,
    dto: LanguagesDto
  ): Promise<GuildResponse | null> {
    return await this.baseQuery<GuildResponse>(
      FalsonAPIRoutes.guildSettingsForGuildLanguages(guildId),
      "PATCH",
      { ...dto }
    );
  }
  /**
   *
   * - **PUT** запрос к `guild-settings/${guildId}`
   */
  async updateTrustedRoles(
    guildId: string,
    roles: string[]
  ): Promise<GuildResponse | null> {
    return await this.baseQuery<GuildResponse>(
      FalsonAPIRoutes.guildSettingsForGuild(guildId),
      "PUT",
      { roles: roles }
    );
  }
  /**
   * - **DELETE** запрос к `/guild-settings/${guildId}`
   */
  async deleteGuildSettings(guildId: string) {
    return await this.baseQuery<DeleteResponse>(
      FalsonAPIRoutes.guildSettingsForGuild(guildId),
      "DELETE"
    );
  }
}

export * from "./dto";

import { BaseRest } from "@src/abstractions";
import {
  DeleteResponse,
  FalsonAPIRoutes,
  VerificationEmbedResponse,
} from "@src/types";
import { CreateVerificationEmbedDto } from "./dto";

export class TraditionVerificationEmbedREST extends BaseRest {
  constructor() {
    super();
  }

  /**
   *
   * - **GET** запрос к `/verifications/embeds/:guildId/all`
   */
  async fetchGuildVerificationEmbeds(
    guildId: string
  ): Promise<VerificationEmbedResponse[] | null> {
    return await this.baseQuery<VerificationEmbedResponse[]>(
      FalsonAPIRoutes.verificationGuildEmbeds(guildId),
      "GET"
    );
  }

  /**
   *
   * - **GET** запрос к `/verifications/embeds/:guildId/:objectId`
   */
  async fetchGuildVerificationEmbed(guildId: string, objectId: string) {
    return await this.baseQuery<VerificationEmbedResponse>(
      FalsonAPIRoutes.verificationGuildEmbed(guildId, objectId),
      "GET"
    );
  }
  /**
   *
   * - **POST** запрос к `/verifications/embeds/:guildId/`
   */
  async createVerificationEmbedForGuild(
    guildId: string,
    dto: CreateVerificationEmbedDto
  ) {
    return await this.baseQuery<VerificationEmbedResponse>(
      FalsonAPIRoutes.verificationGuildEmbedCreate(guildId),
      "POST",
      { ...dto }
    );
  }
  /**
   *
   * - **PATCH** запрос к `/verifications/embeds/:guildId/:objectID`
   */
  async updateGuildVerificationEmbed(
    guildId: string,
    objectId: string,
    dto: CreateVerificationEmbedDto
  ) {
    return await this.baseQuery<VerificationEmbedResponse>(
      FalsonAPIRoutes.verificationGuildEmbed(guildId, objectId),
      "PATCH",
      { ...dto }
    );
  }

  /**
   *
   * - **DELETE** запрос к `/verifications/embeds/:guildId/:objectID`
   */
  async deleteGuildVerificationEmbed(guildId: string, objectId: string) {
    return await this.baseQuery<DeleteResponse>(
      FalsonAPIRoutes.verificationGuildEmbed(guildId, objectId),
      "DELETE"
    );
  }
}

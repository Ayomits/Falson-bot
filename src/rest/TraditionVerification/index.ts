import { BaseRest } from "@src/abstractions";
import { FalsonAPIRoutes, VerificationTraditionResponse } from "@src/types";
import { TradionVerificationDto } from "./dto";

export * from "./dto";

export class TraditionVerificationREST extends BaseRest {
  constructor() {
    super();
  }
  
  /**
   * - **GET** запрос к `/verifications/tradition/${guildId}`
   */
  async fetchTraditionVerificationForGuild(
    guildId: string
  ): Promise<VerificationTraditionResponse | null> {
    return await this.baseQuery<VerificationTraditionResponse>(
      FalsonAPIRoutes.traditionVerificationForGuild(guildId),
      "GET"
    );
  }

  /**
   * - **POST** запрос к `/verifications/tradition/`
   */
  async createTraditionVerification(dto: TradionVerificationDto) {
    return await this.baseQuery<VerificationTraditionResponse>(
      FalsonAPIRoutes.traditionVerification(),
      "POST",
      { ...dto }
    );
  }

  /**
   * - **PATCH** запрос к `/verifications/tradition/${guildId}`
   */
  async updateTraditionVerification(
    guildId: string,
    dto: TradionVerificationDto
  ) {
    return await this.baseQuery<VerificationTraditionResponse>(
      FalsonAPIRoutes.traditionVerificationForGuild(guildId),
      "PATCH",
      { ...dto }
    );
  }

  /**
   * - **DELETE** запрос к `/verifications/tradition/${guildId}`
   */
  async deleteTraditionVerification(guildId: string) {
    return await this.baseQuery<VerificationTraditionResponse>(
      FalsonAPIRoutes.traditionVerificationForGuild(guildId),
      "DELETE"
    );
  }
}

export * from './dto';
import { BaseRest } from "@src/abstractions";
import { FalsonAPIRoutes, VerificationResponse } from "@src/types";
import { VerificationTypeDto } from "./dto";

export class VerificationREST extends BaseRest {
  constructor() {
    super();
  }

  /**
   * - **GET** запрос к `/verification/:guildId/`
   */
  async fetchVerificationForGuild(guildId: string) {
    return await this.baseQuery<VerificationResponse>(
      FalsonAPIRoutes.verificationSettingsForGuild(guildId),
      "GET"
    );
  }
  /**
   * - **PATCH** запрос к `/verification/:guildId/type`
   */
  async changeVerificationType(guildId: string, dto: VerificationTypeDto) {
    return await this.baseQuery<VerificationResponse>(
      FalsonAPIRoutes.verificationSettingsType(guildId),
      "PATCH",
      dto
    );
  }
}

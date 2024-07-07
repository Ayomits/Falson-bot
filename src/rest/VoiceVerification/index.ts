export * from "./dto";
import { BaseRest } from "@src/abstractions";
import {
  DeleteResponse,
  FalsonAPIRoutes,
  VerificationVoiceResponse,
} from "@src/types";
import { CreateVoiceVerificationDto, UpdateVoiceVerificationDto } from "./dto/";

export class VoiceVerificationREST extends BaseRest {
  /**
   * - **GET** запрос к `/verifications/voice/:guildId`
   */
  async fetchVoiceVerification(guildId: string) {
    return await this.baseQuery<VerificationVoiceResponse>(
      FalsonAPIRoutes.voiceVerificationForGuild(guildId),
      "GET"
    );
  }
  /**
   * - **POST** запрос к `/verifications/voice/`
   */
  async createVoiceVerification(dto: CreateVoiceVerificationDto) {
    return await this.baseQuery<VerificationVoiceResponse>(
      FalsonAPIRoutes.voiceVerification(),
      "POST",
      dto
    );
  }
  /**
   * - **PATCH** запрос к `/verifications/voice/:guildId`
   */
  async updateVoiceVerification(
    guildId: string,
    dto: UpdateVoiceVerificationDto
  ) {
    return await this.baseQuery<VerificationVoiceResponse>(
      FalsonAPIRoutes.voiceVerificationForGuild(guildId),
      "PATCH",
      dto
    );
  }
  /**
   *
   * - **DELETE** запрос к `/verifications/voice/:guildId`
   */
  async deleteVoiceVerification(guildId: string) {
    return await this.baseQuery<DeleteResponse>(
      FalsonAPIRoutes.voiceVerificationForGuild(guildId),
      "DELETE"
    );
  }
}

export * from "./dto";
import { BaseRest } from "@src/abstractions";
import { FalsonAPIRoutes, VerificationGeneralResponse } from "@src/types";
import { GeneralSettingsDto } from "./dto";

export class GeneralSettingsREST extends BaseRest {
  constructor() {
    super();
  }
  async fetchGeneralSettings(guildId: string) {
    return await this.baseQuery<VerificationGeneralResponse>(
      FalsonAPIRoutes.generalVerificationForGuild(guildId),
      "GET"
    );
  }
  async createGeneralSettings(dto: GeneralSettingsDto) {
    return await this.baseQuery<VerificationGeneralResponse>(
      FalsonAPIRoutes.generalVerification(),
      "POST",
      dto
    );
  }
  async updateGeneralSettings(guildId: string, dto: GeneralSettingsDto) {
    return await this.baseQuery<VerificationGeneralResponse>(
      FalsonAPIRoutes.generalVerificationForGuild(guildId),
      "PATCH",
      dto
    );
  }
}

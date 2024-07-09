import { BaseRest } from "@src/abstractions";
import { FalsonAPIRoutes, VerificationLogsResponse } from "@src/types";
import { LogSettingsDto } from "./dto";

export class LogSettingsREST extends BaseRest {
  constructor() {
    super();
  }

  async fetchLogs(guildId: string) {
    return await this.baseQuery<VerificationLogsResponse>(
      FalsonAPIRoutes.verificationLogsForGuild(guildId),
      "GET"
    );
  }

  async updateLogs(guildId: string, dto: LogSettingsDto) {
    return await this.baseQuery(
      FalsonAPIRoutes.verificationLogsForGuild(guildId),
      "PATCH",
      dto
    );
  }
}

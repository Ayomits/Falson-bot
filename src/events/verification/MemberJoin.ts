import BaseEvent from "@src/abstractions/BaseEvent";
import { generalVerification } from "@src/rest/FalsonApiREST";
import { Events, GuildMember } from "discord.js";

export class MemberJoin extends BaseEvent {
  constructor() {
    super({
      name: Events.GuildMemberAdd,
      once: false,
    });
  }

  async execute(member: GuildMember) {
    const guildId = member.guild.id;
    const settings = await generalVerification.fetchGeneralSettings(guildId);
    if (settings && settings.unverifyRole) {
      try {
        await member.roles.add(settings.unverifyRole);
      } catch {}
    }
  }
}

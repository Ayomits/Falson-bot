import { I18n } from "./i18n";
import i18n from "./i18n-instance";

class GuildLanguageManager {
  private guildLanguageMap: Map<string, string> = new Map();

  constructor(private i18n: I18n) {}

  public setLanguageForGuild(guildId: string, language: string) {
    this.guildLanguageMap.set(guildId, language);
  }

  public getLanguageForGuild(guildId: string): string {
    return this.guildLanguageMap.get(guildId);
  }

  public translate(key: string, guildId: string) {
    const language = this.getLanguageForGuild(guildId);
    return this.i18n.translate(
      key,
      language || this.i18n.options.currentLanguage
    );
  }
}

const guildLanguageManager = new GuildLanguageManager(i18n);
export default guildLanguageManager;

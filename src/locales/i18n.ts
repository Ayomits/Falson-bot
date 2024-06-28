import { glob } from "glob";
import { I18nOptions, Translations } from "./i18n-types";
import * as path from "path";

export class I18n {
  private options: I18nOptions;
  private translates: { [key: string]: Translations } = {};
  private isInitialized: boolean = false;
  private initPromise: Promise<void>;

  constructor(options: I18nOptions) {
    this.options = options;
    this.initPromise = this.collectLanguages().then(() => {
      this.isInitialized = true;
    });
  }

  private async collectLanguages() {
    const files = await glob(this.options.pattern);
    for (const file of files) {
      try {
        const language = await import(path.resolve(file));
        const languageName = path.basename(file).slice(0, -5);
        this.translates[languageName] = language;
      } catch (err) {
        throw err;
      }
    }
  }

  public async changeLanguage(newLanguage: string) {
    await this.initPromise; 
    this.options.currentLanguage = newLanguage;
  }

  public async translate(key: string) {
    await this.initPromise; 
    const language = this.options.currentLanguage;
    const translate = this.translates?.[language];
    const splitedKey = key.split(".");
    const value = this.getValueByBigKey(splitedKey, translate);
    return value;
  }

  private getValueByBigKey(keys: string[], object: Translations) {
    return keys.reduce((acc, key) => acc?.[key], object);
  }
}

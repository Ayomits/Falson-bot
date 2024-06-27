import { config, type DotenvParseOutput } from "dotenv";
import { IConfigService } from "../types/interfaces/ConfigInterface";

export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;
  constructor() {
    const { error, parsed } = config();
    if (error) {
      throw new Error(`Не найден файл .env`);
    }
    if (!parsed) {
      throw new Error(`Пустой файл .env`);
    }
    this.config = parsed;
  }

  get(key: string): string | never {
    const res = this.config[key];
    if (!res) {
      throw new Error(`Такого ключа нет`);
    }
    return res;
  }
}

export const configService = new ConfigService();

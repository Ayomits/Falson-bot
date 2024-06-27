import { Client, Collection } from "discord.js";
import * as path from "path";
import { rootDir } from "../../../constants";
import { glob } from "glob";
import { EventStructure } from "../../../types/djs";

export default class EventCollector extends Collection<string, EventStructure> {
  readonly client: Client;

  constructor(client: Client) {
    super();
    this.client = client;
    this.collect();
  }

  private async collect() {
    const currentDir = path.basename(rootDir);
    const pattern = `${currentDir}/**/**/*.event.{js,ts}`;
    const files = await glob(pattern);
    
    await Promise.all(
      files.map(async (file) => {
        const resolvedPath = path.resolve(file);
        const eventModule = await import(resolvedPath);

        Object.values(eventModule).forEach((event: any) => {
          if (typeof event === "function" && event.prototype instanceof EventStructure) {
            const eventInstance = new event();
            if (eventInstance.once) {
              this.client.once(eventInstance.name, (...args) => eventInstance.execute(...args));
            } else {
              this.client.on(eventInstance.name, (...args) => eventInstance.execute(...args));
            }
          }
        });
      })
    );
  }
}

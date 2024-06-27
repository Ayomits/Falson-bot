import { Client, Collection } from "discord.js";
import { rootDir } from "../constants";
import { glob } from "glob";
import BaseEvent from "@src/abstractions/BaseEvent";
import * as path from "path";

export default class EventCollector extends Collection<string, BaseEvent> {
  readonly client: Client;

  constructor(client: Client) {
    super();
    this.client = client;
    this.collect();
  }

  private async collect() {
    const currentDir = path.basename(rootDir);
    const pattern = `${currentDir}/**/**/*.{js,ts}`;
    const files = await glob(pattern);

    await Promise.all(
      files.map(async (file) => {
        if (file.includes(`.d`)) return;
        const resolvedPath = path.resolve(file);
        let eventModule: any;
        try {
          eventModule = await import(resolvedPath);
        } catch {
          return;
        }
        Object.values(eventModule).forEach((event: any) => {
          try {
            if (
              typeof event === "function" &&
              event?.prototype instanceof BaseEvent
            ) {
              const eventInstance = new event();
              if (eventInstance.once) {
                this.client.once(eventInstance.name, (...args) =>
                  eventInstance.execute(...args)
                );
              } else {
                this.client.on(eventInstance.name, (...args) =>
                  eventInstance.execute(...args)
                );
              }
            }
          } catch {
            return;
          }
        });
      })
    );
  }
}

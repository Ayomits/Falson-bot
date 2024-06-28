import { Client, ClientEvents, Collection } from "discord.js";
import { rootDir } from "../constants";
import { glob } from "glob";
import BaseEvent from "@src/abstractions/BaseEvent";
import BaseCommand from "@src/abstractions/BaseCommand";
import BaseComponent from "@src/abstractions/BaseComponent";
import * as path from "path";

export default class ActionCollector {
  readonly client: Client;
  events: Collection<string, BaseEvent>;
  commands: Collection<string, BaseCommand | BaseComponent>;

  constructor(client: Client) {
    this.client = client;
    this.events = new Collection<string, BaseEvent>();
    this.commands = new Collection<string, BaseCommand | BaseComponent>();
    this.collect();
  }

  private async collect() {
    const currentDir = path.basename(rootDir);
    const pattern = `${currentDir}/**/*.{js,ts}`;
    const files = await glob(pattern);

    await Promise.all(
      files.map(async (file) => {
        if (file.includes(`.d`)) return;
        const resolvedPath = path.resolve(file);
        let module: any;
        try {
          module = await import(resolvedPath);
        } catch (err) {
          console.error(`Error importing ${resolvedPath}:`, err);
          return;
        }

        Object.values(module).forEach((exported: any) => {
          try {
            if (typeof exported === "function") {
              if (exported.prototype instanceof BaseEvent) {
                const eventInstance = new exported() as BaseEvent;
                this.events.set(eventInstance.options.name, eventInstance);
                if (eventInstance.options.once) {
                  this.client.once(
                    eventInstance.options.name as keyof ClientEvents,
                    (...args) => eventInstance.execute(...args)
                  );
                } else {
                  this.client.on(
                    eventInstance.options.name as keyof ClientEvents,
                    (...args) => eventInstance.execute(...args)
                  );
                }
              } else if (exported.prototype instanceof BaseCommand) {
                const commandInstance = new exported() as BaseCommand;
                this.commands.set(
                  commandInstance.options.builder.name,
                  commandInstance
                );
                this.client.commands?.set(
                  commandInstance.options.builder.name,
                  commandInstance
                );
              } else if (exported.prototype instanceof BaseComponent) {
                const componentInstance = new exported() as BaseComponent;
                this.commands.set(
                  componentInstance.customId,
                  componentInstance
                );
                this.client.buttons?.set(
                  componentInstance.customId,
                  componentInstance
                );
              }
            }
          } catch (err) {
            console.error(`Error processing ${resolvedPath}:`, err);
          }
        });
      })
    );
  }
}

import { Client, ClientEvents } from "discord.js";
import { rootDir } from "../constants";
import { glob } from "glob";
import BaseEvent from "@src/abstractions/BaseEvent";
import BaseCommand from "@src/abstractions/BaseCommand";
import BaseComponent from "@src/abstractions/BaseComponent";
import * as path from "path";
import { BaseSubCommand } from "@src/abstractions/BaseSubCommand";
import BaseSelectMenuValue from "@src/abstractions/BaseSelectMenuValue";

export default class ActionCollector {
  readonly client: Client;

  constructor(client: Client) {
    this.client = client;
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
                this.client.commands?.set(
                  commandInstance.options.builder.name,
                  commandInstance
                );
              } else if (exported.prototype instanceof BaseComponent) {
                const componentInstance = new exported() as BaseComponent;
                this.client.buttons?.set(
                  componentInstance.customId,
                  componentInstance
                );
              } else if (exported.prototype instanceof BaseSubCommand) {
                const subCommandInstance = new exported() as BaseSubCommand;
                this.client.subCommands.set(
                  `${subCommandInstance.options.parentName}-${subCommandInstance.options.name}`,
                  subCommandInstance
                );
              } else if (exported.prototype instanceof BaseSelectMenuValue) {
                const valueCallback = new exported() as BaseSelectMenuValue;
                this.client.values.set(`${valueCallback.value}`, valueCallback);
              }
            }
          } catch (err) {
            console.error(`Error processing ${resolvedPath}:`, err);
            throw err;
          }
        });
      })
    );
  }
}

import { Client, Collection } from "discord.js";
import { glob } from "glob";
import * as path from "path";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/** @ts-ignore */
import { rootDir } from "../../constants";
import BaseCommand from "@src/abstractions/BaseCommand";
import BaseComponent from "@src/abstractions/BaseComponent";

export default class InteractionCollector extends Collection<
  string,
  BaseCommand
> {
  readonly client: Client;

  constructor(client: Client) {
    super();
    this.client = client;
    this.collect();
  }

  public async collect() {
    const currentDir = path.basename(rootDir);
    const pattern = `${currentDir}/**/*.{js,ts}`;
    const files = await glob(pattern, {});

    await Promise.all(
      files.map(async (file) => {
        if (file.includes(`.d`)) return;
        const relativePath = path.relative(__dirname, file);
        const modulePath = `./${relativePath.slice(0, -3)}`;
        let command: any;
        try {
          command = await import(modulePath);
        } catch {
          return;
        }
        Object.values(command).forEach((interactionClass: any) => {
          try {
            if (
              typeof interactionClass === "function" &&
              interactionClass.prototype instanceof BaseCommand
            ) {
              const commandInstance = new interactionClass();
              this.client.commands?.set(commandInstance.name, commandInstance);
            }
            if (
              typeof interactionClass === "function" &&
              interactionClass.prototype instanceof BaseComponent
            ) {
              const componentInstance = new interactionClass();
              this.client.commands?.set(
                componentInstance.customId,
                componentInstance
              );
            }
          } catch {
            return;
          }
        });
      })
    );
  }
}

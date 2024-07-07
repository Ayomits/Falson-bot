export enum GuildType {
  Everyone = 0,
  Premium = 1,
  Developer = 2,
}

export const GuildTypeNames: { [key: number]: string } = {
  [GuildType.Everyone]: "Everyone",
  [GuildType.Premium]: "Premium",
  [GuildType.Developer]: "Developer",
};

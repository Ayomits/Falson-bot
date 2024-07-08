export class StringMerger {
  
  static roleMerger(arr: string[]) {
    const arr_ = arr.map((role) => `<@&${role}>`);
    return this.removeComma(`${arr_}`);
  }

  static channelMerger(arr: string[]) {
    const arr_ = arr.map((ch) => `<@#${ch}>`);
    return this.removeComma(`${arr_}`);
  }

  static userMerger(arr: string[]) {
    const arr_ = arr.map((user) => `<@&${user}>`);
    return this.removeComma(`${arr_}`);
  }

  static emojiMerger(arr: string[], sourceEmojis?: any) {
    const arr_ = arr.map(
      (emoji) => `${sourceEmojis ? sourceEmojis[emoji] : emoji}`
    );
    return this.removeComma(`${arr_}`);
  }

  private static removeComma(str: string) {
    return str.replaceAll(`,`, "");
  }
}

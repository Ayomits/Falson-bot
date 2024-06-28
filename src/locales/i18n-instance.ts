import { rootDir } from "@src/constants";
import { I18n } from "./i18n";

const i18n = new I18n({
  pattern: `${rootDir}/locales/**/*.json`,
  currentLanguage: `ru`,
});

export default i18n;

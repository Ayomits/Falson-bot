import i18next from "i18next";
import i18nextFsBackend from "i18next-fs-backend";

i18next.use(i18nextFsBackend).init({
  fallbackLng: "en",
  backend: {
    loadPath: __dirname + "/translations/{{lng}}/{{ns}}.json",
  },
  interpolation: {
    escapeValue: false, 
  },
});

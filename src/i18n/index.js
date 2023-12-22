import translate from "./translate";

class I18n {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this._lang = "ru";
  }

  subscribe(lang, setLang) {
    if (typeof setLang === "function") {
      this._lang = lang;
      this.setLang = setLang;
      this.t = function (text, number) {
        return translate(this.lang, text, number);
      };

      return;
    }
  }

  setLang(lang) {
    this._lang = lang;
  }

  get lang() {
    return this._lang;
  }

  t(text, number) {
    return translate(this.lang, text, number);
  }
}

export default I18n;

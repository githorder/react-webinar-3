import StoreModule from "../module";

class Locale extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return { current: "ru" };
  }

  changeLocale(langCode) {
    this.setState({ current: langCode }, "Поменять язык");
  }
}

export default Locale;

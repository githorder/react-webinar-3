import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      loading: false,
    };
  }

  async load(limit, skip, page) {
    this.setState(
      { ...this.getState(), currentPage: page, loading: true },
      "Товары грузится в каталог"
    );

    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`,
      { headers: { "Accept-Language": "ru" } }
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalItems: json.result.count,
        loading: false,
      },
      "Загружены товары из АПИ"
    );
  }

  clearCatalog() {
    this.setState(
      { ...this.getState(), list: [], totalItems: 0 },
      "Очистить каталог"
    );
  }
}

export default Catalog;

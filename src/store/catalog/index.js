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
      totalItems: 0,
      itemInView: {
        title: "Название товара",
        price: "",
        description: "",
        madeIn: { title: "", code: "" },
        dateCreate: "",
        category: { title: "" },
      },
    };
  }

  async load(limit, skip) {
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
      },
      "Загружены товары из АПИ"
    );
  }

  async loadOne(id) {
    const response = await fetch(
      `api/v1/articles/${id}?fields=title,description,madeIn(title,code),category(title),dateCreate,price`,
      { headers: { "Accept-Language": "ru" } }
    );

    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        itemInView: json.result,
      },
      "Загружен один товар из АПИ"
    );
  }

  removeItemInView() {
    this.setState({
      ...this.getState(),
      itemInView: {
        title: "Название товара",
        price: "",
        description: "",
        madeIn: { title: "", code: "" },
        dateCreate: "",
        category: { title: "" },
      },
    });
  }
}

export default Catalog;

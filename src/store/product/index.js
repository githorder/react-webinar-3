import StoreModule from "../module";

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      productItem: undefined,
    };
  }

  async json(id) {
    const response = await fetch(
      `api/v1/articles/${id}?fields=title,description,madeIn(title,code),category(title),dateCreate,price`,
      { headers: { "Accept-Language": "ru" } }
    );

    const json = await response.json();
    return json.result;
  }

  async loadOne(id) {
    const product = await this.json(id);
    this.setState(
      {
        ...this.getState(),
        productItem: product,
      },
      "Загружен один товар из АПИ"
    );
  }

  clearProduct() {
    this.setState(
      {
        ...this.getState(),
        productItem: null,
      },
      "Удалить продукт из страницы"
    );
  }
}

export default Product;

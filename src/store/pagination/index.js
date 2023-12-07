import StoreModule from "../module";

class Pagination extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      currentPage: 1,
      limit: 10,
    };
  }

  change(page) {
    this.setState(
      { ...this.getState(), currentPage: page },
      "Страница изменена"
    );
  }
}

export default Pagination;

import StoreModule from "../module";

class Pagination extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      currentPage: 1,
    };
  }
}

export default Pagination;

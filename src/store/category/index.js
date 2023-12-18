import StoreModule from "../module";

function hierarchicalSort(categories, sorted, parentID, nested = 0) {
  let i = categories.length;
  while (--i >= 0) {
    let category = categories.shift();
    if (category.parent?._id === parentID) {
      sorted.push({ ...category, nested });
    } else {
      categories.push(category);
    }
  }

  for (let j = 0; typeof sorted[j] !== "undefined"; j++) {
    sorted[j].children = [];
    hierarchicalSort(categories, sorted[j].children, sorted[j]._id, nested + 1);
  }
}

function formatCategories(categories, validCategories) {
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    if (category.children.length) {
      validCategories.push({
        id: category._id,
        title: category.title,
        nested: category.nested,
        parent_id: category.parent?._id,
      });
      formatCategories(category.children, validCategories);
    } else {
      validCategories.push({
        id: category._id,
        title: category.title,
        nested: category.nested,
        parent_id: category.parent?._id,
      });
    }
  }
}

class Category extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      categories: [],
    };
  }

  async setCategories(
    newParams = { fields: "_id,title,parent(_id)", limit: "*" }
  ) {
    const response = await fetch(
      `/api/v1/categories?${new URLSearchParams(newParams)}`,
      { headers: { "Accept-Language": "ru" } }
    );

    const json = await response.json();
    const items = json.result.items;
    const sorted = [];
    const categories = [];

    hierarchicalSort(items, sorted, undefined);
    formatCategories(sorted, categories);

    this.setState(
      { ...this.getState(), categories },
      "Загружен список категорий из АПИ"
    );
  }
}

export default Category;

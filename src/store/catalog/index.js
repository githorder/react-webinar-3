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

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      categories: [],
      params: {
        page: 1,
        limit: 10,
        sort: "order",
        query: "",
        categoryId: "",
      },
      count: 0,
      waiting: false,
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has("page"))
      validParams.page = Number(urlParams.get("page")) || 1;
    if (urlParams.has("limit"))
      validParams.limit = Math.min(Number(urlParams.get("limit")) || 10, 50);
    if (urlParams.has("sort")) validParams.sort = urlParams.get("sort");
    if (urlParams.has("query")) validParams.query = urlParams.get("query");
    if (urlParams.has("categoryId"))
      validParams.categoryId = urlParams.get("categoryId");
    await this.setParams(
      { ...this.initState().params, ...validParams, ...newParams },
      true
    );
    await this.setCategories();
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = { ...this.initState().params, ...newParams };
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = { ...this.getState().params, ...newParams };

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      "Установлены параметры каталога"
    );

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
    const url =
      window.location.pathname + "?" + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }

    let apiParams;
    if (params.categoryId) {
      apiParams = {
        limit: params.limit,
        skip: (params.page - 1) * params.limit,
        fields: "items(*),count",
        sort: params.sort,
        "search[query]": params.query,
        "search[category]": params.categoryId,
      };
    } else {
      apiParams = {
        limit: params.limit,
        skip: (params.page - 1) * params.limit,
        fields: "items(*),count",
        sort: params.sort,
        "search[query]": params.query,
      };
    }

    const response = await fetch(
      `/api/v1/articles?${new URLSearchParams(apiParams)}`,
      { headers: { "Accept-Language": "ru" } }
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        waiting: false,
      },
      "Загружен список товаров из АПИ"
    );
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
      { ...this.getState(), categories, waiting: false },
      "Загружен список категорий из АПИ"
    );
  }
}

export default CatalogState;

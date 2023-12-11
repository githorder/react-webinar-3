import { memo, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import NavLayout from "../../components/nav-layout";
import Menu from "../../components/menu";
import Spinner from "../../components/spinner";

import Basket from "../basket";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import { handleTranslation } from "../../utils";

function Main() {
  const store = useStore();
  const params = useParams();
  let page = Number(params.page);
  let route = `/catalog`;

  const select = useSelector((state) => ({
    list: state.catalog.list,
    totalItems: state.catalog.totalItems,
    pageSize: state.catalog.pageSize,
    currentPage: state.catalog.currentPage,
    loading: state.catalog.loading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activeModal: state.modals.name,
    langCode: state.locale.current,
  }));

  useEffect(() => {
    store.actions.catalog.load(
      select.pageSize,
      ((page || select.currentPage) - 1) * select.pageSize,
      page || select.currentPage
    );

    return () => store.actions.catalog.clearCatalog();
  }, [params.page]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    loadProducts: useCallback(
      (limit, skip, page) => store.actions.catalog.load(limit, skip, page),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            langCode={select.langCode}
            onAdd={callbacks.addToBasket}
            itemUrl={`/articles/${item._id}`}
          />
        );
      },
      [callbacks.addToBasket, select.langCode]
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title={handleTranslation("shop", select.langCode)} />
        <NavLayout>
          <Menu langCode={select.langCode} />
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
            langCode={select.langCode}
          />
        </NavLayout>
        {!select.loading ? (
          <>
            <List list={select.list} renderItem={renders.item} />
            <Pagination
              route={route}
              totalItems={select.totalItems}
              pageSize={select.pageSize}
              loadProducts={callbacks.loadProducts}
              currentPage={select.currentPage}
            />
          </>
        ) : (
          <Spinner />
        )}
      </PageLayout>
      {select.activeModal === "basket" && <Basket />}
    </>
  );
}

export default memo(Main);

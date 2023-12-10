import { memo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../pagination";
import NavLayout from "../../components/nav-layout";

import Basket from "../basket";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import { handleTranslation } from "../../utils";

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    totalItems: state.catalog.totalItems,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activeModal: state.modals.name,
    limit: state.pagination.limit,
    currentPage: state.pagination.currentPage,
    langCode: state.locale.current,
  }));

  useEffect(() => {
    store.actions.catalog.load(
      select.limit,
      (select.currentPage - 1) * select.limit
    );
  }, []);

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
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            langCode={select.langCode}
            onAdd={callbacks.addToBasket}
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
          <Link to="/">{handleTranslation("main", select.langCode)}</Link>
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
            langCode={select.langCode}
          />
        </NavLayout>
        <List list={select.list} renderItem={renders.item} />
        <Pagination />
      </PageLayout>
      {select.activeModal === "basket" && <Basket />}
    </>
  );
}

export default memo(Main);

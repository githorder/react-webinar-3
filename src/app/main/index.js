import { memo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../pagination";
import NavLayout from "../../components/nav-layout";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    totalItems: state.catalog.totalItems,
    amount: state.basket.amount,
    sum: state.basket.sum,
    limit: state.pagination.limit,
    currentPage: state.pagination.currentPage,
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
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <NavLayout>
        <Link to="/">Главная</Link>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </NavLayout>
      <List list={select.list} renderItem={renders.item} />
      <Pagination />
    </PageLayout>
  );
}

export default memo(Main);

import { memo, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import NavLayout from "../../components/nav-layout";
import BasketTool from "../../components/basket-tool";

import Basket from "../basket";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

useSelector;

function Product() {
  const params = useParams();
  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.catalog.itemInView,
    activeModal: state.modals.name,
  }));

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  useEffect(() => {
    store.actions.catalog.loadOne(params.id);
    return () => store.actions.catalog.removeItemInView();
  }, [params.id]);

  return (
    <>
      <PageLayout>
        <Head title={select.product.title} />
        <NavLayout>
          <Link to="/">Главная</Link>
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
          />
        </NavLayout>
        <div style={{ padding: "20px" }}>
          <p>{select.product.description}</p>
          <p>
            Страна производитель:{" "}
            <strong>
              {select.product.madeIn.title} ({select.product.madeIn.code})
            </strong>
          </p>
          <p>
            Категория: <strong>{select.product.category.title}</strong>
          </p>
          <p>
            Год выпуска:{" "}
            <strong>{new Date(select.product.dateCreate).getFullYear()}</strong>
          </p>
          <p style={{ fontSize: "24px" }}>
            <strong>Цена: {select.product.price} ₽</strong>
          </p>
          <button onClick={() => callbacks.addToBasket(params.id)}>
            Добавить
          </button>
        </div>
      </PageLayout>
      {select.activeModal === "basket" && <Basket />}
    </>
  );
}

export default memo(Product);

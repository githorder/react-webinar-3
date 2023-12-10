import { memo, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import NavLayout from "../../components/nav-layout";
import BasketTool from "../../components/basket-tool";
import ProductDetails from "../../components/product-details";

import Basket from "../basket";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import { handleTranslation } from "../../utils";

useSelector;

function Product() {
  const params = useParams();
  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.catalog.itemInView,
    activeModal: state.modals.name,
    langCode: state.locale.current,
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
          <Link to="/">{handleTranslation("main", select.langCode)}</Link>
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
            langCode={select.langCode}
          />
        </NavLayout>
        <ProductDetails
          product={select.product}
          productID={params.id}
          addToBasket={callbacks.addToBasket}
          langCode={select.langCode}
        />
      </PageLayout>
      {select.activeModal === "basket" && <Basket />}
    </>
  );
}

export default memo(Product);

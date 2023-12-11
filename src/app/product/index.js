import { memo, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import NavLayout from "../../components/nav-layout";
import BasketTool from "../../components/basket-tool";
import ProductDetails from "../../components/product-details";
import Menu from "../../components/menu";
import Spinner from "../../components/spinner";

import Basket from "../basket";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Product() {
  const params = useParams();
  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product.productItem,
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
    store.actions.product.loadOne(params.id);

    return () => store.actions.product.clearProduct();
  }, [params.id]);

  return (
    <>
      {select.product ? (
        <PageLayout>
          <Head title={select.product.title} />
          <NavLayout>
            <Menu langCode={select.langCode} />
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
      ) : (
        <PageLayout>
          <Spinner />
        </PageLayout>
      )}

      {select.activeModal === "basket" && <Basket />}
    </>
  );
}

export default memo(Product);

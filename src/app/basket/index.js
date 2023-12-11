import { memo, useCallback } from "react";

import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import { handleTranslation } from "../../utils";

function Basket() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    langCode: state.locale.current,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) => store.actions.basket.removeFromBasket(_id),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      (item) => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            langCode={select.langCode}
            closeModal={callbacks.closeModal}
            itemUrl={`/articles/${item._id}`}
          />
        );
      },
      [callbacks.removeFromBasket, select.langCode]
    ),
  };

  return (
    <ModalLayout
      langCode={select.langCode}
      title={handleTranslation("basket", select.langCode)}
      onClose={callbacks.closeModal}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal langCode={select.langCode} sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);

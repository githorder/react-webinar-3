import React, { useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const cartTotalSum = store.getState().cartTotalSum;
  const isCartOpen = store.getState().isCartOpen;

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(
      (code) => {
        store.addItem(code);
      },
      [store]
    ),

    onToogleCartModal: useCallback(() => {
      store.toggleCartModal();
    }, [store]),
  };

  return (
    <PageLayout>
      {isCartOpen && (
        <Modal
          onClose={callbacks.onToogleCartModal}
          isCartOpen={true}
          title="Корзина"
        >
          <Cart
            cart={cart}
            onDelete={callbacks.onDeleteItem}
            cartTotalSum={cartTotalSum}
          />
        </Modal>
      )}
      <Head title="Магазин" />
      <Controls
        onOpenCartModal={callbacks.onToogleCartModal}
        cart={cart}
        cartTotalSum={cartTotalSum}
      />
      <List items={list} RenderItem={Item} onAdd={callbacks.onAddItem} />
    </PageLayout>
  );
}

export default App;

import React, { useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
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

    onCloseCartModal: useCallback(() => {
      store.toggleCartModal();
    }, [store]),

    onOpenCartModal: useCallback(() => {
      store.toggleCartModal();
    }, [store]),
  };

  return (
    <PageLayout>
      {isCartOpen && (
        <Cart
          isCartOpen={isCartOpen}
          onClose={callbacks.onCloseCartModal}
          cart={cart}
          onDelete={callbacks.onDeleteItem}
        />
      )}
      <Head title="Магазин" />
      <Controls onOpenCartModal={callbacks.onOpenCartModal} cart={cart} />
      <List list={list} onAdd={callbacks.onAddItem} />
    </PageLayout>
  );
}

export default App;

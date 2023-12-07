import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./app";
import Product from "./app/product";

import Store from "./store";
import { StoreContext } from "./store/context";

const store = new Store();

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/product/:id", element: <Product /> },
]);

const root = createRoot(document.getElementById("root"));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);

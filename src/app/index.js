import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Main from "./main";
import Product from "./product";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/product/:id", element: <Product /> },
]);

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;

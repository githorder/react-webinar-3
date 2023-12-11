import { Routes, Route } from "react-router-dom";

import Main from "./main";
import Product from "./product";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  return (
    <Routes path="/">
      <Route index element={<Main />} />
      <Route path="/catalog/:page" element={<Main />} />
      <Route path="/articles/:id" element={<Product />} />
    </Routes>
  );
}

export default App;

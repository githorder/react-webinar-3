import { useCallback, useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import useSelector from "../hooks/use-selector";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";

import Main from "./main";
import Basket from "./basket";
import Login from "./login";
import Article from "./article";
import Profile from "./profile";

import ProtectedRoute from "../containers/protected-route";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  const activeModal = useSelector((state) => state.modals.name);

  useInit(() => {
    store.actions.session.load();
  }, []);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path={"/profile"} element={<Profile />} />
        </Route>
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;

import React from "react";
import PropTypes from "prop-types";

import { plural } from "../../utils";

import "./style.css";

function Controls({ onOpenCartModal, cart }) {
  return (
    <div className="Controls">
      <span>
        В корзине:{" "}
        {cart.length === 0 ? (
          <span>Пусто</span>
        ) : (
          <span>
            {cart.length}{" "}
            {plural(cart.length, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })}{" "}
            /{" "}
            {new Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "RUB",
            }).format(
              cart.reduce((sum, { count, price }) => sum + count * price, 0)
            )}
          </span>
        )}
      </span>
      <button onClick={onOpenCartModal}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onOpenCartModal: PropTypes.func,
};

Controls.defaultProps = {
  onOpenCartModal: () => {},
};

export default React.memo(Controls);

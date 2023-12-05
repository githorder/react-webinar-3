import React from "react";
import PropTypes from "prop-types";

import { formatNumber, plural } from "../../utils";

import "./style.css";

function Controls({ onOpenCartModal, cart, cartTotalSum }) {
  return (
    <div className="Controls">
      <span>
        В корзине:{" "}
        {cart.length === 0 ? (
          <span>пусто</span>
        ) : (
          <span>
            {cart.length}{" "}
            {plural(cart.length, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })}{" "}
            / {formatNumber(cartTotalSum)} ₽
          </span>
        )}
      </span>
      <button onClick={onOpenCartModal}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onOpenCartModal: PropTypes.func,
  cartTotalSum: PropTypes.number.isRequired,
};

Controls.defaultProps = {
  onOpenCartModal: () => {},
};

export default React.memo(Controls);

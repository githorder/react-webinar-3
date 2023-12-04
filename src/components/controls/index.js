import React from "react";
import PropTypes from "prop-types";

import { formatNumber, plural, sum } from "../../utils";

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
            / {formatNumber(sum(cart))}
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

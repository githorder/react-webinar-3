import React from "react";
import PropTypes from "prop-types";

import List from "../list";
import ItemCart from "../item-cart";

import "./style.css";

import { formatNumber } from "../../utils";

function Cart({ cart, onDelete, cartTotalSum }) {
  return (
    <div className="Cart">
      <List items={cart} RenderItem={ItemCart} onDelete={onDelete} />
      <div className="Cart_summary">
        <span>Итого</span> <span>{formatNumber(cartTotalSum)} ₽</span>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })
  ).isRequired,
  cartTotalSum: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
};

Cart.defaultProps = {
  onDelete: () => {},
};

export default React.memo(Cart);

import React from "react";
import PropTypes from "prop-types";

import Head from "../head";
import List from "../list";

import "./style.css";

function Cart({ cart, onDelete, onClose, isCartOpen }) {
  return (
    <div className="Overlay">
      <div className="Cart">
        <Head onClose={onClose} isCartOpen={true} title="Корзина" />
        <List isCartOpen={isCartOpen} list={cart} onDelete={onDelete} />
        <div className="Cart_summary">
          <span>Итого</span>{" "}
          <span>
            {cart.reduce((sum, { count, price }) => sum + count * price, 0)} ₽
          </span>
        </div>
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
  onDelete: PropTypes.func,
  onClose: PropTypes.func,
};

Cart.defaultProps = {
  cart: [],
  onDelete: () => {},
  onClose: () => {},
};

export default React.memo(Cart);

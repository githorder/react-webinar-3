import React from "react";
import PropTypes from "prop-types";

import Head from "../head";
import List from "../list";

import "./style.css";

import { formatNumber, sum } from "../../utils";

function Cart({ cart, onDelete, onClose, isCartOpen }) {
  return (
    <div className="Overlay">
      <div className="Cart">
        <Head onClose={onClose} isCartOpen={true} title="Корзина" />
        <List isCartOpen={isCartOpen} list={cart} onDelete={onDelete} />
        <div className="Cart_summary">
          <span>Итого</span> <span>{formatNumber(sum(cart))}</span>
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

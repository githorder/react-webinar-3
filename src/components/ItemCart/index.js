import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function ItemCart(props) {
  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  };

  return (
    <div className={"Item"}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-details">
        <div>{props.item.price} ₽</div>
        <div>{props.item.count} шт</div>
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

ItemCart.defaultProps = {
  onDelete: () => {},
};

export default React.memo(ItemCart);

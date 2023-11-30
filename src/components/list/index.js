import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

import ItemCart from "../ItemCart";

function List({ list, onAdd, onDelete, isCartOpen }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          {!isCartOpen ? (
            <Item item={item} onAdd={onAdd} />
          ) : (
            <ItemCart onDelete={onDelete} item={item} />
          )}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onAdd: PropTypes.func,
  onDeleteItem: PropTypes.func,
  isCartOpen: PropTypes.bool,
};

List.defaultProps = {
  onDeleteItem: () => {},
  onAdd: () => {},
  isCartOpen: false,
};

export default React.memo(List);

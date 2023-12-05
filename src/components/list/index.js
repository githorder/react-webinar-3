import React from "react";
import PropTypes from "prop-types";

import "./style.css";

function List({ items, RenderItem, ...props }) {
  return (
    <div className="List">
      {items.map((item) => (
        <div key={item.code} className="List-item">
          {<RenderItem item={item} {...props} />}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onAdd: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {},
  onAdd: () => {},
};

export default React.memo(List);

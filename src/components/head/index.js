import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head({ title, isCartOpen, onClose }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      {isCartOpen && <button onClick={onClose}>Закрыть</button>}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);

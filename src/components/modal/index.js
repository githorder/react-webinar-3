import React from "react";
import PropTypes from "prop-types";

import Head from "../head";

import "./style.css";

function Modal({ title, children, onClose, isCartOpen }) {
  return (
    <div className="Overlay">
      <div className="Modal">
        <Head onClose={onClose} isCartOpen={isCartOpen} title={title} />
        <div className="Modal_placeholder"></div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func,
  isCartOpen: PropTypes.bool,
};

Modal.defaultProps = {
  onClose: () => {},
  isCartOpen: false,
};

export default React.memo(Modal);

import { memo } from "react";
import PropTypes from "prop-types";

import "./style.css";

import Locale from "../../app/locale";

function Head({ title }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <Locale />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);

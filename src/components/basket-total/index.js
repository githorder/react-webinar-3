import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

import { numberFormat, handleTranslation } from "../../utils";

function BasketTotal({ sum, langCode }) {
  const cn = bem("BasketTotal");
  return (
    <div className={cn()}>
      <span className={cn("cell")}>{handleTranslation("total", langCode)}</span>
      <span className={cn("cell")}> {numberFormat(sum)} ₽</span>
      <span className={cn("cell")}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  langCode: PropTypes.string,
};

BasketTotal.defaultProps = {
  sum: 0,
  langCode: "en",
};

export default memo(BasketTotal);

import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";

function BasketTotal({ sum, i18n }) {
  const cn = bem("BasketTotal");
  return (
    <div className={cn()}>
      <span className={cn("cell")}>{i18n.t("basket.total")}</span>
      <span className={cn("cell")}> {numberFormat(sum)} ₽</span>
      <span className={cn("cell")}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  i18n: PropTypes.object,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default memo(BasketTotal);

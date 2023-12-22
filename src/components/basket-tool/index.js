import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";

function BasketTool({ sum, amount, onOpen, i18n }) {
  const cn = bem("BasketTool");
  return (
    <div className={cn()}>
      <span className={cn("label")}>{i18n.t("basket.inBasket")}</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${i18n.t("basket.articles", amount)} / ${numberFormat(
              sum
            )} ₽`
          : i18n.t("basket.empty")}
      </span>
      <button onClick={onOpen}>{i18n.t("basket.open")}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  i18n: PropTypes.object,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);

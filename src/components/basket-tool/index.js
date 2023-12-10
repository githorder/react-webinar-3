import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import { numberFormat, plural, handleTranslation } from "../../utils";
import "./style.css";

function BasketTool({ sum, amount, onOpen, langCode }) {
  const cn = bem("BasketTool");
  return (
    <div className={cn()}>
      <span className={cn("label")}>
        {handleTranslation("in basket", langCode)}
      </span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(amount, {
              one: handleTranslation("product-1", langCode),
              few: handleTranslation("product-2", langCode),
              many: handleTranslation("product-3", langCode),
            })} / ${numberFormat(sum)} ₽`
          : handleTranslation("empty", langCode)}
      </span>
      <button onClick={onOpen}>{handleTranslation("go over", langCode)}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  langCode: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  langCode: "en",
};

export default memo(BasketTool);

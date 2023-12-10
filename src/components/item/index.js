import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";

import { numberFormat, handleTranslation } from "../../utils";

import "./style.css";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link className={cn("title")} to={`/product/${props.item._id}`}>
        {props.item.title}
      </Link>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>
          {handleTranslation("add", props.langCode)}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  langCode: PropTypes.string,
};

Item.defaultProps = {
  onAdd: () => {},
  langCode: "en",
};

export default memo(Item);

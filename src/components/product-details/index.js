import PropTypes from "prop-types";

import "./style.css";

import { handleTranslation, numberFormat } from "../../utils";

function ProductDetails({ product, addToBasket, productID, langCode }) {
  const handleClick = () => addToBasket(productID);

  return (
    <div className="ProductDetails">
      <p>{product.description}</p>
      <p>
        Страна производитель:{" "}
        <strong>
          {product.madeIn.title} ({product.madeIn.code})
        </strong>
      </p>
      <p>
        Категория: <strong>{product.category.title}</strong>
      </p>
      <p>
        Год выпуска: <strong>{product.dateCreate}</strong>
      </p>
      <p className="ProductDetails_price">
        <strong>Цена: {numberFormat(product.price)} ₽</strong>
      </p>
      <button onClick={handleClick}>
        {handleTranslation("add", langCode)}
      </button>
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.shape({}).isRequired,
  productID: PropTypes.string.isRequired,
  addToBasket: PropTypes.func,
  langCode: PropTypes.string,
};

ProductDetails.defaultProps = {
  addToBasket: () => {},
  langCode: "en",
};

export default ProductDetails;

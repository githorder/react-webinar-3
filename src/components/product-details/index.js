import PropTypes from "prop-types";

import "./style.css";

function ProductDetails({ product, addToBasket, productID }) {
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
        Год выпуска:{" "}
        <strong>{new Date(product.dateCreate).getFullYear()}</strong>
      </p>
      <p className="ProductDetails_price">
        <strong>Цена: {product.price} ₽</strong>
      </p>
      <button onClick={handleClick}>Добавить</button>
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.shape({}).isRequired,
  productID: PropTypes.string.isRequired,
  addToBasket: PropTypes.func,
};

ProductDetails.defaultProps = {
  addToBasket: () => {},
};

export default ProductDetails;

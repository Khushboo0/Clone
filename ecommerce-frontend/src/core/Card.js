import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./CartHelpers";

const Card = ({
  product,
  showviewProductButton = true,
  showAddtoCartButton = true,
  CartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f, // default value of function
  run = undefined // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const showViewButton = (showviewProductButton) => {
    return (
      showviewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-outline-primary mt-2 mr-2 mb-2">
            View Product
          </button>
        </Link>
      )
    );
  };
  const addtocart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddtoCart = (showAddtoCartButton) => {
    return (
      showAddtoCartButton && (
        <button
          onClick={addtocart}
          className="btn btn-outline-success mt-2 mb-2"
        >
          Add to cart
        </button>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() =>{ removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  const showstock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-warning mr-3">In stock</span>
    ) : (
      <span>Out of stock</span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateoption = (CartUpdate) => {
    return (
      CartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          {shouldRedirect(redirect)}
          <ShowImage item={product} url="product" />
          <p>{product.description.substring(0, 100)}</p>
          <p>${product.price}</p>
          <p>Category: {product.category && product.category.name}</p>
          <p>Added on: {moment(product.createdAt).fromNow()}</p>

          {showstock(product.quantity)}

          {showViewButton(showviewProductButton)}

          {showAddtoCart(showAddtoCartButton)}
          {showRemoveButton(showRemoveProductButton)}
          {showCartUpdateoption(CartUpdate)}
        </div>
      </div>
    </div>
  );
};

export default Card;

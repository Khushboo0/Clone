import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";

const Card = ({ product, showviewProductButton = true }) => {
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

  const showAddtoCartButton = ()=>{
    return <button className="btn btn-outline-success mt-2 mb-2">
            Add to cart
          </button>
  };



  const showstock = (quantity)=>{
    return quantity>0 ? <span className="badge badge-warning mr-3">In stock</span>:<span>Out of stock</span>

  }
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          <ShowImage item={product} url="product" />
          <p>{product.description.substring(0, 100)}</p>
          <p>${product.price}</p>
          <p>Category: {product.category && product.category.name}</p>
          <p>Added on: {moment(product.createdAt).fromNow()}</p>

          {showstock(product.quantity)}

          {showViewButton(showviewProductButton)}
          
          {showAddtoCartButton()}
        </div>
      </div>
    </div>
  );
};

export default Card;

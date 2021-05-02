import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getProduct } from "./apiCore";
import Card from "./Card";
import { isAuthenticated } from "../auth";

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const showCheckout =()=>{
      return isAuthenticated() ? (
        <button className="btn btn-success ml-3">Checkout</button>
      ) : (
        <Link to="/signin">
          <button className="btn btn-primary ml-3">Signin yto checkout</button>
        </Link>
      )
  }
  return (
    <div>
      Total:${getTotal()}
      {showCheckout()}
    </div>
  );
};

export default Checkout;

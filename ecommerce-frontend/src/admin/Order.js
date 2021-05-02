import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listorder, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setstatusValues] = useState([]);
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listorder(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setstatusValues(data);
      }
    });
  };

  const showOrdersLength = (orders) => {
    if (orders.length > 0) {
      return <h1>Total orders: {orders.length}</h1>;
    } else {
      <h1> No orders</h1>;
    }
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {o.status}</h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
  return (
    <Layout title="Orders" description={`Manage Orders`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength(orders)}
          {orders.map((o, i) => {
            return (
              <div
                className="mt-5"
                key={i}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">OrderId: {o._id}</span>
                </h2>
                <ul className="list-group-item">
                  <li className="list-group-item">{showStatus(o)}</li>
                  <li className="list-groiup-item">
                    Transaction Id: {o.transaction_id}
                  </li>
                  <li className="list-groiup-item">Amount: {o.amount}</li>
                  <li className="list-groiup-item">OrderBy: {o.user.name}</li>
                  <li className="list-groiup-item">
                    Ordered on: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-groiup-item">Delivery Id: {o.address}</li>
                </ul>
                <h3 className=" mt-4 mb-4 font italic">
                  Total products in order: {o.products.length}
                </h3>

                {o.products.map((p, pindex) => (
                  <div className="mb-4" key={pindex}>
                    {showInput("Product name", p.name)}
                    {showInput("Product price", p.price)}
                    {showInput("Product total", p.count)}
                    {showInput("Product Id", p._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

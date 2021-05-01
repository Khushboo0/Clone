"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = exports.getFilteredProduct = exports.getCategories = exports.getProduct = void 0;

var _config = require("../config");

var _queryString = _interopRequireDefault(require("query-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//all method that will call backend method
var getProduct = function getProduct(sortBy) {
  return fetch("".concat(_config.API, "/products?sortBy=").concat(sortBy, "&order=desc&limit=6"), {
    method: "GET"
  }).then(function (response) {
    return response.json();
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.getProduct = getProduct;

var getCategories = function getCategories() {
  return fetch("".concat(_config.API, "/categories"), {
    method: "GET"
  }).then(function (response) {
    return response.json();
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.getCategories = getCategories;

var getFilteredProduct = function getFilteredProduct(skip, limit) {
  var filters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var data = {
    limit: limit,
    skip: skip,
    filters: filters
  }; // console.log(name,email,password);

  return fetch("".concat(_config.API, "/products/by/search"), {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function (Response) {
    return Response.json();
  })["catch"](function (err) {
    console.log(err);
    return err;
  });
};

exports.getFilteredProduct = getFilteredProduct;

var list = function list(params) {
  var query = _queryString["default"].stringify(params);

  console.log('query', query);
  return fetch("".concat(_config.API, "/products/search?").concat(query), {
    method: "GET"
  }).then(function (response) {
    return response.json();
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.list = list;
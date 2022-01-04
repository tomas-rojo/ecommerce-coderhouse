const { STORAGE } = require("../config/globals");

const factory = () => {
  if (STORAGE === "mongodb") return require("./mongoose");
};

module.exports = factory;

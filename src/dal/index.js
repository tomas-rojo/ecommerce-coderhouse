const { STORAGE } = require("../config/globals");

const factory = () => {
  if (STORAGE === "memory") return require("./memory");
  if (STORAGE === "mongodb") return require("./mongoose");
  else return require("./memory");
};

module.exports = factory;

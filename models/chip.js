const orm = require("../config/orm");

let chip = {
  all: function (cb) {
    orm.all("chips", function (res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function (cols, vals, cb) {
    orm.create("chips", cols, vals, function (res) {
      cb(res);
    });
  },
  update: function (objColVals, condition, cb) {
    orm.update("chips", objColVals, condition, function (res) {
      cb(res);
    });
  }
};



 


module.exports = chip;
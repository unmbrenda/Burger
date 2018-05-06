const orm = require('../config/orm');
const moment = require('moment');

const burgerTbl = "burgers";
const burgerCols = [
  "id",
  "burger_name",
  "devoured",
  "createdAt"
];

const burger = {
  single: async function (id) {
    return await orm.selectOne(
      burgerCols,
      burgerTbl,
      id
    );
  },

  all: async function () {
    return orm.selectAll(burgerCols, burgerTbl);
  },

  create: async function (name) {
    const colVal = {
      burger_name: name
    };

    const result = await orm.insertOne(colVal, burgerTbl);
    return await orm.selectOne(
      burgerCols,
      burgerTbl,
      result.insertId
    );

  },

  update: async function (burger) {
    var colVal = {
      burger_name: burger.burger_name,
      devoured: burger.devoured
    }

    const result = await orm.updateOne(
      colVal,
      burgerTbl,
      burger.id
    );

    return await orm.selectOne(
      burgerCols,
      burgerTbl,
      burger.id
    );

  }
}

module.exports = burger;
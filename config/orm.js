const query = require('./connection.js');

const selectAll = async function (cols, tbl) {
  const queryAll = `Select ?? From ??;`;
  return await query(queryAll, [cols, tbl]);
};

const selectOne = async function (cols, tbl, id) {
  const queryOne = `
    Select ??
    From ??
    Where id = ?
  `;
  const result = await query(queryOne, [cols, tbl, id]);
  return result[0];
}

const insertOne = async function(colVal, tbl) {

  const queryInsert = `
    insert ${tbl}
    set ?;
  `;

  return await query(queryInsert, colVal);
};

const updateOne = async function(colVal, tbl, id){
  const queryUpdate = `
    update ??
    set ?
    where id = ?
  `;
  return await query(queryUpdate, [tbl, colVal, id]);
}


module.exports = {
  selectAll,
  insertOne,
  selectOne,
  updateOne
};


// const insertOne = async function (attributes, tbl) {
//   queryInsert = `
//       insert burgers
//       set ?;
//     `;

//   const vals = {
//     burger_name: burger.name,
//     devoured: burger.devoured,
//     createdAt: burger.createdAt
//   };

//   const results = await query(queryInsert, vals);

//   return results;
// }

// const updateOne = function () {

// }

// module.exports = {
//   selectAll,
//   insertOne,
//   updateOne
// };


// insertOne(myBurger).then(x => {
//   console.log(x);
// }).catch(x => {
//   console.log(x);
//   console.log('none')
// });

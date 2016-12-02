const knexfile = require("./knexfile.js");
const env = process.env.NODE_ENV || "development";
const knex = require("knex")(knexfile[env]);
module.exports = knex;

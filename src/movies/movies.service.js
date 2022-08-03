const knex = require("../db/connection");

const tableName = "movies";

function list() {
  return knex(tableName).select("*");
}

function listIsShowing() {
  return knex("movies as m")
    .distinct("m.movie_id as id")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select(
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url"
    )
    .where({ "mt.is_showing": true })
    .orderBy("m.movie_id");
}

function read(movieId) {
  return knex(tableName)
    .select("*")
    .where({ movie_id: movieId })
    .first();
}

module.exports = {
  list,
  listIsShowing,
  read,
};

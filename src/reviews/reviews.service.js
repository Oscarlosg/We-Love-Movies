const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const tableName = "reviews";

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function destroy(reviewId) {
  return knex(tableName).where({ review_id: reviewId }).del();
}

function read(reviewId) {
  return knex("reviews as r")
    .select("*")
    .where({ review_id: reviewId })
    .join("critics as c", "c.critic_id", "r.critic_id")
    .first()
    .then((data) => addCritic(data));
}

function update(review, reviewId) {
  return knex(tableName)
    .select("*")
    .where({ review_id: reviewId })
    .update(review);
}

function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .join("movies as m", "m.movie_id", "r.movie_id")
    .select("r.*", "c.*")
    .where({ "m.movie_id": movieId });
}

module.exports = {
  delete: destroy,
  read,
  update,
  list,
};

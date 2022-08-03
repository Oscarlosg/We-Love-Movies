const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const foundReview = await service.read(reviewId);
  if (foundReview) {
    res.locals.review = foundReview;
    return next();
  }
  next({
    status: 404,
    message: `Review cannot be found.`,
  });
}

async function destroy(req, res) {
  const { reviewId } = req.params;
  await service.delete(reviewId);
  res.sendStatus(204);
}

async function update(req, res) {
  const { reviewId } = req.params;
  const updatedReview = req.body.data;

  await service.update(updatedReview, reviewId);
  res.json({ data: await service.read(reviewId) });
}

async function list(req, res, next) {
  const { movieId } = req.params;
  const criticData = await service.list(movieId);
  const data = criticData.map((row) => {
    return {
      review_id: row.review_id,
      content: row.content,
      score: row.score,
      created_at: row.created_at,
      updated_at: row.updated_at,
      critic_id: row.critic_id,
      movie_id: row.movie_id,
      critic: {
        critic_id: row.critic_id,
        preferred_name: row.preferred_name,
        surname: row.surname,
        organization_name: row.organization_name,
        created_at: row.created_at,
        updated_at: row.updated_at,
      },
    };
  });
  res.json({ data });
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  list: asyncErrorBoundary(list),
};

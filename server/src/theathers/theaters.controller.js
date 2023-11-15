const service = require("./theaters.service");//pointless comment
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { movieId } = req.params;
  const data = movieId
    ? await service.moviesTheaters(movieId)
    : await service.list();
  res.json({
    data,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
};

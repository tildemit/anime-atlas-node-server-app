import * as dao from "./dao.js";
function ReviewRoutes(app) {
  const createReview = async (req, res) => { 
    const review = await dao.createReview(req.body);
    res.json(review);
  };
  const deleteReview = async (req, res) => { 
    const status = await dao.deleteReview(req.params.reviewId);
    res.json(status);
  };
  const findReviewById = async (req, res) => {
    const review = await dao.findReviewById(req.params.reviewId);
    res.json(review);
   };

   const findReviewswByAnimeId = async (req, res) => {
    const reviews = await dao.findReviewsbyAnimeId(req.params.animeId);
    res.json(reviews);
   };
  app.post("/api/reviews", createReview);
  app.get("/api/reviews/:reviewId", findReviewById);
  app.get("/api/anime-reviews/:animeId", findReviewswByAnimeId);
  app.delete("/api/reviews/:reviewId", deleteReview);
}
export default ReviewRoutes;
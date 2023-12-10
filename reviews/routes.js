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
  app.post("/api/reviews", createReview);
  app.get("/api/reviews/:reviewId", findReviewById);
  app.delete("/api/reviews/:reviewId", deleteReview);
}
export default ReviewRoutes;
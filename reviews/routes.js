import * as dao from "./dao.js";
import * as udao from "../users/dao.js"

function ReviewRoutes(app) {
    const createReview = async (req, res) => {
        const review = await dao.createReview(req.body);
        res.json(review);
    };

    const getReviews = async (req, res) => {
        const reviews = await dao.getReviews();
        res.json(reviews);
    };
    const findReviewById = async (req, res) => {
        const {
            reviewId
        } = req.params;
        const review = await dao.findReviewById(reviewId);
        res.json(review);
    };

    const findReviewswByAnimeId = async (req, res) => {
        const reviews = await dao.findReviewsbyAnimeId(req.params.animeId);
        res.json(reviews);
    };
    app.post("/api/reviews", createReview);
    app.get("/api/reviews", getReviews);
    app.get("/api/reviews/:reviewId", findReviewById);
    app.get("/api/anime-reviews/:animeId", findReviewswByAnimeId);
}
export default ReviewRoutes;
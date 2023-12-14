import reviewModel from "./model.js";
export const createReview = async (review) => {
    try {
        const createdReview = await reviewModel.create(review);
        return createdReview;
    } catch (error) {

        console.error('Error creating review:', error);
        throw new Error('Failed to create review');
    }
};
export const findReviewById = (reviewId) => reviewModel.findById(reviewId);
export const findReviewsbyAnimeId = (animeId) => reviewModel.find({
    animeId
});
export const getReviews = () => reviewModel.find();
export const deleteReview = (reviewId) => reviewModel.deleteOne({
    _id: reviewId
});
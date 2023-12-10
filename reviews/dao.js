import reviewModel from "./model.js";
export const createReview = (review) => reviewModel.create(review);
export const findReviewById = (reviewId) => reviewModel.findById(reviewId);
export const deleteReview = (reviewId) => reviewModel.deleteOne({ _id: reviewId });
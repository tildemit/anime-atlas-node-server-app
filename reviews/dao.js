import reviewModel from "./model.js";
export const createReview = async (review) => {
    try {
      const createdReview = await reviewModel.create(review);
      return createdReview;
    } catch (error) {
      // Handle error, e.g., log it or throw a custom error
      console.error('Error creating review:', error);
      throw new Error('Failed to create review');
    }
  };
export const findReviewById = (reviewId) => reviewModel.findById(reviewId);
export const findReviewsbyAnimeId = (animeId) => reviewModel.find({ animeId });
export const deleteReview = (reviewId) => reviewModel.deleteOne({ _id: reviewId });
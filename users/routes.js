import * as dao from "./dao.js";
import * as rdao from "../reviews/dao.js"

function UserRoutes(app) {
  const createUser = async (req, res) => { };
  const deleteUser = async (req, res) => { };
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json(status);
  };

  const signup = async (req, res) => {
    try {
      const user = await dao.findUserByUsername(req.body.username);
  
      if (user) {
        // Username is already taken
        return res.status(400).json({ message: "Username already taken" });
      }
  
      // Create a new user
      const currentUser = await dao.createUser(req.body);
      
      // Store the current user in the session
      req.session['currentUser'] = currentUser;
  
      // Return the new user
      return res.json(currentUser);
    } catch (error) {
      // Handle other errors (e.g., database error)
      console.error("Error during signup:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
 
   };
   const signout = (req, res) => {
    req.session.destroy();
    res.json(200);
  };

  const account = async (req, res) => {
    res.json(req.session['currentUser']);
  };

  const findUserReviews = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await dao.findUserById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const reviews = user.reviews;
      const detailedReviews = [];
  
      for (const reviewId of reviews) {
        const review = await rdao.findReviewById(reviewId);
        if (review) {
          detailedReviews.push(review);
        }
      }
  
      res.json(detailedReviews);
    } catch (error) {
      console.error("Error finding user reviews:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const postReview = async (req, res) => {
    try {
      const review = req.body;
  
      // Create the new review and wait for the result
      const newReview = await rdao.createReview(review);
  
      // Fetch the current user
      const currentUser = req.session['currentUser'];
      const currentUserRecord = await dao.findUserById(currentUser._id);
  
      // Push the review id to the user's reviews array
      currentUserRecord.reviews.push(newReview._id);
  
      // Save the user record
      await currentUserRecord.save();
  
      // Update the user in the session
      req.session['currentUser'] = currentUserRecord;

      res.json(newReview);
    } catch (error) {
      console.error('Error posting review:', error);
      res.status(500).json({ message: 'Failed to post review' });
    }
  };
  

  const addLikedAnime = async (req, res) => {
    const { userId, animeId } = req.params;
  
    // Check if the animeId is already in the likedAnime array to avoid duplicates
    const user = await dao.findUserById(userId);
    if (user.likedAnime.includes(animeId)) {
      return res.status(400).json({ message: "Anime already liked by the user" });
    }
  
    await dao.addLikedAnime(userId, animeId);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json({ message: "Anime liked successfully" });
  };

  const removeLikedAnime = async (req, res) => {
    const { userId, animeId } = req.params;
  
    await dao.removeLikedAnime(userId, animeId);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json({ message: "Anime unliked successfully" });
  };

  const addLikedCharacter = async (req, res) => {
    const { userId, characterId } = req.params;
  
    // Check if the animeId is already in the likedAnime array to avoid duplicates
    const user = await dao.findUserById(userId);
    if (user.likedCharacters.includes(characterId)) {
      return res.status(400).json({ message: "Character already liked by the user" });
    }
  
    await dao.addLikedCharacter(userId, characterId);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json({ message: "Character liked successfully" });
  };

  const removeLikedCharacter = async (req, res) => {
    const { userId, characterId } = req.params;
  
    await dao.removeLikedCharacter(userId, characterId);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json({ message: "Character unliked successfully" });
  };

  const follow = async (req, res) => {
    try {
      const { userId } = req.params;
      const currentUser = req.session['currentUser'];

      // Fetch the current user and the user to follow from the database
      const currentUserRecord = await dao.findUserById(currentUser._id);
      const userToFollowRecord = await dao.findUserById(userId);

      // Check if the user is trying to follow themselves
      if (currentUserRecord._id.equals(userToFollowRecord._id)) {
        return res.status(400).json({ error: "You can't follow yourself." });
      }

      // Check if the current user is already following the target user
      if (currentUserRecord.following.includes(userId)) {
        return res.status(400).json({ error: "You are already following this user." });
      }

      // Update the current user's following list
      currentUserRecord.following.push(userId);
      await currentUserRecord.save();

      // Update the user to follow's followers list
      userToFollowRecord.followers.push(currentUserRecord._id);
      await userToFollowRecord.save();

      // Update the session with the current user
      req.session['currentUser'] = currentUserRecord;

      res.status(200).json({ message: 'Successfully followed user.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const unfollow = async (req, res) => {
    try {
      const { userId } = req.params;
      const currentUser = req.session['currentUser'];
  
      // Fetch the current user and the user to unfollow from the database
      const currentUserRecord = await dao.findUserById(currentUser._id);
      const userToUnfollowRecord = await dao.findUserById(userId);
  
      // Check if the user is trying to unfollow themselves
      if (currentUserRecord._id.equals(userToUnfollowRecord._id)) {
        return res.status(400).json({ error: "You can't unfollow yourself." });
      }
  
      // Check if the current user is not following the target user
      if (!currentUserRecord.following.includes(userId)) {
        return res.status(400).json({ error: "You are not following this user." });
      }
  
      // Remove the user to unfollow from the current user's following list
      currentUserRecord.following = currentUserRecord.following.filter(followingId => !followingId.equals(userId));
      await currentUserRecord.save();
  
      // Remove the current user from the user to unfollow's followers list
      userToUnfollowRecord.followers = userToUnfollowRecord.followers.filter(followerId => !followerId.equals(currentUserRecord._id));
      await userToUnfollowRecord.save();
  
      // Update the session with the current user
      req.session['currentUser'] = currentUserRecord;
  
      res.status(200).json({ message: 'Successfully unfollowed user.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  app.post("/api/users", createUser);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/reviews/:userId", findUserReviews);
  app.post("/api/users/:userId/liked-characters/:characterId", addLikedCharacter);
  app.delete("/api/users/:userId/liked-characters/:characterId", removeLikedCharacter);
  app.post("/api/users/:userId/liked-anime/:animeId", addLikedAnime);
  app.delete("/api/users/:userId/liked-anime/:animeId", removeLikedAnime);
  app.post("/api/users/follow/:userId", follow);
  app.delete("/api/users/unfollow/:userId", unfollow);
  app.post("/api/users/reviews", postReview)
}
export default UserRoutes;
import * as dao from "./dao.js";
import * as rdao from "../reviews/dao.js"

function UserRoutes(app) {
  const createUser = async (req, res) => { };
  const deleteUser = async (req, res) => { };
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => { };
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json(status);
  };

  const signup = async (req, res) => { };
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
 
   };
  const signout = (req, res) => { };
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
}
export default UserRoutes;
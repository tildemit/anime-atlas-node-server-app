import model from "./model.js";
export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const addLikedAnime = async (userId, animeId) => {
  const user = await model.findById(userId);

  if (user && !user.likedAnime.includes(animeId)) {
    user.likedAnime.push(animeId);
    await user.save();
  }
};

export const removeLikedAnime = async (userId, animeId) => {
  const user = await model.findById(userId);

  if (user) {
    // Find the index of the animeId in the likedAnime array
    const index = user.likedAnime.indexOf(animeId);

    // If the animeId is found, remove it from the array and save the user
    if (index !== -1) {
      user.likedAnime.splice(index, 1);
      await user.save();
    }
  }
};


export const addLikedCharacter = async (userId, characterId) => {
  const user = await model.findById(userId);

  if (user && !user.likedCharacters.includes(characterId)) {
    user.likedCharacters.push(characterId);
    await user.save();
  }
};

export const removeLikedCharacter = async (userId, characterId) => {
  const user = await model.findById(userId);

  if (user) {
    // Find the index of the animeId in the likedAnime array
    const index = user.likedCharacters.indexOf(characterId);

    // If the animeId is found, remove it from the array and save the user
    if (index !== -1) {
      user.likedCharacters.splice(index, 1);
      await user.save();
    }
  }
};
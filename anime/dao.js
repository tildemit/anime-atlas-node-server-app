// dao.js

import animeModel from './model.js';

export const createAnime = async (anime) => {
    // Check if an anime with the given ID already exists
    const existingAnime = await animeModel.findOne({ animeId: anime.animeId });
  
    if (existingAnime) {
      // Anime with the given ID already exists, remove it
      await animeModel.deleteOne({ animeId: anime.animeId });
    }
  
    // Add the anime again
    const newAnime = await animeModel.create(anime);
    return newAnime;
  };

export const findAnimeById = async (animeId) => {
  const anime = await animeModel.findOne({ animeId });
  return anime;
};



import animeModel from './model.js';

export const createAnime = async (anime) => {

    const existingAnime = await animeModel.findOne({
        animeId: anime.animeId
    });

    if (existingAnime) {

        await animeModel.deleteOne({
            animeId: anime.animeId
        });
    }

    const newAnime = await animeModel.create(anime);
    return newAnime;
};

export const findAnimeById = async (animeId) => {
    const anime = await animeModel.findOne({
        animeId
    });
    return anime;
};

export const getAnime = async () => {
    const animes = await animeModel.find();
    return animes;
};
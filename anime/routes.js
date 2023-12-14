import * as adao from "./dao.js";

function AnimeRoutes(app) {
    const createAnime = async (req, res) => {
        const anime = await adao.createAnime(req.body);
        res.json(anime);
    };
    const findAnimeById = async (req, res) => {
        const anime = await adao.findAnimeById(req.params.animeId);
        res.json(anime);
    };

    const getAnime = async (req, res) => {
        const anime = await adao.getAnime();
        res.json(anime);
    };

    app.post("/api/anime", createAnime);
    app.get("/api/anime", getAnime);
    app.get("/api/anime/:animeId", findAnimeById);
}
export default AnimeRoutes;
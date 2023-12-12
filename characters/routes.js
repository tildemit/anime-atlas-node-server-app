import * as cdao from "./dao.js";
function CharacterRoutes(app) {
  const createCharacter= async (req, res) => { 
    const character = await cdao.createCharacter(req.body);
    res.json(character);
  };
  const findCharacterById = async (req, res) => {
    const character = await cdao.findCharacterById(req.params.characterId);
    res.json(character);
   };
  app.post("/api/characters", createCharacter);
  app.get("/api/characters/:characterId", findCharacterById);
}
export default CharacterRoutes;
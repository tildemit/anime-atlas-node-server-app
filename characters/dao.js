// dao.js

import characterModel from './model.js';

export const createCharacter = async (character) => {
    // Check if an anime with the given ID already exists
    const existingCharacter = await characterModel.findOne({ characterId: character.characterId });
  
    if (existingCharacter) {
      // Anime with the given ID already exists, remove it
      await characterModel.deleteOne({ characterId: character.characterId });
    }
  
    // Add the anime again
    const newCharacter = await characterModel.create(character);
    return newCharacter;
  };

export const findCharacterById = async (characterId) => {
  const character = await characterModel.findOne({ characterId });
  return character;
};



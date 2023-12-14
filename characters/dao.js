import characterModel from './model.js';

export const createCharacter = async (character) => {

    const existingCharacter = await characterModel.findOne({
        characterId: character.characterId
    });

    if (existingCharacter) {

        await characterModel.deleteOne({
            characterId: character.characterId
        });
    }

    const newCharacter = await characterModel.create(character);
    return newCharacter;
};

export const findCharacterById = async (characterId) => {
    const character = await characterModel.findOne({
        characterId
    });
    return character;
};
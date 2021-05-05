const models = require('../models');
const classHelper = require('./classHelper.js');

const { Character } = models;

const makerPage = (req, res) => {
  Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), characters: docs });
  });
};

const makeCharacter = (req, res) => {
  // Checks all info is filled
  if (!req.body.name || !req.body.age || !req.body.class || !req.body.subclass) {
    return res.status(400).json({ error: 'Both name and age are required' });
  }

  // Using classHelper gets appropriate values to add to character
  // Gives class and subclass to get values
  const values = classHelper.classValues(req.body.class, req.body.subclass);

  const characterData = {
    name: req.body.name,
    age: req.body.age,
    class: req.body.class,
    subclass: req.body.subclass,
    health: values[0],
    damage: values[1],
    exp: values[2],
    owner: req.session.account._id,
  };

  const newCharacter = new Character.CharacterModel(characterData);

  const characterPromise = newCharacter.save();

  characterPromise.then(() => res.json({ redirect: '/maker' }));

  characterPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Character already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return characterPromise;
};

const getCharacters = (request, response) => {
  const req = request;
  const res = response;

  return Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ characters: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getCharacters = getCharacters;
module.exports.make = makeCharacter;

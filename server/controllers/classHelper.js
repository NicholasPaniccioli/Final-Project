// Takes class and subclass of character to distribute appropriate values
// Values = Health, Attack, EXP
function classValues(Class, Subclass) {
  let health;
  let attack;
  let exp;
  const values = [health, attack, exp];

  // Checks class then subclass
  // If nothing goes to default
  if (Class === 'wizard') {
    if (Subclass === 'fire') {
      health = 10;
      attack = 8;
      exp = 0;

      return values;
    } if (Subclass === 'water') {
      health = 15;
      attack = 6;
      exp = 0;

      return values;
    }
  }

  // Default
  health = 10;
  attack = 5;
  exp = 0;

  return values;
}

module.exports.classValues = classValues;

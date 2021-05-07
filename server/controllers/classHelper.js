// Takes class and subclass of character to distribute appropriate values
// Values = Health, Damage, EXP
function classValues(Class, Subclass) {
  let health;
  let damage;
  let exp;

  // Checks class then subclass
  // If nothing goes to default
  if (Class === 'wizard') {
    if (Subclass === 'fire') {
      health = 10;
      damage = 8;
      exp = 0;

      const values = [health, damage, exp];

      return values;
    } if (Subclass === 'water') {
      health = 15;
      damage = 6;
      exp = 0;

      const values = [health, damage, exp];

      return values;
    }
  }

  // Default
  health = 10;
  damage = 5;
  exp = 0;

  const values = [health, damage, exp];

  return values;
}

module.exports.classValues = classValues;

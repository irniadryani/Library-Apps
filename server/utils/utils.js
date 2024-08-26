const bcrypt = require('bcrypt');

// Function for hash password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

//Function for compare password and hash password
const comparePassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    throw new Error('data and hash arguments required');
  }
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };

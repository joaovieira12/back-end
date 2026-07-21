const bcrypt = require('bcrypt');

async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
}

async function comparePassword(plainPassword, storedPassword) {
  if (!storedPassword) {
    return false;
  }

  if (storedPassword.startsWith('$2')) {
    return bcrypt.compare(plainPassword, storedPassword);
  }

  return plainPassword === storedPassword;
}

module.exports = { hashPassword, comparePassword };

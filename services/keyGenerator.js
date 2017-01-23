const createKey = (keyLength) => {
  let key = "";
  let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (let i = 0; i < keyLength; i++) {
    key += alphabet[Math.floor(Math.random() * alphabet.length)]
  };

  return key;
}

module.exports = createKey

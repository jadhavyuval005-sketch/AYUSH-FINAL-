const hasIncreasingLetterTriplet = (value) => {
  const normalized = value.toLowerCase();

  for (let index = 0; index < normalized.length - 2; index += 1) {
    const a = normalized.charCodeAt(index);
    const b = normalized.charCodeAt(index + 1);
    const c = normalized.charCodeAt(index + 2);
    const isLetter = a >= 97 && a <= 122 && b >= 97 && b <= 122 && c >= 97 && c <= 122;

    if (isLetter && b === a + 1 && c === b + 1) {
      return true;
    }
  }

  return false;
};

const hasIncreasingNumberTriplet = (value) => {
  for (let index = 0; index < value.length - 2; index += 1) {
    const a = value.charCodeAt(index);
    const b = value.charCodeAt(index + 1);
    const c = value.charCodeAt(index + 2);
    const isDigit = a >= 48 && a <= 57 && b >= 48 && b <= 57 && c >= 48 && c <= 57;

    if (isDigit && b === a + 1 && c === b + 1) {
      return true;
    }
  }

  return false;
};

const hasThreeIdenticalInRow = (value) => /(.)\1\1/.test(value);

const validatePassword = (password) => {
  const rules = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    noIncreasingLetters: !hasIncreasingLetterTriplet(password),
    noIncreasingNumbers: !hasIncreasingNumberTriplet(password),
    noTripleSame: !hasThreeIdenticalInRow(password),
  };

  if (!rules.minLength) return "Password must be at least 8 characters.";
  if (!rules.uppercase) return "Password must include at least 1 uppercase letter.";
  if (!rules.lowercase) return "Password must include at least 1 lowercase letter.";
  if (!rules.number) return "Password must include at least 1 number.";
  if (!rules.special) return "Password must include at least 1 special character.";
  if (!rules.noIncreasingLetters) return "Password must not contain 3 consecutive increasing letters (abc, xyz).";
  if (!rules.noIncreasingNumbers) return "Password must not contain 3 consecutive increasing numbers (123, 456).";
  if (!rules.noTripleSame) return "Password must not contain 3 identical characters in a row (aaa, 111).";

  return "";
};

export default validatePassword;
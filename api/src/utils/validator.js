/**
 *
 * @description magicTrimmer removes leading and trailing spaces from a string
 *
 */

export const magicTrimmer = (payload) => {
  const data = {};
  if (payload) {
    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      if (typeof value === 'object') {
        Object.assign(data, { [key]: value });
      } else {
        Object.assign(data, { [key]: value.trim() });
      }
    });
    payload = data;
  }
  return payload;
};

/**
 * @description inValidEmail is a function that validates an email
 *
 * @param {email} email is the data you want to verify if its a valid email
 *
 * @returns {string|null} error message or null if valid
 */
export const inValidEmail = (email) => {
  if (!email) return `'Email' is required`;
  email = email.toLowerCase();
  if (!/^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) return 'email is not valid';
  return null;
};

/**
 *
 * @description inValidPassword is a function that validates a password
 *
 * @param {password} password is the data you want to validate whether it is alphanumeric
 *
 * @returns {string|null} error message or null if valid
 */
export const inValidPassword = (password) => {
  if (!password) return `'Password' is required`;
  if (password.length < 8) return `'Password' should be at least eight characters`;
  if (!/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/^[a-zA-Z0-9]+$/.test(password)) {
    return 'Password should contain at least one Uppercase letter, one lowercase letter, and at least one digit';
  }
  return null;
};

export const emptyInput = (text, fieldName = 'field') => {
  if (!text) return `Input invalid, '${fieldName}' cannot be empty`;
};

export const validate = (obj) => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      result[key] = obj[key];
    }
  });
  if (Object.keys(result).length) {
    return result;
  }
  return null;
};

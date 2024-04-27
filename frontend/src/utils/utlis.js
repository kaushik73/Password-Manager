import * as CryptoJS from "crypto-js";

export function genUniqueId() {
  const dateStr = Date.now().toString(36); // convert num to base 36 and stringify

  const randomStr = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point

  return `${dateStr}-${randomStr}`;
}

export const getSecretKey = () => {
  const userData = getSessionData();
  if (userData != null) {
    return userData.password;
  } else {
    // return "fjsio^&fwe!@";
    throw Error;
  }
};

export const encrypt = (plainText, secretKey) => {
  const cipherText = CryptoJS.AES.encrypt(plainText, secretKey).toString();
  return cipherText;
};

export const decrypt = (cipherText, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  const plainText = bytes.toString(CryptoJS.enc.Utf8);
  return plainText;
};

export const setSessionData = (sessionData) => {
  const secretKeyForSession = "fjsio^&fwe!@";
  const stringFormatUserPassword = sessionData.password.toString();
  const encryptedUserPassword = encrypt(
    stringFormatUserPassword,
    secretKeyForSession
  );

  sessionStorage.setItem(
    "user-data",
    JSON.stringify({ ...sessionData, password: encryptedUserPassword })
  );
};

export const getSessionData = () => {
  const secretKeyForSession = "fjsio^&fwe!@";
  const JSONFormatSessionData = JSON.parse(sessionStorage.getItem("user-data"));
  if (JSONFormatSessionData == null) {
    return null;
  }
  const decryptedPassword = decrypt(
    JSONFormatSessionData.password,
    secretKeyForSession
  );
  const decryptedSessionData = {
    ...JSONFormatSessionData,
    password: decryptedPassword,
  };
  return decryptedSessionData;
};

export const clearSessionItem = (item) => {
  sessionStorage.removeItem(item);
};

export const togglePassword = (passwordRef, imgRef) => {
  const currentType = passwordRef.current.type;
  passwordRef.current.type = currentType === "password" ? "text" : "password";
  imgRef.current.src =
    currentType === "password"
      ? "../../icons/OpenEye-NonBG.png"
      : "../../icons/CloseEye-NonBG.png";
};

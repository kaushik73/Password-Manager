import {
  getSecretKey,
  decrypt,
  encrypt,
  getSessionData,
  genUniqueId,
} from "./utlis";
import { BACKEND_URL } from "../configFile";
// const BACKEND_URL = "https://password-manager-49xe.onrender.com";

export const getUserDataFromID = async (ID) => {
  const secretKey = getSecretKey();
  let request = await fetch(`${BACKEND_URL}/onePassword?id=${ID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let password = await request.json();
  const decryptedPassword = {
    ...password,
    password: decrypt(password.password, secretKey),
  };

  return decryptedPassword;
};

export const getPasswords = async () => {
  try {
    const secretKey = getSecretKey();
    const sessionData = getSessionData();
    const queryParams = new URLSearchParams({
      ownerEmail: sessionData.ownerEmail,
    });
    let request = await fetch(`${BACKEND_URL}/getPasswords?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!request.ok) {
      throw new Error(`Failed to fetch passwords: ${request.statusText}`);
    }
    let passwordsArray = await request.json();
    // Decrypt each password using the provided secretKey
    const decryptedPasswords = passwordsArray.map((password) => ({
      ...password,
      password: decrypt(password.password, secretKey),
    }));

    return decryptedPasswords;
  } catch (error) {
    console.error("Error fetching passwords:", error.message);
    throw error;
  }
};

export const savePassword = async (password) => {
  try {
    const secretKey = getSecretKey();
    const encryptedPassword = encrypt(password.password, secretKey);

    const response = await fetch(`${BACKEND_URL}/savePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...password,
        password: encryptedPassword,
        id: genUniqueId(),
        ownerEmail: getSessionData()?.ownerEmail, // Access ownerEmail safely
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save password: ${response.statusText}`);
    }

    console.log("Password saved successfully");
  } catch (error) {
    console.error("Error saving password:", error.message);
    throw error; // Rethrow the error to propagate it to the caller
  }
};

export const deletePassword = async (password) => {
  try {
    let res = await fetch(`${BACKEND_URL}/deletePassword`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: password.id }),
    });
    if (res.ok) {
      console.log("Successfully deleted password");
    } else {
      console.error("Failed to delete password");
    }
  } catch (error) {
    console.error("Error deleting password:", error);
  }
};

export const updatePassword = async (password) => {
  try {
    const secretKey = getSecretKey();

    let res = await fetch(`${BACKEND_URL}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...password,
        password: encrypt(password.password, secretKey),
      }),
    });
    if (res.ok) {
      console.log("Password updated successfully");
      return res.ok;
    } else {
      throw new Error(`Failed to update password: ${res.statusText}`);
    }
  } catch (error) {
    console.error("Error updating password:", error.message);
    throw error;
  }
};

export const signUpUser = async (user) => {
  const secretKeyForUser = "fjsio^&fwe!@"; // start point hai ye
  const secretKey = secretKeyForUser;
  const encryptedPassword = encrypt(user.password, secretKey);
  const encryptedConfirmPassword = encrypt(user.confirmPassword, secretKey);
  let res = await fetch(`${BACKEND_URL}/saveUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...user,
      password: encryptedPassword,
      confirmPassword: encryptedConfirmPassword,
      id: genUniqueId(),
    }),
  });

  if (res.ok) {
    console.log("User SignUp successfully");
  } else {
    throw new Error(`Failed to Signup User: ${res.statusText}`);
  }
};

export const loginInUser = async (user) => {
  const secretKeyForUser = "fjsio^&fwe!@";
  const secretKey = secretKeyForUser;
  const queryParams = new URLSearchParams({
    ownerEmail: user.ownerEmail,
    collectionName: "userCredentails",
  });
  let res = await fetch(`${BACKEND_URL}/findUser?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let ans = await res.json(); // ans = {Result;{},UserFound:Boolean}

  if (ans.UserFound == true) {
    const decryptedPassword = decrypt(ans.Result.password, secretKey);

    return { ...ans.Result, password: decryptedPassword };
  } else {
    return null;
  }
};

export const isUserExist = async (user) => {
  const queryParams = new URLSearchParams({
    ownerEmail: user.ownerEmail,
    collectionName: "userCredentails",
  });
  let res = await fetch(`${BACKEND_URL}/findUser?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let ans = await res.json();
  return ans.UserFound;
};

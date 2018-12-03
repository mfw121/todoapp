import { AsyncStorage } from "react-native";

export const USER_KEY = "login";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const saveUsername = username => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem("username", username)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export const onSignOut = () => {
  return AsyncStorage.removeItem(USER_KEY);
};

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

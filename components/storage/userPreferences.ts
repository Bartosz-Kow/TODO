import { STORAGE_KEYS } from "./storageKeys";
import { saveData, getData } from "./AsyncStorage";

export const setUserName = async (name: string) => {
  await saveData(STORAGE_KEYS.USER_NAME, name);
};

export const getUserName = async (): Promise<string | null> => {
  return await getData(STORAGE_KEYS.USER_NAME);
};

export const setUserImage = async (image: string) => {
  await saveData(STORAGE_KEYS.USER_IMAGE, image);
};

export const getUserImage = async (): Promise<string | null> => {
  return await getData(STORAGE_KEYS.USER_IMAGE);
};

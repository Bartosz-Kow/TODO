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

export const setUserTask = async (
  tasks: { note: string; category: string }[]
) => {
  await saveData(STORAGE_KEYS.TASK_LIST, tasks);
};

export const getUserTask = async (): Promise<
  { note: string; category: string }[] | null
> => {
  return await getData(STORAGE_KEYS.TASK_LIST);
};

export const setThemeMode = async (isDarkMode: boolean) => {
  await saveData(
    STORAGE_KEYS.THEME_MODE,
    isDarkMode ? "darkMode" : "lightMode"
  );
};

export const getThemeMode = async () => {
  return await getData(STORAGE_KEYS.THEME_MODE);
};

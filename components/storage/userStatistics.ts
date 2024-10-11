import { STORAGE_KEYS } from "./storageKeys";
import { saveData, getData } from "./AsyncStorage";

export const setAddedCount = async (addedTasksCount: number) => {
  await saveData(STORAGE_KEYS.ADDED_TASK_COUNT, addedTasksCount.toString());
};

export const getAddedCount = async (): Promise<number> => {
  const count = await getData(STORAGE_KEYS.ADDED_TASK_COUNT);
  return count !== null ? parseInt(count, 10) : 0;
};

export const setDeletedCount = async (deletedTaskCount: number) => {
  await saveData(STORAGE_KEYS.DELETED_TASK_COUNT, deletedTaskCount.toString());
};

export const getDeletedCount = async (): Promise<number> => {
  const count = await getData(STORAGE_KEYS.DELETED_TASK_COUNT);
  return count !== null ? parseInt(count, 10) : 0;
};

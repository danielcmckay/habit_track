import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLocalStorage = <T>(
  key: string
): [() => Promise<T[]>, (data: T[]) => void] => {
  const getItemsFromLS = async () => {
    let data: T[] = [];

    try {
      await AsyncStorage.getItem(key).then((res) => {
        if (res !== null) {
          data = (JSON.parse(res) as T[]) ?? [];
        }
      });
    } catch (error) {
      console.log(error);
    }
    return data;
  };

  const saveItemsToLS = async (data: T[]) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  return [getItemsFromLS, saveItemsToLS];
};

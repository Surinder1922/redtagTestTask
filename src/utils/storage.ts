import AsyncStorage from "@react-native-async-storage/async-storage";
export type StorageKey = 'cart' | 'language'

export const setItem = async (key: StorageKey, data: string | object) => {
    let dataToStore = '';
    if (typeof data === 'object') {
        dataToStore = JSON.stringify(data);
    }
    else {
        dataToStore = data;
    }
    return AsyncStorage.setItem(key, dataToStore);
}

export const getItem = async (key: StorageKey) => {

    return AsyncStorage.getItem(key);
}
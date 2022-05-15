import AsyncStorage from '@react-native-async-storage/async-storage';
import immutablePersistenceTransform from './Services/ImmutablePersistenceTransform';

const REDUX_PERSIST = {
    active: true,
    reducerVersion: '4',
    storeConfig: {
        storage: AsyncStorage,
        whitelist: [],
        transforms: [immutablePersistenceTransform]
    }
};

export const updateWhitelist = (whitelistItems: any[]): void => {
    REDUX_PERSIST.storeConfig.whitelist = whitelistItems;
};

export default REDUX_PERSIST;

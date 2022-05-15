import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore } from 'redux-persist';
import ReduxPersist from '../../Config/ReduxPersist';

import { ReduxActions } from '../../Actions/index';

const updateReducers = (store: Object) => {
    const { reducerVersion } = ReduxPersist;
    const config = ReduxPersist.storeConfig;
    const performRehydrate = () => store.dispatch(ReduxActions.rehydrate());

    // Check to ensure latest reducer version
    AsyncStorage.getItem('reducerVersion')
        .then((localVersion) => {
            if (localVersion !== reducerVersion) {
                console.tron.display({
                    name: 'PURGE',
                    value: {
                        'Old Version:': localVersion,
                        'New Version:': reducerVersion
                    },
                    preview: 'Reducer Version Change Detected',
                    important: true
                });

                // Purge store
                persistStore(store, config, performRehydrate).purge();
                AsyncStorage.setItem('reducerVersion', reducerVersion);
            } else {
                persistStore(store, config, performRehydrate);
            }
        })
        .catch(() => {
            persistStore(store, config, performRehydrate);
            AsyncStorage.setItem('reducerVersion', reducerVersion);
        });
};

export default { updateReducers };

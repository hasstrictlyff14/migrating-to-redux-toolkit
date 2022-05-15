import { autoRehydrate } from 'redux-persist';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import R from 'ramda';
import { configureStore } from '@reduxjs/toolkit';
import Config from '../../Config/DebugSettings';
import RehydrationServices from './RehydrationServices';
import ReduxPersist from '../../Config/ReduxPersist';
import * as Log from '../../Lib/Log';

export default (rootReducer, rootSaga) => {

    const middleware = [];
    const enhancers = [];


    const onSagaUncaughtExceptions = (error) => {
        Log.logError('Uncaught Exception', error);
    };
    const sagaMonitor = __DEV__ ? null : null;
    const sagaMiddleware = createSagaMiddleware({
        sagaMonitor,
        onError: onSagaUncaughtExceptions
    });
    middleware.push(sagaMiddleware);


    const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE'];

    if (__DEV__) {
        const USE_LOGGING = Config.reduxLogging;
        const logger = createLogger({
            predicate: (getState, { type }) => USE_LOGGING && R.not(R.contains(type, SAGA_LOGGING_BLACKLIST))
        });
        middleware.push(logger);
    }

    if (ReduxPersist.active) {
        enhancers.push(autoRehydrate());
    }

    const store = configureStore({
        reducer: rootReducer,
        middleware,
        enhancers
    });

    if (ReduxPersist.active) {
        RehydrationServices.updateReducers(store);
    }

    sagaMiddleware.run(rootSaga);

    return store;
};

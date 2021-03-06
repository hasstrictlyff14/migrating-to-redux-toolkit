import { combineReducers, Store } from 'redux';
import React from 'react';
import configureStore from '.CreateStore';
import rootSaga from '../Sagas/index';

import { updateWhitelist } from './ReduxPersist';

import { itemScreen } from './ItemScreenReducer';
import { itemScreenPersisted } from './ItemScreenPersistedReducer';

// To make a reducer be persisted, simply provide the word "persisted" in the createReducer function that gets exported
const reducers = {
    itemScreen,
    itemScreenPersisted
};

const getPersistedProperties = () =>
    Object.keys(reducers).filter((key: string) => {
        return key.toLowerCase().includes('persisted');
    });

const createStore = () => {
    const rootReducer = combineReducers(reducers);

    const whitelistProperties = getPersistedProperties();
    updateWhitelist(whitelistProperties);

    return configureStore(rootReducer, rootSaga);
};

export type TypeOfReducers = typeof reducers;

export type UnwrapReducer<TReducer> = TReducer extends React.Reducer<infer TOut, any> ? TOut : any;

export type ReduxState = { [key in keyof TypeOfReducers]: UnwrapReducer<TypeOfReducers[key]> };

export const store: Store<ReduxState> = createStore();

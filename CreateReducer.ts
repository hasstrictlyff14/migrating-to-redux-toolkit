import { createReducer as reduxCreateReducer } from 'reduxsauce';
import type { Reducer } from 'react';
import type { AnyAction } from 'redux';
import type { Immutable, ImmutableObject } from 'seamless-immutable';

export type ApplyStateFunction<T> = (newState: T) => Immutable<T>;

export type ReducerActionObjectType<TState> = {
    [key: string]: (
        oldState: ImmutableObject<TState>,
        parameters: AnyAction,
        applyState: ApplyStateFunction<TState>
    ) => TState;
};

const createReducer = <TState, TReducerActions extends ReducerActionObjectType<TState>>(
    initialState: Immutable<TState>,
    reducerActionsObject: TReducerActions
): Reducer<TState, AnyAction> => {
    const reducerKeys: Array<keyof TReducerActions> = Object.keys(reducerActionsObject);

    const reducerObject: { [key in keyof TReducerActions]?: (state: any, action: any) => any } = {};
    reducerKeys.forEach((reducerKey) => {
        const reducerAction = reducerActionsObject[reducerKey];
        reducerObject[reducerKey] = (state: ImmutableObject<TState>, parameters: AnyAction) => {
            const applyNewState = (newState: TState) => {
                return state.merge(newState);
            };

            return reducerAction(state, parameters, applyNewState);
        };
    });

    return reduxCreateReducer<TState>(initialState as any, reducerObject);
};

export { createReducer };

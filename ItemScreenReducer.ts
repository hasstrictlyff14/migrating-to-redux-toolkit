import Immutable from 'seamless-immutable';
import { Action } from 'redux';
import { createReducer } from './CreateReducer';
import type { ApplyStateFunction } from './CreateReducer';
import { convertActionToName, ItemScreenReducerActions } from './Actions';

type ItemScreenReducerState = {
    currentPage: number;
};

const INITIAL_STATE = Immutable<ItemScreenReducerState>({
    currentPage: 0
});

const setCurrentPage = (
    oldState: ItemScreenReducerState,
    { currentPage }: { currentPage: number } & Action,
    applyNewState: ApplyStateFunction<ItemScreenReducerState>
): ItemScreenReducerState => {
    const newState: ItemScreenReducerState = { ...oldState };
    newState.currentPage = currentPage;
    return applyNewState(newState);
};

const resetState = (
    oldState: ItemScreenReducerState,
    _: any,
    applyNewState: ApplyStateFunction<ItemScreenReducerState>
): ItemScreenReducerState => {
    return applyNewState(INITIAL_STATE);
};

const itemScreen = createReducer(INITIAL_STATE, {
    [convertActionToName(ItemScreenReducerActions.setCurrentPage)]: setCurrentPage,
    [convertActionToName(ItemScreenReducerActions.resetState)]: resetState
});

export { itemScreen };

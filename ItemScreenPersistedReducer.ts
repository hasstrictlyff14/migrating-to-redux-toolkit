import Immutable from 'seamless-immutable';
import { Action } from 'redux';
import { createReducer } from './Services/CreateReducer';
import type { ApplyStateFunction } from './Services/CreateReducer';
import { convertActionToName, ItemScreenActions } from '../Actions';

export type RecordedItem = {
    itemId: string;
    recordingCount: number;
};

type ItemScreenPersistedState = {
    recordedItems: { [key: string]: RecordedItem };
    isRecordingDisabledForAllItems: boolean;
};

const INITIAL_STATE = Immutable<ItemScreenPersistedState>({
    recordedItems: {},
    isRecordingDisabledForAllItems: false
});

const setRecordedItems = (
    oldState: ItemScreenPersistedState,
    {
        recordedItems
    }: {
        recordedItems: Array<RecordedItem>;
    } & Action,
    applyNewState: ApplyStateFunction<ItemScreenPersistedState>
): ItemScreenPersistedState => {
    const newState: ItemScreenPersistedState = { ...oldState };
    newState.recordedItems = { ...newState.recordedItems };
    recordedItems.forEach((recordedItem: RecordedItem) => {
        newState.recordedItems[recordedItem.itemId] = recordedItem;
    });
    return applyNewState(newState);
};

const setIsRecordingDisabledForAllItems = (
    oldState: ItemScreenPersistedState,
    { isRecordingDisabledForAllItems }: { isRecordingDisabledForAllItems: boolean } & Action,
    applyNewState: ApplyStateFunction<ItemScreenPersistedState>
): ItemScreenPersistedState => {
    const newState: ItemScreenPersistedState = { ...oldState };
    newState.isRecordingDisabledForAllItems = isRecordingDisabledForAllItems;
    return applyNewState(newState);
};

const resetState = (
    oldState: ItemScreenPersistedState,
    _: any,
    applyNewState: ApplyStateFunction<ItemScreenPersistedState>
): ItemScreenPersistedState => {
    return applyNewState(INITIAL_STATE);
};

const itemScreenPersisted = createReducer(INITIAL_STATE, {
    [convertActionToName(ItemScreenActions.setRecordedItems)]: setRecordedItems,
    [convertActionToName(ItemScreenActions.setIsRecordingDisabledForAllItems)]:
        setIsRecordingDisabledForAllItems,
    [convertActionToName(ItemScreenActions.resetState)]: resetState
});

export { itemScreenPersisted };

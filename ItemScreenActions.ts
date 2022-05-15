import { Action, AnyAction } from 'redux';
import { createMyActions } from './ReduxActions';
import { RecordedItem } from './ItemScreenPersistedReducer';

type ItemScreenActionsType = {
    setIsRecordingDisabledForAllItems: (isRecordingDisabledForAllItems: boolean) => AnyAction;
    setRecordedItems: ( recordedItems: Array<RecordedItem> ) => AnyAction;
    resetState: () => Action;
};

const ItemScreenActions: ItemScreenActionsType = createMyActions('ItemScreenActions', {
    setIsRecordingDisabledForAllItems: ['isRecordingDisabledForAllItems'],
    setRecordedItems: ['recordedItems'],
    resetState: null
});

export { ItemScreenActions };

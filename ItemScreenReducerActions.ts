import { Action, AnyAction } from 'redux';
import { createMyActions } from '../Lib/ReduxActions';

type ItemScreenReducerActionsType = {
    setCurrentPage: (currentPage: number) => AnyAction;
    resetState: () => Action;
};

const ItemScreenReducerActions: ItemScreenReducerActionsType = createMyActions('ItemScreenReducerActions', {
    setCurrentPage: ['currentPage'],
    resetState: null
});

export { ItemScreenReducerActions };

import type { Action } from 'redux';
import { ItemScreenActions } from './ItemScreenActions';
import { ItemScreenReducerActions } from './ItemScreenReducerActions';

const convertActionToName = <TActionName extends string>(action: (...params: any[]) => Action<TActionName>): string => {
    const { type } = action();
    return type;
};

export {
    ItemScreenActions,
    ItemScreenReducerActions,
};

export { convertActionToName };

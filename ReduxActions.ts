// See https://raw.githubusercontent.com/skellock/reduxsauce/master/lib/createActions.js

import { isNil, isEmpty, keys, map, zipObj } from 'ramda';
import type { Action, ActionCreator, ActionCreatorsMapObject, AnyAction } from 'redux';
import type { Actions } from 'reduxsauce';

export type StrongActionCreatorsMapObject<TActionsConfig extends Actions> = {
    [actionName in keyof TActionsConfig]: (...actionParameters: any[]) => Action<actionName>;
};

const isNotDefined = (value: any): value is never => isNil(value) || isEmpty(value);

const createMyActions = <TActions extends Actions>(
    actionGroupName: string,
    actionsConfig: TActions
): StrongActionCreatorsMapObject<TActions> => {
    if (isNotDefined(actionGroupName)) {
        throw new Error('actionGroupName is required');
    }
    if (isNotDefined(actionsConfig)) {
        throw new Error('actionsConfig is required');
    }

    const convertKeyNamesToFunctions = (keyName: keyof TActions): ActionCreator<AnyAction> => {
        const actionName = `${actionGroupName}:${keyName}`;

        const actionConfig = actionsConfig[keyName];
        if (isNotDefined(actionConfig)) {
            const simpleAction = () => ({
                type: actionName
            });
            return simpleAction;
        }
        const complexAction = (...actionParameters: any[]) => {
            const actionProperties = zipObj(actionConfig, actionParameters);
            return {
                type: actionName,
                ...actionProperties
            };
        };
        return complexAction;
    };

    const actionNames: Array<keyof TActions> = keys(actionsConfig);
    const actionFunctions = map(convertKeyNamesToFunctions, actionNames);
    const actionObject: ActionCreatorsMapObject<AnyAction> = zipObj(actionNames as string[], actionFunctions);
    return actionObject as any;
};

export { createMyActions };

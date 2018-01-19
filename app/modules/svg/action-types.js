// @flow
import type {CreateItemActionType} from '../../shared/types';

export const CreateItem:CreateItemActionType = 'ALL:CREATE_ITEM';

export type Union =
  | typeof CreateItem;

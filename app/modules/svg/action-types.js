// @flow
import type {CreateItemActionType} from '../../shared/types';

export const CreateShape:CreateItemActionType = 'ALL:CREATE_ITEM';

export type Union =
  | typeof CreateShape;

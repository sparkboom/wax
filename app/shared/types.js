// @flow

export type CreateItemActionType = 'ALL:CREATE_ITEM';

export type CreateItemAction = {
  +type:CreateItemActionType,
  +parentItemKey:string,
  +itemKey:string,
  +name:string,
  +class:string,
  +properties?:{
  }
};

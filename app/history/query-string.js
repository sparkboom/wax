import find from 'lodash/find';

export const QUERY_STRING_VALUES = {
  DATE_RANGE_ID: 'daterange',
  FB_AD_ACCOUNT: 'fbadaccount',
  IAPL_OPEN_STATE: 'showiapl',
};

export const getParameter = (params, param) => find(params, (value, key) => key.toLowerCase() === param.toLowerCase());

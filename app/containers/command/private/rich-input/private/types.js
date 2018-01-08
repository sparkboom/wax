// @flow

export type Theme = {
  +textColor:string,
  +selectedTextColor:string,
};

export type Props = {
  +children:mixed,
  +theme:Theme,
};

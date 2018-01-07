// @flow

export type ExecuteCommandActionType = 'APP:EXECUTE_COMMAND';

export type Action = {
  type:string,
  // ...
};
export type Command = {
  action:Action,
  command:string
}
export type ExecuteCommandAction = {type:ExecuteCommandActionType, commands:Command[] };

export type AppAction =
  | ExecuteCommandAction;

export type ExecuteCommandActionType = 'APP:EXECUTE_COMMAND';

export type Command = mixed;
export type ExecuteCommandAction = {type:ExecuteActionsActionType, command:Command };

export type AppAction =
  | ExecuteCommandAction;

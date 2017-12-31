// @flow
import {EXECUTE_COMMAND} from './action-types';
import type {ExecuteCommandAction, Command} from './types';

export const executeCommand:(Command => ExecuteCommandAction) = command => ({type:EXECUTE_COMMAND, command});

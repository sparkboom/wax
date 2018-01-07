// @flow

import {EXECUTE_COMMAND} from './action-types';
import type {ExecuteCommandAction, Command} from './types';

export const executeCommand:(Command => ExecuteCommandAction) = command => Object.freeze({type:EXECUTE_COMMAND, command});

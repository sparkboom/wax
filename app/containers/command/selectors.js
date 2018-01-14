import {createSelector} from 'reselect';
import unique from 'lodash/uniq';

const getNodes = props => props.canvas.nodes;
const getSelection = props => props.canvas.selection;

export const getUniqueClasses = createSelector(getNodes, getSelection,(nodes, selection=[]) => unique(selection.map( nodeKey => nodes[nodeKey].nodeClass )));

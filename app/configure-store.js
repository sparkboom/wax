import { createStore } from 'redux';

export default (reducers = {}, middleware) => createStore(reducers, middleware);

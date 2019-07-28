import { createStore } from 'redux';

export const initState = {
  code: [1, 2, 3, 4],
};

export const reducers = {};

export const actions = {};

export const identity = i => i;

export const reducer = (state, action)=> (
  reducers[ action.type ] || identity
)(state, action);


export default createStore(reducer, initState);

import { addMessage } from './state/actionCreators';
import registerSender from './connectToPusher';
import { logSideEffect } from '../shared/logger';

export default function registerSideEffects({ subscribe, getState, dispatch }) {
  
  // Side-effects to a given flux action
  const se = {
    SET_SENDER: (state, { params: { sender }}) => registerSender(sender, data => dispatch(addMessage(data))),
  };
  
  // During every dispatch, this function gets called:
  subscribe(() => {
    const state = getState();
    const records = state.records;
    const lastAction = records[records.length - 1];
    
    // If a side-effect is found, we invoke it
    if (se[lastAction.type]) {
      logSideEffect('Found side-effect for', lastAction.type);
      se[lastAction.type](state, lastAction);
    }
  });
}
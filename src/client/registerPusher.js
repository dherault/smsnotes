/* global Pusher */
import { addMessage } from './state/actionCreators';

export default function registerPusher({ subscribe, getState, dispatch }) {
  const pusher = new Pusher('20cf6fc89f9825ca708b', {
    cluster: 'eu',
    encrypted: true
  });
  
  let channel;
  
  subscribe(() => {
    
    const records = getState().records;
    const lastAction = records[records.length - 1];
    
    if (lastAction.type === 'SET_SENDER') {
      console.log('.E. Setting sender');
      const sender = lastAction.params.sender;
      
      channel = pusher.subscribe(sender);
      channel.bind('new_message', data => dispatch(addMessage(data)));
    }
  });
}
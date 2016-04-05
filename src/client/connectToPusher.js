/* global Pusher */
import { logWebsocket } from '../shared/logger';

// Let's connect to Pusher ASAP (main --import--> registerSideEffects --import--> connectToPusher)
const pusher = new Pusher('20cf6fc89f9825ca708b', {
  cluster: 'eu',
  encrypted: true
});
  
let channel;

export default function registerSender(sender, cb) {
  logWebsocket('Registering new sender:', sender);
  
  channel = pusher.subscribe(sender); // we use the sender (id/phone number) as the Pusher channel name
  channel.bind('new_message', data => {
    logWebsocket('New message from pusher:', data);
    cb(data); // No logic about state management (actions and stuff) here: only websockets
  });
}
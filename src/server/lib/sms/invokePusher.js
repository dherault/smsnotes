import Pusher from 'pusher';

// added to gitignore, accessible from https://dashboard.pusher.com/apps/[app_id]/getting_started
import config from './pusherConfig';
import { logError } from '../../../shared/logger';

// Sends a push to the sender's channel with the sms data
export default function invokePusher({ sender, content }) {
  
  // This can't fail. A Pusher failure is not our app's failure
  return new Promise(resolve => {
    
    new Pusher(config).trigger(sender, 'new_message', {
      sender,
      content,
      createdAt: Date.now(),
    }, undefined, error => {
      if (error) logError('Pusher.trigger ' + sender, error);
      
      resolve();
    });
  });
}

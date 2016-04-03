'use strict';

/*
  Will send phony text messages until death like a common teenager
*/

const sendSms = require('./sendOfflineSms');
let i = 0;

function loop() {
  i++;
  console.log();
  console.log(`Sending sms #${i}`);
  
  const content = process.argv[3] === 'true' ? 'Sample sms ' + i : process.argv[3];
  sendSms(process.argv[2], content).then(loop);
}

loop(); // :)

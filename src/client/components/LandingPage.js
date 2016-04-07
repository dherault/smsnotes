import React from 'react';
// import ReceiversList from './LandingPage/ReceiversList';

class LandingPage extends React.Component {

  render() {
    
    return <div>
      <header>
        <h1>SMS Notes</h1>
        <div className='lead'>
          <div>
            Take notes by sending texts, for free.
          </div>
          <div>
            No app, no account, just texts.
          </div>
        </div>
      </header>
      
      <main>
        How does this work ?
        <ol>
          <li>
            Find out what your internationnal phone number is. 
            For example, if you live in France and your phone number is 0611223344, 
            your internationnal phone number is +33611223344
          </li>
          <li>
            Go to www.smsnotes/+33611223344 (replace with your own internationnal phone number)
          </li>
          <li>
            Send a SMS to this number: +33 6 44 63 11 10
            (Sorry, there is only a French number for now. If you send your SMS from outside France roaming charges may apply)
          </li>
          <li>
            Your SMS will appear on your screen!
          </li>
        </ol>
        
        <div>This is an experiment, nothing serious.</div>
        <div>Your data is stored by Amazon Web Services in Frankfurt, Germany and is not disclosed to any third party.</div>
        <div>Your texts are visible to anyone who knows your phone number.</div>
        
      </main>
    </div>;
  }
}

export default LandingPage;


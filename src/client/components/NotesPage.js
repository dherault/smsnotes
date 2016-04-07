import React from 'react';
import { connect } from 'react-redux';

import Note from './Note';
import { readMessages, setSender } from '../state/actionCreators';

class NotesPage extends React.Component {
  
  constructor() {
    super();
    
    this.state = {
      loaded: false
    };
  }
  
  componentDidMount() {
    console.log('NotesPage mount!');
    const dispatch = this.props.dispatch;
    const sender = this.props.routeParams.sender;
    
    const action = readMessages({ sender });
    
    dispatch(action); // Why doesn't dispatch return the action ?
    dispatch(setSender({ sender }));
    
    action.promise.then(() => {
      this.setState({
        loaded: true
      });
    });
  }

  render() {
    
    const sender = this.props.routeParams.sender;
    const messages = this.props.messages.filter(x => x.sender === sender);
    
    return <div>
      <h1>{ `Notes from +${sender}` }</h1>
      <div>
      {
        this.state.loaded ? messages.length ? 
          messages.map((x, i) => <Note key={i} note={x} />) 
          : 'No notes! Send a text to +33 6 44 63 11 10 to add one.'
          : 'Loading...'
      }
      </div>
    </div>;
  }
}

const mapStateToProps = s => ({ 
  messages: s.messages,  
});

export default connect(mapStateToProps)(NotesPage);

import React from 'react';
import { connect } from 'react-redux';

import Note from './NotesPage/Note';
import { readMessages } from '../state/actionCreators';

class NotesPage extends React.Component {
  
  componentDidMount() {
    console.log('NotesPage mount!');
    this.props.dispatch(readMessages({
      sender: this.props.routeParams.sender
    }));
  }

  render() {
    
    const sender = this.props.routeParams.sender;
    const messages = this.props.messages.filter(x => x.sender === sender);
    
    return <div>
      <h1>{ `Notes from +${sender}` }</h1>
      <div>
      {
        messages.length ? 
          messages.map((x, i) => <Note key={i} note={x} />) 
          : 'No notes! Send a text to x'
      }
      </div>
    </div>;
  }
}

const mapStateToProps = s => ({ 
  messages: s.messages,  
});

export default connect(mapStateToProps)(NotesPage);

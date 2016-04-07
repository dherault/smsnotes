import React from 'react';
// import { readMessages } from '../state/actionCreators';

export default class Note extends React.Component {
  
  render() {
    
    const { createdAt, content } = this.props.note;
    
    return <div className='note'>
      <div className='note_timestamp'>{ makeHumanFriendly(createdAt) }</div>
      { content }
    </div>;
  }
}

function makeHumanFriendly(timestamp) {
  const d = new Date(timestamp);
  // const dayMapping = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const monthMapping = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  let t = d.getMinutes().toString(10);
  t = t.length < 2 ? '0' + t : t;
  const h = d.getHours();
  t = h < 12 ? `${h}:${t}AM` : `${h - 12}:${t}PM`;
  
  return `${t} ${monthMapping[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

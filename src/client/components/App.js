import React from 'react';

export default class App extends React.Component{
  
  render() {
    
    return <div className='app_wrapper'>
      
      <div className='app_content'>
        { this.props.children }
      </div>
      
      <footer>
        <span>© 2016 David Hérault</span>
        <a href='https://github.com/dherault/smsnotes' target='_blank' className='footer_github'>
          <img alt='SMS Notes on Github' src='images/GitHub-Mark-32px.png' className='footer_github_img'/>
        </a>
        <span>Open-source (Apache-2.0)</span>
      </footer>
    </div>;
  }
} 

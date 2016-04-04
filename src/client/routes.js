import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import LandingPage from './components/LandingPage';
import NotesPage from './components/NotesPage';
import NotFoundPage from './components/NotFoundPage';

export default (

  <Route path='/' component={App}>
    <IndexRoute component={LandingPage}/>
    
    <Route path='+:sender' component={NotesPage} />
    <Route path='*' component={NotFoundPage} />
  </Route>

);

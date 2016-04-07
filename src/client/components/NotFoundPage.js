import React from 'react';
import { Link } from 'react-router';

export default () => <div className='not_found'>
  Page not found!
  <div className='not_found_small'>
    Did you forget to add '+' before your phone number?
    <Link to='/' alt='Go home'>Main page</Link>
  </div>
</div>;

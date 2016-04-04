import React from 'react';
import config from '../../config';

export default class PhoneNumberInput extends React.Component {
  
  constructor() {
    super();
    this.state = {
      inputNumber: '',
      computedNumber: '',
      placeholder: '06 xx xx xx xx',
      countryIndex: 0,
    };
  }
  
  handleSubmit(e) {
    e.preventDefault();
  }
  
  handleChange(key, e) {
    this.setState({
      [key]: e.target.value
    }, this.validateNumber.bind(this));
  }
  
  validateNumber() {
    const { inputNumber, countryIndex } = this.state;
    
    if (!inputNumber) return;
    console.log('validateNumber', inputNumber, countryIndex);
  }
  
  render() {
    
    return <form onSubmit={this.handleSubmit.bind(this)} className='lp_form'>
      
      <select value={this.state.countryIndex} onChange={this.handleChange.bind(this, 'countryIndex')}>
      {
        config.supportedCountries
          .filter(x => process.env.NODE_ENV === 'development' || x.supported)
          .map((x, i) => <option key={i} value={i}>{ x.fullName }</option>)
      }
      </select>
      <input type='text' 
        value={this.state.numberInput} 
        placeholder={this.state.placeholder}
        onChange={this.handleChange.bind(this, 'inputNumber')}
      />
    </form>;
  }
}
import React, { Component } from 'react';
import Form from './Form';

class App extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <Form />
        </div>
      </div>
    );
  }
}

export default App;

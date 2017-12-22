import React, { Component } from 'react';

class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }

  }

  render(){
    return(
      <div>
        <input type="text" />
      </div>
    )
  }
}

export default Text;

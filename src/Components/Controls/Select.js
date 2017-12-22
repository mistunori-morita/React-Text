import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }

  }

  render(){
    return(
      <div>
        <select>
            <option value="0">select</option>
        </select>
      </div>
    )
  }
}

export default Select;

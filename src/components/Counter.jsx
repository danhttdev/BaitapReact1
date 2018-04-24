import React from "react";
import PropTypes from "prop-types";

import "./Counter.css";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id || 0,
      value: this.props.value || 0,
      role: this.props.role || 0
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.id,
      value: nextProps.value,
      role: nextProps.role
    })
  }

  onChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <input
          id={this.state.id}
          value={this.state.value}
          onChange={this.onChange}
        />
        <div id="increase" className="btn">
          <button onClick={this.props.onClickCounter(this.props.id, true, this.props.role, this.state.value)}>
            +
          </button>
        </div>
        <div id="decrease" className="btn">
          <button onClick={this.props.onClickCounter(this.props.id, false, this.props.role, this.state.value)}>
            -
          </button>
        </div>
      </div>  
    );
  }
}

Counter.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onClickCounter: PropTypes.func.isRequired,
};

export default Counter;

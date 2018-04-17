import React from "react";
import PropTypes from "prop-types";

import "./Counter.css";

const Counter = props => (
  <div className="container">
    <input
      id={props.id}
      value={props.value}
      onChange={props.onChangeCounter(props.id, props.role)}
      onBlur={props.onBlur}
      onFocus={props.onFocusCounter(props.value)}
    />
    <div id="increase" className="btn">
      <button onClick={props.onClickCounter(props.id, true, props.role)}>
        +
      </button>
    </div>
    <div id="decrease" className="btn">
      <button onClick={props.onClickCounter(props.id, false, props.role)}>
        -
      </button>
    </div>
  </div>
);

Counter.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onClickCounter: PropTypes.func.isRequired,
  onChangeCounter: PropTypes.func.isRequired,
  onFocusCounter: PropTypes.func.isRequired,
};

export default Counter;

import React from "react";
import PropTypes from "prop-types";

const ButtonDelete = props => (
  <button onClick={props.onClickDeleteElem} >
    X ( componet )
  </button>
);

ButtonDelete.propTypes = {
  onClickDeleteElem: PropTypes.func.isRequired,
};

export default ButtonDelete;

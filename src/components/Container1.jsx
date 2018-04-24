import React, { Component } from "react";
import axios from "axios";
import Counter from "./Counter";
import "./Container1.css";
import { connect } from "react-redux";
import {
  HOST,
  KEY_PARENT_DECREASE,
  KEY_PARENT_INCREASE,
  KEY_UPDATE_CHILD
} from "../constants";
import {
  at_getData,
  at_togglePermit,
  at_changeValue,
  at_addParent
} from "../actions/Actions";
const uuid = require("uuid");

let counterResult = {
  dad: { id:"0", value:0, role: 1}, child: []
};
//------------------------------------------------------------------------
class Container1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onClickCounter = (id, isUp, role, value) => () => {
    const oldValue= this.props.counters.filter((item)=>{
      if (item.id === id) return true;return false;
    })[0].value;
    let link = `${HOST}`;
    const newValue = isUp?oldValue+1:oldValue-1;
    let info = {id:id,role:role,oldValue:oldValue,newValue:newValue};
    if (oldValue === 0 && !isUp){
    } else {
      axios.post(link,info)
      .then((res) => {
        switch (res.data.key){
          case KEY_UPDATE_CHILD:
            this.props.at_changeValue(res.data.id,parseInt(res.data.value,10));
            break;
          case KEY_PARENT_INCREASE:
            this.props.at_changeValue(res.data.id,parseInt(res.data.value,10));
            console.log(res.data.content);
            this.props.at_addParent(res.data.content);
            break;
          case KEY_PARENT_DECREASE:
          console.log(res.data);
            break;
          default:
            break;
        }
      });
    }
    
  }
  onDeleteElem = (id) => {

  }
  componentWillMount(){
    if (this.props.isPermit) {
      this.props.at_togglePermit();
      let link = `${HOST}`;
      axios.get(link)
        .then((res) => {
          console.log(res.statusText);
          this.props.at_togglePermit();
          this.props.at_getData(res.data);
      });
    }
    
  }
  render() {
    counterResult = this.props.counters.reduce(
      (a, item) => {
        if (item.role === 1) a.dad = { ...item };
        else a.child.push(item);
        return a;
      },
      { dad: {}, child: [] }
    );
    return (
      <div>
        <div className="dad">
          <Counter
            id={counterResult.dad.id}
            role={counterResult.dad.role}
            value={counterResult.dad.value}
            onClickCounter={this.onClickCounter}
          />
        </div>
        <div>
          {
            counterResult.child.map(item => { 
            return (
              <div className="counter-child" key={item.id}>
                <Counter
                  key={uuid()}
                  id={item.id}
                  role={item.role}
                  value={item.value}
                  onClickCounter={this.onClickCounter}
                />
                <button
                  className="btn-clear"
                  onClick={this.onDeleteElem(item.id)}
                >
                  X
                </button>
              </div>
            )
            })
          }
        </div>
        <div />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    at_getData: (arr) => dispatch(at_getData(arr)),
    at_togglePermit: () => dispatch(at_togglePermit()),
    at_changeValue: (id,value) => dispatch(at_changeValue(id,value)),
    at_addParent: (arr) => dispatch(at_addParent(arr)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container1);
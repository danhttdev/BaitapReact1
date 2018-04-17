import React, { Component } from "react";
import uuid from "uuid";
import Counter from "./Counter";
import "./Container1.css";
import ButtonDelete from "./ButtonDelete";

class Container1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: [
        { id: "0", value: 2, role: 0 },
        { id: "1", value: 1, role: 0 },
        { id: "2", value: 3, role: 0 },
        { id: "3", value: 6, role: 1 },
        { id: "4", value: 0, role: 0 },
        { id: "5", value: 5, role: 0 },
        { id: "6", value: 2, role: 0 },
      ],
    };
  }
  increaseItem = (itemss) => {
    itemss.value += 1;
  };
  decreaseItem = (itemss) => {
    if (itemss.value !== 0) itemss.value -= 1;
  };
  pushToArr = (array, num, obj = { id: uuid(), value: 1, role: 0 }) => {
    for (let i = 0; i < num; i += 1) {
      array.push(obj);
    }
  };
  increaseCounter = (num) => {
    const newCounters = this.state.counters.map((item) => {
      if (item.role === 1) item.value += num;
      return item;
    });
    this.setState({ counters: newCounters });
    for (let i = 0; i < num; i += 1) {
      this.state.counters.push({ id: uuid(), value: 1, role: 0 });
    }
  };
  decreaseCounter = (num) => {
    const newCounters = this.state.counters.map((item) => {
      if (item.role === 1) item.value -= num;
      return item;
    });
    this.setState({ counters: newCounters });
    const newCounterCopy = this.filterArr(true);
      for (let i = 0; i < num; i += 1) {
        newCounterCopy.pop();
      }
      newCounterCopy.push(this.filterArr(false)); 
      this.setState({ counters: newCounters });
    }
  };
  filterArr = (isChild) => {
    if (isChild) {
      return this.state.counters.filter((item) => {
        if (item.role === 0) return true;
        return false;
      });
    }
    return this.state.counters.filter(item => item.role === 1)[0];
  };

  onClickCounter = (id, isUp, role) => () => {
    if (role === 0) {
      const newCounters = this.state.counters.map((item) => {
        const newItem = { ...item };
        if (newItem.id === id) {
          if (isUp) newItem.value +=1;
          else if (newItem.value !== 0 ) newItem.value -=1;
        }
        return newItem;
      });
      this.setState({ counters: newCounters });
    } else {
      //const dadItem = this.filterArr(false); // thang cha
      if (isUp) {
        //dadItem.value +=1;
        increaseCounter(1);
      } else {
        decreaseCounter(1);
        //this.decreaseItem(dadItem);
        //const newCounterCopy = this.filterArr(newCounters, true);
        //newCounterCopy.pop();
        // this.pushToArr(newCounterCopy, 1, dadItem);
        // newCounters = [...newCounterCopy];
      }
      //this.setState({ counters: newCounters });
    }
  };

  onChangeCounter = (id, role) => (e) => {
    const sNum = e.target.value;
    let newCounters = this.state.counters.map((item) => {
      const newItem = { ...item };
      if (newItem.id === id) {
        const temp = newItem.value;
        const a = Number.parseInt(sNum, 10);
        newItem.value = Number.isNaN(a) ? temp : a;
      }
      return newItem;
    });
    this.setState({ counters: newCounters });
    if (role === 1) {
      const a = this.state.counters.length - 1; // so Counter con
      // const dadItem = this.filterArr(newCounters, false); // thang cha
      // const b = dadItem.value - a;
      const b = this.filterArr(false).value - a;
      if (b >= 0) {
        increaseCounter(b);
      } else {
        decreaseCounter(Math.abs(b));
        // const newCounterCopy = this.filterArr(newCounters, true);
        // for (let i = b; i < 0; i += 1) {
        //   newCounterCopy.pop();
        // }
        // this.pushToArr(newCounterCopy, 1, dadItem);
        // newCounters = [...newCounterCopy];
      }
    }
    // this.setState({ counters: newCounters });
  };

  onDeleteElem = id => () => {
    const countersCopyDelete = this.state.counters.map((item) => {
      const newItem = item;
      if (newItem.role === 1) {
        const a = newItem.value;
        newItem.value = a === 0 ? 0 : a - 1;
      }
      return newItem;
    });
    const newCounters = countersCopyDelete.filter((item) => {
      if (item.id !== id) return true;
      return false;
    });
    this.setState({ counters: newCounters });
  };

  render() {
    let counterResult = {
      dad: {},
      child: [],
    };
    counterResult = this.state.counters.reduce(
      (a, item) => {
        if (item.role === 1) a.dad = { ...item };
        else a.child.push(item);
        return a;
      },
      { dad: {}, child: [] },
    );
    return (
      <div>
        <div className="dad">
          <Counter
            key={uuid()}
            id={counterResult.dad.id}
            role={counterResult.dad.role}
            value={counterResult.dad.value}
            onClickCounter={this.onClickCounter}
            onChangeCounter={this.onChangeCounter}
          />
        </div>
        <div>
          {counterResult.child.map(item => (
            <div className="counter-child" key={uuid()}>
              <Counter
                key={uuid()}
                id={item.id}
                role={item.role}
                value={item.value}
                onClickCounter={this.onClickCounter}
                onChangeCounter={this.onChangeCounter}
              />
              <button
                className="btn-clear"
                onClick={this.onDeleteElem(item.id)}
              >
                X
              </button>
              <ButtonDelete onClickDeleteElem={this.onDeleteElem(item.id)} />
            </div>
          ))}
        </div>
        <div />
      </div>
    );
  }
}
export default Container1;

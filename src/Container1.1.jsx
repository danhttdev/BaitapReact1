import React, { Component } from "react";
// import uuid from "uuid";
import axios from "axios";
import Counter from "./Counter";
import "./Container1.css";
import ButtonDelete from "./ButtonDelete";

class Container1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: [
        { id: "2", value: 3, role: 0 },
        { id: "3", value: 2, role: 1 },
      ],
    };
  }

  axiospost = () => {
    axios
      .post("http://localhost/counter.php", { ID: "12345" })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // axiosget = () => {
  //   axios.get("http://192.168.1.6:3000/media/trieutandanh/Studying/act/atinh/BaitapReact1/baitap1/src/counter.php?ID=1234&num=4")
  //     .then((res) => {
  //       // const persons = res.data;
  //       console.log(res.data);
  //     });
  // }


  axiosGetIncreaseCounter = (num) => {
    let link = "http://localhost/counter.php?type=1&num="+num;
    axios.get(link)
      .then((res) => {
        console.log(res.data);

        // eslint-disable-next-line
        const newCounters = this.state.counters.map((item) => {
          if (item.role === 1) item.value += num;
          return item;
        });
        // const data2 = res.data.map((item)=>{
        //     const items = {id: " ", value:" ", role:" "};
        //     items.id = item.id;
        //     items.value = item.valueCounter;
        //     items.role = item.roleCounter;
        //     return items;
        // });
        //newCounters.push(data2);

        res.data.map((item)=>{
        const items = {id: " ", value:0, role:0};
        items.id = item.id;
        items.value = parseInt(item.valueCounter);
        items.role = parseInt(item.roleCounter);
        newCounters.push(items);
        return true;
        });
        console.log("data2");
        // console.log(data2);
        console.log("res.data");
        console.log(res.data);
        this.setState({ counters: newCounters });

      });
  }
  axiosGetDecreaseCounter = (num) => {
    let link = "http://localhost/counter.php?type=0&num="+num;
    axios.get(link)
      .then((res) => {
        // const persons = res.data;
        // console.log(res.data);
      });
  }

  // postData = () => {
  //   const xhttp = new XMLHttpRequest();
  //   xhttp.onreadystatechange = function () {
  //     xhttp.open("POST", "demo_post2.asp", true);
  //     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //     xhttp.send("ID=12345");
  //   };
  // }


  increaseCounter = (num) => {

    if (!Number.isNaN(num)) {
    this.axiosGetIncreaseCounter(num);

      // // eslint-disable-next-line
      // const newCounters = this.state.counters.map((item) => {
      //   if (item.role === 1) item.value += num;
      //   return item;
      // });
      // for (let i = 0; i < num; i += 1) {
      //   newCounters.push({ id: uuid(), value: 1, role: 0 });
      // }
      // this.setState({ counters: newCounters });


    }
  }
  decreaseCounter = (num) => {
    this.axiosGetDecreaseCounter(num);
    if (!Number.isNaN(num) && this.state.counters.length > 1) {

      const numRest = this.state.counters.length - num - 1;
      let bonus = 0;
      const chidCounters = this.state.counters.filter((item, index) => {
        if (item.role === 1) bonus = 1;
        if (index < (numRest + bonus) && item.role === 0) return true;
        return false;
      });
      const dad = this.filterArr(false);
      dad.value = numRest;
      this.setState({
        counters: [dad, ...chidCounters],
      });
    }
  };
  filterArr = (isChild) => {
    if (isChild) {
      return this.state.counters.filter((item) => {
        if (item.role === 0) return true;
        return false;
      });
    } return this.state.counters.filter(item => item.role === 1)[0];
  }
  onClickCounter = (id, isUp, role) => () => {
    if (role === 0) {
      const newCounters = this.state.counters.map((item) => {
        const newItem = { ...item };
        if (newItem.id === id) {
          if (isUp) newItem.value += 1;
          else if (newItem.value !== 0) newItem.value -= 1;
        }
        return newItem;
      });
      this.setState({ counters: newCounters });
    } if (role === 1) {
      if (isUp) {
        this.increaseCounter(1);
      } else {
        this.decreaseCounter(1);
      }
    }
  }
  onChangeCounter = (id, role) => (e) => {
    const sNum = e.target.value;
    const newCounters = this.state.counters.map((item) => {
      const newItem = { ...item };
      if (newItem.id === id && newItem.role === 0) {
        const temp = newItem.value;
        const a = Number.parseInt(sNum, 10);
        newItem.value = Number.isNaN(a) ? temp : a;
      }
      return newItem;
    });
    this.setState({ counters: newCounters });
    if (role === 1) {
      const a = this.state.counters.length - 1;
      const b = Number.parseInt(sNum, 10) - a;
      if (b >= 0) {
        this.increaseCounter(b);
      } else {
        this.decreaseCounter(Math.abs(b));
      }
    }
  }
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
  }
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
    console.log(counterResult);
    return (
      <div>
        <div className="dad">
          <Counter
            key={counterResult.dad.id}
            id={counterResult.dad.id}
            role={counterResult.dad.role}
            value={counterResult.dad.value}
            onClickCounter={this.onClickCounter}
            onChangeCounter={this.onChangeCounter}
          />
        </div>
        <div>
          {counterResult.child.map(item => (
            <div className="counter-child" key={item.id}>
              <Counter
                key={item.id}
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

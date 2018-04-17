import React, { Component } from "react";
import axios from "axios";
import Counter from "./Counter";
import "./Container1.css";
import ButtonDelete from "./ButtonDelete";

class Container1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: [],
    };
  }

  axiosGetIncreaseCounter = (num) => {
    let link = "http://localhost/counter.php?type=1&num="+num;
    axios.get(link)
      .then((res) => {
        console.log("result data truoc khi map");
        console.log(this.state.counters);
        console.log("result data increase");
        console.log(res.data);
        const newCounters = this.state.counters.map((item) => {
          if (item.role === 1) item.value += num;
          return item;
        });
        res.data.map((item)=>{
          newCounters.push(item);
          return true;
        });
        console.log("result data sau khi map");
        console.log(newCounters);
        this.setState({ counters: newCounters });

      });
  }
  axiosGetDecreaseCounter = (num) => {
    let link = `http://localhost/counter.php?type=0&num=${num}`;
    axios.get(link)
      .then((res) => {
        // const persons = res.data;
        console.log(res.data);
      });
  }
  axiosChild = (id,value) => {
    const that = this;
    console.log("idup: "+id);
    let link = `http://localhost/counter.php?id=${id}&value=${value}`;
    axios.get(link)
      .then((res) => {
        if (res.data.trim() === "CHILD_EDIT"){
          const newCounters = that.state.counters.map((item) => {
            const newItem = { ...item };
            if (newItem.id === id) {
              newItem.value += value;
            }
            return newItem;
          });
          that.setState({ counters: newCounters });
        }
      });
  }
  increaseCounter = (num) => {
    if (!Number.isNaN(num)) {
    this.axiosGetIncreaseCounter(num);
    }
  }
  decreaseCounter = (num) => {
    if (!Number.isNaN(num) && this.state.counters.length > 1) {
      this.axiosGetDecreaseCounter(num);
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
        const valueCurrent = this.state.counters.filter((item) => {
          if (item.id === id) {
            return item;
          }
          return false;
        })[0].value;
        if (valueCurrent !==0 && !isUp){
          this.axiosChild(id,-1);
        }
        if ( isUp ) this.axiosChild(id,1);
      //  this.setState({ counters: newCounters });




      // const newCounters = this.state.counters.map((item) => {
      //   const newItem = { ...item };
      //   if (newItem.id === id) {
      //     if (isUp) {
      //       newItem.value += 1;
      //     }
      //     else if (newItem.value !== 0 ) newItem.value -= 1;
      //   }
      //   return newItem;
      // });
      // this.setState({ counters: newCounters });











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
    console.log("ee: "+sNum);
    console.log("role: "+role);
    if (role===0){
      const valueCurrent = this.state.counters.filter((item) => {
        if (item.id === id) {
          return item;
        }
        return false;
      })[0].value;
      console.log("value curr: valueCurrent"+valueCurrent);
      const a = Number.parseInt(sNum, 10);
      if (!Number.isNaN(a)){
        console.log("aaa: "+a)
        this.axiosChild(id,sNum-valueCurrent);

      }

    }
    // newItem.value = Number.isNaN(a) ? valueCurrent : a;


    // const newCounters = this.state.counters.map((item) => {
    //   const newItem = { ...item };
    //   if (newItem.id === id && newItem.role === 0) {
    //     const temp = newItem.value;
    //     const a = Number.parseInt(sNum, 10);
    //     newItem.value = Number.isNaN(a) ? temp : a;
    //   }
    //   return newItem;
    // });
    // this.setState({ counters: newCounters });





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
    console.log("id: "+id);
    const that = this;
    let link = "http://localhost/counter.php?idDelete="+id;
    axios.get(link)
      .then((res) => {
        if (res.data.trim() === "XOA"){
          console.log("xuli XOA");
          const countersCopyDelete = that.state.counters.map((item) => {
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
          that.setState({ counters: newCounters });
        } 
    })
  }
  componentWillMount(){
    const that=this;
    let link = "http://localhost/counter.php";
    axios.get(link)
      .then((res) => {
        const newCounters = res.data.map((item)=>{
          return item;
        });
        that.setState({ counters: newCounters });    
    })
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
      { dad: { id:"0", value:0, role: 1}, child: [] },
    );
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

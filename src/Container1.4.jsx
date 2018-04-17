import React, { Component } from "react";
import axios from "axios";
import Counter from "./Counter";
import "./Container1.css";
import ButtonDelete from "./ButtonDelete";

const HOST = "http://localhost/counter.php";
const CHILD_EDIT = "CHILD_EDIT";
const CHILD_DELETE = "CHILD_DELETE";

class Container1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: [],isPermit:true,
      id:"",oldvalue: 0,
    };
  }

  axiosGetIncreaseCounter = (num) => {
    if (this.state.isPermit) {
      this.setState({isPermit:false});
      // let link = `${HOST}?type=1&num=${num}`;
      // axios.get(link)
      let link = `${HOST}`;
      axios.post(link,{type:1, num: 1 })
      .then((res) => {
        let newCounters = this.state.counters.map((item) => {
          if (item.role === 1) item.value += num;
          return item;
        });
        console.log("res: ", res.data);
        res.data.map((item)=>{
          newCounters.push(item);
          return true;
        });
        this.setState({ counters: newCounters, isPermit:true });
      });
    }
  }
  axiosGetDecreaseCounter = (num) => {
    if (this.state.isPermit) {
      this.setState({isPermit:false});
      // let link = `${HOST}?type=0&num=${num}`;
      // axios.get(link)
      let link = `${HOST}`;
      axios.post(link,{type:0, num: num})
      .then((res) => {
        console.log(res.data);
        this.setState({isPermit:true});
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
      });
    }
  }
  axiosChild = (id,value) => {
    const that = this;
    if (that.state.isPermit) {
      this.setState({isPermit:false});
      let link = `${HOST}?id=${id}&value=${value}`;
      axios.get(link)
        .then((res) => {
          console.log("---"+res.data+"----");
          if (res.data.trim() === CHILD_EDIT){
            const newCounters = that.state.counters.map((item) => {
              const newItem = { ...item };
              if (newItem.id === id) {
                newItem.value += value;
              }
              return newItem;
            });
            that.setState({ counters: newCounters, isPermit:true });
          }
        });
    }
  }
  increaseCounter = (num) => {
    if (!Number.isNaN(num)) {
    this.axiosGetIncreaseCounter(num);
    }
  }
  decreaseCounter = (num) => {
    if (!Number.isNaN(num) && this.state.counters.length > 1) {
      this.axiosGetDecreaseCounter(num);
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
    // if (role===0){
    //   const valueCurrent = this.state.counters.filter((item) => {
    //     if (item.id === id) {
    //       return item;
    //     }
    //     return false;
    //   })[0].value;
    //   const a = Number.parseInt(sNum, 10);
    //   if (!Number.isNaN(a)){
    //     this.axiosChild(id,sNum-valueCurrent);
    //   }
    // }
    //////////////////////////////////////////////////////////


    if (role===0){
      const valueCurrent = this.state.counters.filter((item) => {
        if (item.id === id) {
          return item;
        }
        return false;
      })[0].value;
      const a = Number.parseInt(sNum, 10);
      if (!Number.isNaN(a)){
        const newCounters = this.state.counters.map((item) => {
          const newItem = { ...item };
          if (newItem.id === id) {
            newItem.value += sNum-valueCurrent;
          }
          return newItem;
        });
        this.setState({id:id});
        this.setState({ counters: newCounters});
      }
    }



    ////////////////////////////////////////
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
  // onFocus = (id, role) => (e) => {
  //   const sNum = e.target.value;
  //   const a = Number.parseInt(sNum, 10);
  //   if (role===0){
  //     const countersCp = this.state.counters.map((item) => {
  //       if (item.id === id) {
  //         item.value = a;
  //         return item;
  //       }
  //       return item;
  //     });
  //     console.log(countersCp);
  //      this.setState({counters:countersCp});
  //     //const a = Number.parseInt(sNum, 10);
  //     // if (!Number.isNaN(a)){
  //     //   this.axiosChild(id,sNum-valueCurrent);
  //     // }
  //   }
  // }
  // onBlur = (id, role) => (e) => {
  //   const sNum = e.target.value;
  //   console.log("sNum:"+parseInt(sNum,10));
  //   // const sNum = e.target.value;
  //   // if (role===0){
  //   //   const valueCurrent = this.state.counters.filter((item) => {
  //   //     if (item.id === id) {
  //   //       return item;
  //   //     }
  //   //     return false;
  //   //   })[0].value;
  //   //   const a = Number.parseInt(sNum, 10);
  //   //   if (!Number.isNaN(a)){
  //   //     this.axiosChild(id,sNum-valueCurrent);
  //   //   }
  //   // }
  //   // if (role === 1) {
  //   //   const a = this.state.counters.length - 1;
  //   //   const b = Number.parseInt(sNum, 10) - a;
  //   //   if (b >= 0) {
  //   //     this.increaseCounter(b);
  //   //   } else {
  //   //     this.decreaseCounter(Math.abs(b));
  //   //   }
  //   // }
  // }

  onBlur = (e) => {
    console.log("onblur: "+this.state.id+"-->"+e.target.value);
    const a = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(a)){
      this.axiosChild(this.state.id,a-this.state.oldvalue);
    }
  }

  onFocusCounter = (value) => () => {
    this.setState({oldvalue:value});
  }

  onDeleteElem = id => () => {
    const that = this;
    if (that.state.isPermit) {
      that.setState({isPermit:false});
      let link = `${HOST}?idDelete=${id}`;
      axios.delete(link)// {idDelete : id}
        .then((res) => {
          if (res.data.trim() === CHILD_DELETE){
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
            that.setState({ counters: newCounters, isPermit:true });
          } 
      })
    }
  }
  
  componentWillMount(){
    const that=this;
    let link = `${HOST}`;
    if (that.state.isPermit) {
      that.setState({isPermit:false});
      axios.get(link)
        .then((res) => {
          that.setState({ counters: res.data, isPermit:true });    
      })
    }
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
            onBlur={this.onBlur}
            onFocusCounter={this.onFocusCounter}
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
                onBlur={this.onBlur}
                onFocusCounter={this.onFocusCounter}
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
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.completeItem = this.completeItem.bind(this);
    this.resetItems = this.resetItems.bind(this);
  }

  addItem () {
    const input = document.getElementById("input");
    const itemsArr = [...this.state.items];
    itemsArr.push({id: itemsArr.length, text: input.value, status: false});
    this.setState({ items: itemsArr });
    input.value = "";
  }

  completeItem (id) {
    const itemsArr = [...this.state.items];
    const index = itemsArr.map(item => item.id).indexOf(id);
    itemsArr[index].status = true;
    this.setState({
      items: itemsArr
    })
  }

  changeItem (id) {
    const input = document.getElementById("input");
    const itemsArr = [...this.state.items];
    const index = itemsArr.map(item => item.id).indexOf(id);
  }

  resetItems () {
    this.setState({items: []});
  }

  componentDidMount() {
    if (localStorage.getItem('myItems')) {
      this.setState({
        items: JSON.parse(localStorage.getItem('myItems'))
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('myItems', JSON.stringify(this.state.items));
  }

  render() {
    let itemsArr = [...this.state.items];
    const activeItem = itemsArr.filter(element => element.status === false);
    const completedItem = itemsArr.filter(element => element.status === true);
    itemsArr = [...activeItem, ...completedItem];
    const listItem = itemsArr.map((element) => {
      return (
        <li key={element.id} className={element.status ? "item item-done" : "item"}>
          <span className="span">{element.text}</span>
          <div className="wrapper-flex">
            {!element.status
              ? <div><button className="button" onClick={() => {this.completeItem(element.id)}}>Done</button><button className="button" >Change</button></div>
              : ""
            }


          </div>
        </li>
      )
    });

    return (
      <div className="container" id="App">
        <h1 className="heading">TODO List:</h1>
        {this.state.items.length === 0
          ? <p className="paragraph">Create your first task!</p>
          : ""
        }
        <div className="wrapper" >
          <ul className="list">
            {listItem}
          </ul>
          <input className="input" type="text" id="input" placeholder="Write your task here..." />
        </div>
        <div className="wrapper-flex" >
          <button className="button" onClick={this.addItem}>Add</button>
          {this.state.items.length > 0
            ? <button className="button" onClick={this.resetItems}>Reset</button>
            : ""
          }
        </div>
      </div>
    );
  }
}

export default App;

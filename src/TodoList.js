import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './style.css'

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: true,
      inputValue: '',
      list: []
    }

    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleInputChange(event) {
    const inputValue = event.target.value;
    this.setState(() => ({ inputValue }));
  }

  handleBtnClick() {
    if (this.state.inputValue) {
      this.setState((prevState) => ({
        list: [...prevState.list, prevState.inputValue],
        inputValue: ''
      }));
    }
  }

  handleItemDelete(index) {
    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return { list };
    });
  }

  getTodoItem() {
    return (this.state.list.map((item, index) =>
      (
        <CSSTransition
          in={this.state.show}
          classNames="fade"
          timeout={300}
        >
          <TodoItem key={index} content={item} index={index} deleteItem={this.handleItemDelete} />
        </CSSTransition>
      )
    ));
  }

  componentDidMount() {
    axios.get('/api/todolist')
      .then((res) => {
        this.setState(() => ({ list: [...res.data] }));
      }).catch(() => {
        console.log('error')
      });
  }

  handleToggle() {
    this.setState(() => {
      return {
        show: !this.state.show
      }
    })
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.handleToggle}>Toggle</button>
        <CSSTransition
          in={this.state.show}
          classNames="fade"
          timeout={1000}
        >
          <div>TodoList</div>
        </CSSTransition>
        <div>
          <label htmlFor="insertArea">Input Content</label>
          <input id="insertArea" className="input"
            value={this.state.inputValue}
            onChange={this.handleInputChange} />
          <button onClick={this.handleBtnClick.bind(this)} >submit</button>
        </div>
        <div>
          <ul>
            <TransitionGroup>
              {this.getTodoItem()}
            </TransitionGroup>
          </ul>
        </div>
      </Fragment>
    )
  }
}

export default TodoList
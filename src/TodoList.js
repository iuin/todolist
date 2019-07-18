import React, { Component, Fragment } from 'react'
import TodoItem from './TodoItem'
import './style.css'

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            list: []
        }

        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            inputValue: event.target.value
        });

    }

    handleBtnClick() {
      if(this.state.inputValue) {
          this.setState({
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        });
      }
    }

    handleItemDelete(index) {
        const list = [...this.state.list];
        list.splice(index, 1);

        this.setState({
            list: list
        });
    }

    getTodoItem() {
      return (
        this.state.list.map((item, index) => {
          return <TodoItem content={item} index={index} deleteItem={this.handleItemDelete}/>
        })
      );
    }

    render() {
        return (
            <Fragment>
                <div>TodoList</div>
                <div>
                    <label htmlFor="insertArea">Input Content</label>
                    <input id="insertArea" className="input" value={this.state.inputValue} onChange={this.handleInputChange.bind(this)} />
                    <button onClick={this.handleBtnClick.bind(this)} >submit</button>
                </div>

                <div>
                    <ul>
                        { this.getTodoItem() }
                    </ul>
                </div>
            </Fragment>
        )
    }
}

export default TodoList
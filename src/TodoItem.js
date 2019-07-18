import React, { Component} from 'react';

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        const { deleteItem, index } = this.props;
        deleteItem(index);
    }

    render() {
        return(
            <li key={this.props.index} onClick={this.handleDelete}>{this.props.content}</li>
        )
    }
}

export default TodoItem;
import React, {Component} from 'react';
import {TodoItem} from './TodoItem.js';
class TodoListView extends Component{
    render() { 
        let listDetails = this.props.todoDetails;
        let listItems = Object.keys(listDetails).map((todoId)=>{
           return(
                <TodoItem key = {todoId} todoDetails = {listDetails[todoId]} setCompletedStatus = {this.props.setCompletedStatus} setCheckedStatus ={this.props.setCheckedStatus} setUpdateStatus ={this.props.setUpdateStatus} onTodoUpdate = {this.props.onTodoUpdate} onTodoItemDelete = {this.props.onTodoItemDelete}/>
            );
        });
        return(
        <ul className="todo-list" id="todo-list">
         {listItems}
        </ul>);
    }
}
export {TodoListView};
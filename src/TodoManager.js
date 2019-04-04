import { TodoActionBar } from './TodoActionBar.js';
import { TodoItem } from './TodoItem.js';
// import { TodoListView } from './TodoListView.js';
import { deepCopy } from './DeepCopy.js';
import React from 'react';
import styles from './App.module.css';
import './index.css';

class TodoManager extends React.PureComponent {

  state = {
    inputText: "",
    todoDetails: {}
  }
  inputRef = React.createRef();
  textFieldRef = React.createRef();

  componentDidUpdate = () => {
    if (this.textFieldRef.current) {
      this.textFieldRef.current.focus();
    }
    if (!this.textFieldRef.current && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  setInputText = (text) => {
    let inputText = text;
    this.setState({ inputText });
  }

  addTodo = (text) => {
    let details = {
      todoId: new Date().getTime(),
      todoText: text,
      todoCheckedStatus: false,
      todoCompletedStatus: false,
      todoUpdateStatus: false
    };
    let todoDetails = Object.assign({}, this.state.todoDetails);
    todoDetails[details.todoId] = details;
    this.setState({ todoDetails });
    // this.inputRef.current.focus();
    // setTimeout(()=>console.log(this.state),3000);
  };

  setCompletedStatus = (todoId) => {
    let todoDetails = Object.assign({}, this.state.todoDetails);
    todoDetails[todoId] = deepCopy(this.state.todoDetails[todoId]);
    todoDetails[todoId].todoCompletedStatus = !todoDetails[todoId].todoCompletedStatus;
    this.setState({ todoDetails });
    // this.inputRef.current.focus();
  }

  setCheckedStatus = (todoId) => {
    let todoDetails = Object.assign({}, this.state.todoDetails);
    todoDetails[todoId] = deepCopy(this.state.todoDetails[todoId]);
    todoDetails[todoId].todoCheckedStatus = !todoDetails[todoId].todoCheckedStatus;
    this.setState({ todoDetails });
    // this.inputRef.current.focus();
  }

  setUpdateStatus = (todoId) => {

    let todoDetails = Object.assign({}, this.state.todoDetails);
    todoDetails[todoId] = deepCopy(this.state.todoDetails[todoId]);
    if (!todoDetails[todoId].todoCompletedStatus) {
      todoDetails[todoId].todoUpdateStatus = !todoDetails[todoId].todoUpdateStatus;
      this.setState({ todoDetails: todoDetails });
    }

  }

  setTodoText = (todoId, todoText) => {
    let todoDetails = Object.assign({}, this.state.todoDetails);
    todoDetails[todoId] = deepCopy(this.state.todoDetails[todoId]);
    todoDetails[todoId].todoText = todoText;
    this.setState({ todoDetails });
  }

  onTodoItemDelete = (todoId) => {
    let todoDetails = Object.assign({}, this.state.todoDetails);
    todoDetails[todoId] = deepCopy(this.state.todoDetails[todoId]);
    delete todoDetails[todoId];
    this.setState({ todoDetails });
    // this.inputRef.current.focus();
  }

  deleteAll = () => {
    this.setState({ todoDetails: {} });
    // this.inputRef.current.focus();
  }

  deleteSelected = () => {
    let todoDetails = Object.assign({}, this.state.todoDetails);
    for (var todoId in todoDetails) {
      if (todoDetails[todoId].todoCheckedStatus) {
        todoDetails[todoId] = deepCopy(this.state.todoDetails[todoId]);
        delete todoDetails[todoId];
      }
    }
    this.setState({ todoDetails });
    // this.inputRef.current.focus();
  }

  deleteCompleted = () => {
    let todoDetails = Object.assign({}, this.state.todoDetails);
    for (var todoId in todoDetails) {
      if (todoDetails[todoId].todoCompletedStatus) {
        todoDetails[todoId] = deepCopy(this.state.todoDetails[todoId]);
        delete todoDetails[todoId];
      }
    }
    this.setState({ todoDetails });
    // this.inputRef.current.focus();
  }

  render() {
    console.log("TodoManager");
    let listItems = Object.keys(this.state.todoDetails).map((todoId) => (
      <TodoItem
        ref={this.textFieldRef}
        key={todoId}
        todoDetails={this.state.todoDetails[todoId]}
        setCompletedStatus={this.setCompletedStatus}
        setCheckedStatus={this.setCheckedStatus}
        setUpdateStatus={this.setUpdateStatus}
        setTodoText={this.setTodoText}
        onTodoItemDelete={this.onTodoItemDelete}
      />)
    );
    return (
      <div>
        <h1 className={styles.title}>To-Do List</h1>

        <ul className={styles.todoList}>
          {listItems}
        </ul>

        <TodoActionBar
          ref={this.inputRef}
          addTodo={this.addTodo}
          deleteAll={this.deleteAll}
          deleteSelected={this.deleteSelected}
          deleteCompleted={this.deleteCompleted}
          setInputText={this.setInputText}
          inputText={this.state.inputText}
        />

      </div>
    );
  }
}

export default TodoManager;


/* <TodoListView todoDetails = {this.state.todoDetails} setCompletedStatus ={this.setCompletedStatus} setCheckedStatus ={this.setCheckedStatus} setUpdateStatus ={this.setUpdateStatus} onTodoUpdate={this.onTodoUpdate} onTodoItemDelete ={this.onTodoItemDelete}/> */
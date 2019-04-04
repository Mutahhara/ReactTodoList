import React from 'react';
import styles from './App.module.css';

const TodoActionBar = React.memo(React.forwardRef((props, ref) => {

    const addTodoOnEnter = (event) => {
        if (event.keyCode === 13) {
            if (event.target.value !== "") {
                props.addTodo(props.inputText);
            }
            props.setInputText("");
        }
    }

    const addTodoOnClick = () => {
        if (props.inputText) {
            props.addTodo(props.inputText);
        };
        props.setInputText("");
    }
    console.log("TodoActionBar");
    return (
        <div className={styles.fixedControlSectionWrapper}>

            <input className={styles.textbox}
                ref={ref}
                type="text"
                placeholder="Type Here"
                value={props.inputText}
                onChange={(event) => { props.setInputText(event.target.value) }}
                onKeyUp={addTodoOnEnter} />

            <div className={styles.addTodo}
                role="button"
                onClick={addTodoOnClick}>
                Add
            </div>

            <div className={styles.deleteAll}
                role="button"
                onClick={props.deleteAll}>
                Delete All
            </div>

            <div className={styles.deleteSelected}
                role="button"
                onClick={props.deleteSelected}>
                Delete Selected
            </div>

            <div className={styles.deleteCompleted}
                role="button"
                onClick={props.deleteCompleted}>
                Delete Completed
            </div>

        </div>
    );
}));
export { TodoActionBar };
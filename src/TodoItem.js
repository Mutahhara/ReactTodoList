import React from 'react';
import styles from './App.module.css';
const TodoItem = React.memo(React.forwardRef((props, ref) => {
    const onEnter = (event) => {
        if (event.keyCode === 13) {
            props.setUpdateStatus(props.todoDetails.todoId);
        }
    }
    let todoTextElementClassName = (!props.todoDetails.todoCompletedStatus) ? styles.todoText : styles.completedClass;
    let todoTextElement = (props.todoDetails.todoUpdateStatus) ?
        (<input
            ref={ref}
            className={styles.textbox}
            type="text"
            value={props.todoDetails.todoText}
            onChange={(event) => { props.setTodoText(props.todoDetails.todoId, event.target.value); }}
            onKeyUp={onEnter} />)
        :
        (<div className={todoTextElementClassName}>
            {props.todoDetails.todoText}
        </div>);

    let completedButtonText = (!props.todoDetails.todoCompletedStatus) ? "Completed" : "Not Completed";
    console.log("TodoItem");
    return (
        <li className={styles.listItem}>

            <input type="checkbox"
                onClick={() => { props.setCheckedStatus(props.todoDetails.todoId) }} />

            {todoTextElement}

            <div className={styles.listButtonsWrapper}>

                <div className={styles.donebtn}
                    role="button"
                    onClick={() => { props.setCompletedStatus(props.todoDetails.todoId) }}>
                    {completedButtonText}
                </div>

                <div className={styles.updatebtn}
                    role="button"
                    onClick={() => { props.setUpdateStatus(props.todoDetails.todoId) }}>
                    Update
                </div>

                <div className={styles.deletebtn}
                    role="button"
                    onClick={() => { props.onTodoItemDelete(props.todoDetails.todoId) }}>
                    Delete
                </div>

            </div>

        </li>
    );
}));


export { TodoItem };
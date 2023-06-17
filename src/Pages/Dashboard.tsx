import React, { FC, useState, ChangeEvent } from "react";
import "../App.css";
import { ITask } from "../Interfaces";
import TodoTask from "../Components/TodoTask";

const Dashboard: FC = () => {

  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event:ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value)
    if(event.target.name==="name"){
      setTask(event.target.value) 
    }
  }

  const addTask = () => {
    const newTask = {taskName: task}
    setTodoList([...todoList, newTask])
    setTask("")
  }

  const completeTask = (taskToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName !== taskToDelete
    }))
  }

  return (
    <div className="App">
      <div className="header">
        <div className="input-container">
          <input type="text" placeholder="Task.." name="name" value={ task } onChange={ handleChange}/>
          <button onClick={ addTask }>Add Task</button>
        </div>
      </div>
      <div className="todolist">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={ completeTask }></TodoTask>
        })}
      </div>
    </div>
  );
};

export default Dashboard;

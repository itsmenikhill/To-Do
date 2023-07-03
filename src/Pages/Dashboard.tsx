import React, { FC, useState, ChangeEvent } from "react";
import "../App.css";
import { ITask } from "../Interfaces";
import TodoTask from "../Components/TodoTask";
import { FaPlus } from "react-icons/fa";
import LogOut from "../Components/LogOut";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Dashboard: FC = () => {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const isDone = false;
  const location = useLocation();
  const email = location.state.email;

  // on load of this Dashboard component, call api to get all tasks from db
  // and set it as todolist
  // on addTask call, set the todolist and insert the item in the db as well
  // same when task is deleted

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
    if (event.target.name === "name") {
      setTask(event.target.value);
    }
  };

  const addTask = async (value: any) => {
    const newTask = { taskName: value.task, isDone: value.isDone };
    const response = await axios.post("http://localhost:8000/addtask", value);
    console.log(response);
    setTodoList([newTask, ...todoList]);
    setTask("");
  };

  const completeTask = (taskToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskToDelete;
      })
    );
  };

  return (
    <div>
      <div className="App">
        <div className="logout-app">
          <LogOut />
        </div>
        <div className="app-container">
          <div className="header">
            <h2 className="app-heading">ToDo List</h2>
            <div className="input-container">
              <input
                type="text"
                placeholder="Add your task here"
                name="name"
                value={task}
                onChange={handleChange}
              />
              <button onClick={()=>addTask({email, task, isDone})}>
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="task-container">
            <div className="todolist">
              {todoList.map((task: ITask, key: number) => {
                return (
                  <TodoTask
                    key={key}
                    task={task}
                    completeTask={completeTask}
                  ></TodoTask>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

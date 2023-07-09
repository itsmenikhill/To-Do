import React, { FC, useState, ChangeEvent, useEffect } from "react";
import "../App.css";
import { ITask } from "../Interfaces";
import TodoTask from "../Components/TodoTask";
import { FaPlus } from "react-icons/fa";
import LogOut from "../Components/LogOut";
import { useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { todo } from "node:test";

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

  useEffect(() => {
    onLoad(email);
  }, []);

  const onLoad = async (email: any) => {
    const tasks = await axios.get("http://localhost:8000/gettasks", email);
    const newItaskArr = [];
    // getting the items from the response and converting in a ITask array and setting the todolist
    for (let i = 0; i < tasks.data.length; i++) {
      const taskName: string = tasks.data[i].task;
      const isDone: boolean = tasks.data[i].isDone;
      const newTask: ITask = { taskName, isDone };
      newItaskArr.unshift(newTask);
    }
    setTodoList(newItaskArr);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
    if (event.target.name === "name") {
      setTask(event.target.value);
    }
  };

  const addTask = async (value: any) => {
    const newTask = { taskName: value.task, isDone: value.isDone };
    if (value.task !== "") {
      setTodoList([newTask, ...todoList]);
      const response = await axios.post("http://localhost:8000/addtask", value);
      console.log(response);
      setTask("");
    }
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
              <button
                onClick={() => {
                  addTask({ email, task, isDone });
                }}
              >
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

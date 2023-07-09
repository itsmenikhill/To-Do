import React, { useState } from "react";
import { ITask } from "../Interfaces";
import { FaCheck, FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  const location = useLocation();
  const [isDone, setIsDone] = useState(false);
  
  const deleteTask = async () => {
    const email = location.state.email;
    const toDelete = task.taskName;
    const response = await axios.post("http://localhost:8000/deleteTask", {email, toDelete});
  };

  if (task.taskName !== "") {
    return (
      <div className="task">
        <div className={task.isDone ? "dashedContent" : "content"}>
          <span>{task.taskName}</span>
        </div>
        <button
          className={task.isDone ? "done" : "notDone"}
          onClick={() => {
            task.isDone = !task.isDone;
            setIsDone(!isDone);
          }}
        >
          {<FaCheck />}
        </button>
        <button
          onClick={() => {
            deleteTask();
            completeTask(task.taskName);
          }}
        >
          {<FaTrash />}
        </button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default TodoTask;

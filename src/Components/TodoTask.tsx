import React, { useState } from "react";
import { ITask } from "../Interfaces";
import { FaCheck, FaTrash } from "react-icons/fa";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  const [isDone, setIsDone] = useState(false);
  if (task.taskName !== "") {
    return (
      <div className="task">
        <div className= {task.isDone ? "dashedContent":"content"}>
          <span>{task.taskName}</span>
        </div>
        <button
          className={task.isDone ? "done":"notDone"}
          onClick={() => {
            task.isDone = !task.isDone;
            setIsDone(!isDone);
          }}
        >
          {<FaCheck />}
        </button>
        <button
          onClick={() => {
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

import React, { useState } from "react";
import { ITask } from "../Interfaces";
import { FaCheck, FaTrash } from "react-icons/fa";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
  // changeStatus(taskName: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  const [isDone, setIsDone] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  if (task.taskName !== "") {
    return (
      <div className="task">
        <div className={isDone ? "dashedContent" : "content"}>
          <span>{task.taskName}</span>
        </div>
        <button
          className= { isChecked ? "done" : "notDone"}
          onClick={() => {
            setIsDone(!isDone);
            setIsChecked(!isChecked);
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

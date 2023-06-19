import React from "react";
import { ITask } from "../Interfaces";
import { FaTrash } from "react-icons/fa";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  if (task.taskName !== "") {
    return (
      <div className="task">
        <div className="content">
          <span>{task.taskName}</span>
        </div>
        <button
          onClick={() => {
            completeTask(task.taskName);
          }}
        >
          {<FaTrash />}
        </button>
      </div>
    );
  }
  else{
    return(
      <div></div>
    )
  }
};

export default TodoTask;

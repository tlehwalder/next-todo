import React, { FunctionComponent, useState } from "react";

import { Task } from "../models/task";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { CompletedTaskList } from "../components/CompletedTaskList";

interface State {
  newTask: Task;
  tasks: Task[];
}

function App() {
  const [isCompletedListActive, setCompletedListActive] = useState(false);
  const [newTask, setNewTask] = useState({
    id: 1,
    name: "",
    completed: false
  });

  const [tasks, setTasks] = useState(new Array<Task>());
  const [completedTasks, setCompletedTasks] = useState(new Array<Task>());

  const addTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNewTask({
      id: newTask.id + 1,
      name: "",
      completed: false
    });
    setTasks([...tasks, newTask]);
  };

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({
      ...newTask,
      name: event.target.value
    });
  };

  const deleteTask = (taskToDelete: Task) => {
    setTasks([...tasks.filter(task => task.id !== taskToDelete.id)]);
    setCompletedTasks([...completedTasks, taskToDelete]);
  };

  const undoTask = (taskToUndo: Task) => {
    setCompletedTasks([
      ...completedTasks.filter(task => task.id !== taskToUndo.id)
    ]);
    setTasks([...tasks, taskToUndo]);
  };

  const completeListActiveElement = (
    <>
      <input
        onChange={() => setCompletedListActive(!isCompletedListActive)}
        type="checkbox"
        defaultValue={isCompletedListActive.toString()}
        id="completedListActive"
      />
      <label htmlFor="completedListActive">Show Done Tasks</label>
    </>
  );

  return (
    <div>
      <h2>TS next Todos ✔</h2>
      <TaskForm
        disabled={newTask.name.length == 0}
        task={newTask}
        onAdd={addTask}
        onChange={handleTaskChange}
      />
      {completeListActiveElement}
      <div className="lists">
        <TaskList tasks={tasks} onDelete={deleteTask} />
        {isCompletedListActive ? (
          <CompletedTaskList tasks={completedTasks} onDelete={undoTask} />
        ) : null}
      </div>
      <style jsx>{`
        .lists {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}

export default App;

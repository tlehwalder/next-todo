import React, { FunctionComponent, useState } from "react";

import { Task } from "../models/task";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";

interface State {
  newTask: Task;
  tasks: Task[];
}

function App() {
  const [newTask, setNewTask] = useState({
    id: 1,
    name: ""
  });

  const [tasks, setTasks] = useState(new Array<Task>());

  const addTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNewTask({
      id: newTask.id + 1,
      name: ""
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
  };

  return (
    <div>
      <h2>TS next Todos ✔</h2>
      <TaskForm task={newTask} onAdd={addTask} onChange={handleTaskChange} />
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;

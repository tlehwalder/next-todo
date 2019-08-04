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

  return (
    <div>
      <h2>TS next Todos ✔</h2>
      <TaskForm
        disabled={newTask.name.length == 0}
        task={newTask}
        onAdd={addTask}
        onChange={handleTaskChange}
      />
      <div className="lists">
        <TaskList tasks={tasks} onDelete={deleteTask} />
        <CompletedTaskList tasks={completedTasks} onDelete={undoTask} />
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

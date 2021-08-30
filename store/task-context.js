import { createContext, useState } from "react";

export function TaskContextProvider(props) {
  const [tasks, setTasks] = useState([]);
  const setTasksHandler = (tasks) => {
    setTasks(tasks);
  };

  const context = {
    tasks,
    onSetTasks: setTasksHandler,
  };

  return (
    <TaskContext.Provider value={context}>
      {props.children}
    </TaskContext.Provider>
  );
}

const TaskContext = createContext({
  tasks: null,
  onSetTasks: function (tasks) {},
});

export default TaskContext;

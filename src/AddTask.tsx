import { ChangeEvent, useState } from "react";
import { Task } from "./task.models";

interface AddTaskProps {
  tasks: Task[];
  setTasks: (task: Task[]) => void;
}

export const AddTask = (props: AddTaskProps) => {
  // Almacena el texto de la nueva tarea
  const [taskText, setTaskText] = useState("");
  const { setTasks, tasks } = props;

  // Función para añadir una tarea
  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { text: taskText, isCompleted: false, id: Math.random() },
    ]);
    setTaskText("");
  };

  // Función para cambiar el texto en el campo de la entrada
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskText(event.target.value);
  };

  return (
    <div className="add-task">
      <input
        type="text"
        onInput={handleInput}
        value={taskText}
        placeholder="Añadir nueva tarea"
      />
      <button onClick={handleAddTask} disabled={!taskText.trim().length}>
        Añadir tarea
      </button>
    </div>
  );
};

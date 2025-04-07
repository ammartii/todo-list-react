import "./App.css";
import { ChangeEvent, useState } from "react";

// Definición de la interfaz Task para tipar las tareas
interface Task {
  text: string;
  isCompleted: boolean;
}

function App() {
  // Almacena el texto de la nueva tarea
  const [taskText, setTaskText] = useState("");

  // Almacena la lista de tareas
  const [tasks, setTask] = useState<Task[]>([
    { text: "Tarea 1", isCompleted: false },
    { text: "Tarea 2", isCompleted: true },
    { text: "Tarea 3", isCompleted: false },
  ]);

  // Función para añadir una tarea
  const handleAddTask = () => {
    setTask([...tasks, { text: taskText, isCompleted: false }]);
    setTaskText("");
  };

  // Función para cambiar el texto en el campo de la entrada
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskText(event.target.value);
  };

  // Función para marcar una tarea como completada o pendiente
  const handleToggleCompletion = (taskIndex: number) => {
    setTask((task) =>
      task.map((task, index) =>
        index === taskIndex ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  // Función para eliminar una tarea
  const handleDeleteTask = (taskIndex: number) => {
    setTask((tasks) => tasks.filter((_, index) => index !== taskIndex));
  };

  return (
    <>
      <h1>TODO-LIST</h1>

      {/* Sección para agregar tareas */}
      <div className="add-task">
        <input
          type="text"
          onInput={handleInput}
          value={taskText}
          placeholder="Añadir nueva tarea"
        />
        <button onClick={handleAddTask} disabled={!taskText}>
          Añadir tarea
        </button>
      </div>

      {/* Lista de tareas */}
      <div className="task-list">
        {/* Mapeamos las tareas para mostrarlas */}
        {tasks.map((task, index) => (
          <div key={index} className="task">
            <div>
              {/* Checkbox para completar la tarea */}
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleToggleCompletion(index)}
              />

              {/* Nombre de la tarea */}
              <span
                style={{
                  textDecoration: task.isCompleted ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
            </div>

            {/* Botón de eliminar */}
            <button onClick={() => handleDeleteTask(index)}>Eliminar</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

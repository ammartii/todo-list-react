import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { AddTask } from "./AddTask";
import { Task } from "./task.models";

function App() {
  // Almacena la lista de tareas
  const [tasks, setTasks] = useState<Task[]>([
    { text: "Tarea 1", isCompleted: false, id: Math.random() },
    { text: "Tarea 2", isCompleted: true, id: Math.random() },
  ]);

  // Almacena la lista de tareas completadas y pendientes
  const [isOnlyPending, setIsOnlyPending] = useState(false);
  const [isOnlyCompleted, setIsOnlyCompleted] = useState(false);

  // Unicornio
  const [showUnicorn, setShowUnicorn] = useState(false);
  useEffect(() => {
    const completedTasks = tasks.filter((task) => task.isCompleted).length;

    if (completedTasks >= 3) {
      setShowUnicorn(true);

      // Oculta el unicornio después de 4 segundos
      const timeout = setTimeout(() => {
        setShowUnicorn(false);
      }, 4000);

      return () => clearTimeout(timeout); // Limpia si cambia antes de terminar
    }
  }, [tasks]);

  // Función para marcar una tarea como completada o pendiente
  const toggleCompleteTask = (taskId: number) => {
    const updatedTask = tasks.map((tasks) => {
      if (tasks.id === taskId) {
        return {
          ...tasks,
          isCompleted: !tasks.isCompleted,
        };
      }
      return tasks;
    });

    setTasks(updatedTask);
  };

  // Función para eliminar una tarea
  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Función para alternar entre mostrar solo tareas pendientes
  const handleIsOnlyPendingClick = () => {
    setIsOnlyPending(!isOnlyPending);
    setIsOnlyCompleted(false); // Reseteamos el filtro de tareas completadas
  };

  // Función para alternar entre mostrar solo tareas completadas
  const handleIsOnlyCompletedClick = () => {
    setIsOnlyCompleted(!isOnlyCompleted);
    setIsOnlyPending(false); // Reseteamos el filtro de tareas pendientes
  };

  // Filtrar las tareas dependiendo de los estados de los filtros
  const filteredTasks = isOnlyPending
    ? tasks.filter((task) => !task.isCompleted) // Solo tareas pendientes
    : isOnlyCompleted
    ? tasks.filter((task) => task.isCompleted) // Solo tareas completadas
    : tasks; // Mostrar todas las tareas

  return (
    <>
      <h1>TODO-LIST</h1>

      {/* Unicornio */}
      {showUnicorn && (
        <div className="unicorn-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/10872/10872596.png"
            alt="Unicornio volador"
            className="unicorn"
          />
        </div>
      )}

      {/* Añadimos tareas */}
      <AddTask tasks={tasks} setTasks={setTasks} />

      {/* Filtro de tareas */}
      <div className="filters">
        <button
          className={isOnlyPending ? "filters__btn--selected" : ""}
          onClick={handleIsOnlyPendingClick}
        >
          {isOnlyPending ? "Mostrar todas" : "Mostrar solo pendientes"}
        </button>
        <button
          className={isOnlyCompleted ? "filters__btn--selected" : ""}
          onClick={handleIsOnlyCompletedClick}
        >
          {isOnlyCompleted ? "Mostrar todas" : "Mostrar solo completadas"}
        </button>
      </div>

      {/* Lista de tareas */}
      <div className="task-list">
        {/* Mapeamos las tareas para mostrarlas */}
        {filteredTasks.map((task, index) => (
          <div key={index} className="task">
            <div>
              {/* Checkbox para completar la tarea */}
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleCompleteTask(task.id)}
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
            <button onClick={() => deleteTask(task.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

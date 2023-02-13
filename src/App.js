import { useState, useEffect } from "react";
import "./App.css";
import { TaskCreator } from "./components/TaskCreator";
import { TaskTable } from "./components/TaskTable";
import { VisibilityControl } from "./components/VisibilityControl";

function App() {
  const [tasksItems, setTasksItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  /**Creamos una funcion para crear la nueva tarea, va a recibir un taskName como parametro */
  function createNewTask(taskName) {
    /**Recorremos el arreglo de tareas con el metodo find, y decimos que por cada tarea vamos a comparar task.name es igual al nombre que acabo de pasar, si no lo es, se agrega la nueva tarea*/
    if (!tasksItems.find((task) => task.name === taskName)) {
      /**creamos un nuevo arreglo ya que react lo pide de esa manera */
      setTasksItems([...tasksItems, { name: taskName, done: false }]);
    }
  }

  /**Funcion para cambiar el valor de la tarea, a true o false */
  function toggleTask(task) {
    setTasksItems(
      tasksItems.map((t) =>
        t.name === task.name ? { ...t, done: !t.done } : t
      )
    );
  }

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data) {
      setTasksItems(JSON.parse(data));
    }
  }, []);

  const clearTask = () => {
    setTasksItems(tasksItems.filter((task) => !task.done));
    setShowCompleted(false);
  };

  /**La logica de useEffect es ejecutarse solo si en lo que esta basado cambia, en este caso si cambia taskItems, el useEffect ejecuta el codigo */
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksItems));
  }, [tasksItems]);

  return (
    <main className="bg-dark vh-100 text-white">
      {/**Container solo centra */}
      <div className="container p-4 col-md-4 offset-md-4">
        {/**Pasamos la funcion de createNewTask al componente TaskCreator */}
        <TaskCreator createNewTask={createNewTask} />
        <TaskTable tasks={tasksItems} toggleTask={toggleTask} />
        <VisibilityControl
          isChecked={showCompleted}
          setShowCompleted={(checked) => setShowCompleted(checked)}
          clearTask={clearTask}
        />
        {showCompleted === true && (
          <TaskTable
            tasks={tasksItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        )}
      </div>
    </main>
  );
}

export default App;

import { TaskRow } from "./TaskRow";

export function TaskTable({ tasks, toggleTask, showCompleted = false}) {

  const taskTableRows = (doneValue) => {
    return (
      tasks
      /**Filtarmos las tareas que ya estan hechas de las que aun no se hacen */
      .filter((task) => task.done === doneValue)
      /**Recorremos el arreglo de tareas con la funcion map, decimos que por cada task enviamos o creamos una <td> en la tabla */
      .map((task) => (
        <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
      ))
    );
  };

  return (
    <table className="table table-dark table-striped table-bordered border-secondary">
      <thead>
        <tr className="table-primary">
          <th>Tasks</th>
        </tr>
      </thead>
      <tbody>{taskTableRows(showCompleted)}</tbody>
    </table>
  );
}

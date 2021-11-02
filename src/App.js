import './App.css';
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from './components/FilterButton';
import React, {useState} from "react";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false};
    setTasks([...tasks, newTask]);
  } 
   function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      //Si la tâche a le même ID
      if(id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
   }
   function editTask(id, newName){
     const editedTaskList = tasks.map(task => {
       if (id === task.id) {
         return {... task, name: newName}
       }
       return task;
     });
     setTasks(editedTaskList);
   }
   function deleteTask(id) {
     const remainingTasks = tasks.filter(task => id !== task.id);
     setTasks(remainingTasks);
   }
  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
      <Todo 
         id={task.id} 
         name={task.name} 
         completed={task.completed} 
         key={task.id}
         toggleTaskCompleted={toggleTaskCompleted}
         editTask={editTask}
         deleteTask={deleteTask}
      />
    ));
    const filterList = FILTER_NAMES.map(name =>(
      <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter}/>
    ));
   const tasksNoun = taskList.length !== 1 ? 'tâches' : 'tâche';
   const headingText = `${taskList.length} ${tasksNoun} a faire`;
 
  return (
    <div className="todoapp stack-large">
      <h1>TodoList</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
       {filterList}
      </div>
      <h2 id="list-heading">
         {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
        >
         {taskList}
        </ul>
    </div>
  );
}

export default App;
 //L'attribut htmlFor correspond a l'attribut for utiliser en HTML. On ne peut l'utiliser en JSX car for est un mot reserver //
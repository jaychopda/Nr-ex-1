import { useState } from 'react'

function App() {
  const [task, setTask] = useState<{name: string; status: string}[]>([]);
  const [newTask, setNewTask] = useState({name: '', status: 'Inprogress'});

  function handleSubmit(e:any) {
    e.preventDefault();
    console.log("Form submitted");
    newTask.name = e.target[0].value;
    e.target[0].value = '';
    setTask([...task, newTask]);
    setNewTask({name: '', status: 'Inprogress'});
    localStorage.setItem('tasks', JSON.stringify([...task, newTask]));
  }

  onload = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTask(JSON.parse(storedTasks));
    }
  }

  
  function LoadAllTask(){    
    return (
    <>
    <table border={1}>
      <thead>
        <tr>
        <th>Task</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      {task.map((t, index) => (
        <tr key={index}>
          <td>{t.name}</td>
          <td>
            <select 
              name="statusUpdate" 
              id="statusUpdate"
              value={t.status}
              onChange={(e) => {
                const updatedTasks = [...task];
                updatedTasks[index].status = e.target.value;
                setTask(updatedTasks);
              }}
            >
              <option value="Complete">Complete</option>
              <option value="Inprogress">Inprogress</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
    </>
    )
  }

  return (
    <>
      <h2>Todo-app</h2>
      <LoadAllTask />
      <br /><br />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter task" />
        <button type="submit">Add Task</button>
      </form>
    </>
  )
}

export default App

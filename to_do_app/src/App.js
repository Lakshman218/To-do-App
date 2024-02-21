import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [toDos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []) // Retrieve todos from local storage

  const [toDo, setTodo] = useState('') 

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(toDos));
  }, [toDos]); // useEffect to update local storage whenever todos changes

  const handledelete = (id) => {
    setTodos(toDos.filter((obj) => obj.id !== id))
  }

  return (
    <div className="App">
      <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>  
      <div className="subHeading">
        <br />
        <h2>Welcome to Your ToDo List! 📝</h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e) => setTodo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={() => setTodos([...toDos, {id:Date.now(), text: toDo, status:false, timestamp: new Date().toLocaleTimeString()}])} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        { toDos.map((obj) => {
          return (
          <div className="todo">
            <div className="left">
              <input onChange={(e) =>  {
                console.log(e.target.checked);
                console.log(obj);
                setTodos(toDos.filter(obj2=> {
                  if(obj2.id === obj.id) {
                    obj2.status = e.target.checked
                  }
                  return obj2
                }))
              }} value = {obj.status} type="checkbox" name="" id="" />
              <p>{obj.text}</p>
            </div>
            <div className="right">
              <i onClick={() => handledelete(obj.id)} className="fas fa-times"></i>
            </div>
          </div>
          )
          })
        }

        {
          toDos.map((obj) => {
            if(obj.status) {  
              return (<h1>{obj.text}</h1>)
            }
            return null
          })
        }

      </div>
    </div>
    </div>
  );
}

export default App;

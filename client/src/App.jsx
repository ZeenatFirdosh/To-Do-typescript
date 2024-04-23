import { useEffect, useState } from "react";
import Todo from "./Todo";

const BASE_URL = "http://localhost:5000";

export default function App() {
  console.log(process.env.REACT_APP_SERVER,"process.env.REACT_APP_SERVER");
  const [todos, setTodos] = useState([]);
  console.log(todos,"todos");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  async function getTodos() {
    const res = await fetch(`${process.env.REACT_APP_SERVER}/todos`,{
      headers: {
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true 
      }
 });
    const todos = await res.json();
    console.log(todos, 'todos getTodos');
    setTodos(todos.todos);
  }
  useEffect(() => {
    // async function getTodos() {
    //   const res = await fetch(`${process.env.REACT_APP_SERVER}/todos`);
    //   const todos = await res.json();  
    //   setTodos(todos.todos);
    // }
    getTodos();
  }, []);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (title.length > 3) {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/todos`, {
        method: "POST",
        body: JSON.stringify({ title,desc }),
        headers: {
          "Access-Control-Allow-Origin" : "*", 
          "Access-Control-Allow-Credentials" : true,
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();
      console.log(newTodo,"newTodo");
      setTitle("");
      setDesc("");
      setTodos([...todos, newTodo.result]);
    }
  }

  return (
    <main className="container">
      <h1 className="title">Todos</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title..."
        className="form__input"
        required 
        />
        <input 
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Enter Description..."
        className="form__input"
        required 
        />
        <button className="form__button" type="submit">Create Todo</button>
      </form>
      <div className="todos">
        {(todos.length > 0) &&
          todos.map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos} getTodos={getTodos}  />
          ))
        }
      </div>
    </main>
  );
}

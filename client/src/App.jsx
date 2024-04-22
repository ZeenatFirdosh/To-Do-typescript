import { useEffect, useState } from "react";
import Todo from "./Todo";

const BASE_URL = "http://localhost:5000";

export default function App() {
  const [todos, setTodos] = useState([]);
  console.log(todos,"todos");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  async function getTodos() {
    const res = await fetch(`${BASE_URL}/todos`);
    const todos = await res.json();
    setTodos(todos.todos);
  }
  useEffect(() => {
    async function getTodos() {
      const res = await fetch(`${BASE_URL}/todos`);
      const todos = await res.json();
  
      setTodos(todos.todos);
    }
    getTodos();
  }, [todos]);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (title.length > 3) {
      const res = await fetch("/todos", {
        method: "POST",
        body: JSON.stringify({ title,desc }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();

      setTitle("");
      setDesc("");
      setTodos([...todos, newTodo]);
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

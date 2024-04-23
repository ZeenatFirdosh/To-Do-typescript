
const BASE_URL = 'http://localhost:5000'
export default function Todo(props) {
    const { todo, setTodos } = props;
    console.log(process.env.REACT_APP_SERVER,"process.env.REACT_APP_SERVER");
    const updateTodo = async (todoId, todoStatus) => {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/api/todos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todoStatus }),
            headers: {
                "Access-Control-Allow-Origin" : "*", 
                "Access-Control-Allow-Credentials" : true,
                "Content-Type": "application/json"
              }
        });

        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, status: !currentTodo.status };
                    }
                    return currentTodo;
                });
            });
        }
    };

    const deleteTodo = async (todoId) => {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/todos/${todoId}`, {
            method: "DELETE"
        });
        const json = await res.json();
        console.log(json, "todo json deleteTodo");
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.filter((currentTodo) => (currentTodo._id !== todoId));
            })            
            props.getTodos();            
        }
    };

    return (
        <div className="todo">
            <p>{todo.title}</p>
            <p>{todo.desc}</p>
            <div className="mutations">
                
                <button
                    className="todo__delete"
                    onClick={() => deleteTodo(todo._id)}
                >
                    🗑️
                </button>
            </div>
        </div>
    )
}
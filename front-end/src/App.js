import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";



function App() {
  return (
   <TodoProvider>
      <div className="container">
          <h1 className="app-title">My Todo</h1>
          <AddTodo/>
          <TodoList/>
      </div>
   </TodoProvider>
  )
}

export default App;

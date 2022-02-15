import Reacr, { createContext, useState, useContext } from "react";

// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => todo.id === id ? {...todo, done: !todo.done} : todo);

export const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

export const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

//create context for todos

const useTodos = (initial: Todo[]) => {
  const [todos, setTodos] = useState<Todo[]>(initial)
  const [newTodo,setNewTodo] = useState("")
  console.log(todos);
  

  return{
    todos,
    newTodo,
    setNewTodo,
    addTodo () {
      setTodos(prev => addTodo(prev, newTodo))
      setNewTodo("")
    },
    removeTodo(id: number){
      setTodos(prev => removeTodo(prev, id))
    },
    toggleTodo(id: number){
      setTodos(prev => toggleTodo(prev, id))
    },
    updateTodo(id: number, text: string){
      setTodos(prev => updateTodo(prev, id, text))
    },
    load(loadTodo: Todo[]){
      setTodos(loadTodo)
    }
  }
}

type UseTodosType = ReturnType<typeof useTodos> ;

export const TodoContext = createContext<UseTodosType | null>(null)

export const useTodoContext = () => useContext(TodoContext) !;


export const TodosContextProvider = ({ children } : { children: React.ReactNode }) => (
  <TodoContext.Provider value={useTodos([])}>
    {children}
  </TodoContext.Provider>
)

  
  

   
  



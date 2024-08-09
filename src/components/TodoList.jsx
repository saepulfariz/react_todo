import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const API_URL = import.meta.env.VITE_API_URL;

const TodoList = ({ isRefresh, setRefresh }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // memanggil API untuk mengambil data todos
    if (isRefresh) {
      fetch(API_URL + "/todos")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);
          // ketika Rest API sukses, simpan data dari response ke dalam state lokal
          setTodos(data);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  return (
    <ul id="todo-list">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh} />
      ))}
    </ul>
  );
};

export default TodoList;

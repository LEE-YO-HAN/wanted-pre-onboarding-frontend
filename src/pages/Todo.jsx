import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TodoCards } from "../components/Todo/TodoCards";
import { todoAPI } from "../api/api";

export default function Todo() {
  const navigate = useNavigate();

  // redirect
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }
  }, []);

  // add todo data
  const [newTodo, setNewTodo] = useState("");
  const newFormData = {
    todo: newTodo,
  };

  // append data for state
  const [appendNew, setAppendNew] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await todoAPI.createTodo(newFormData).then((res) => {
        setAppendNew(res?.data);
        setNewTodo("");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <p>TodoList</p>
        <p>Add your todos</p>
      </div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
        />
        <button type="submit">add todo</button>
      </form>
      <TodoCards appendNew={appendNew} />
    </div>
  );
}

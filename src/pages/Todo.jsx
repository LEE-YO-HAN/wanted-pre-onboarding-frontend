import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Todo() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }
  }, []);
  return (
    <div>
      <div>
        <p>TodoList</p>
        <p>Add your todos</p>
      </div>
      <form>
        <input type="text" />
        <button type="submit">add todo</button>
      </form>
      <div></div>
    </div>
  );
}

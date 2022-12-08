import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TodoCards } from "../components/Todo/TodoCards";
import { todoAPI } from "../api/api";
import styled from "styled-components";

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
    <Container>
      <TodoListHeader>
        <p>TodoList</p>
        <p>Add your todos</p>
        <p>오늘 할 일을 마무리했다면, 진행중 버튼을 눌러 완료해보세요.</p>
      </TodoListHeader>
      <AddTodoForm onSubmit={submitHandler}>
        <input
          type="text"
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
        />
        <button type="submit">add todo</button>
      </AddTodoForm>
      <TodoCards appendNew={appendNew} />
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  width: 80vw;
`;

const TodoListHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0 50px 0;
  & p:first-child {
    font-size: 50px;
    font-weight: bold;
  }
`;

const AddTodoForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  & input {
    margin-right: 20px;
    width: 35vw;
    height: 40px;
    border: 1px solid lightgray;
    border-radius: 10px;
    transition: 0.4s;
    font-size: 20px;
    &:focus {
      border: 2px solid lightgray;
      outline-color: lightgray;
      transition: 0.4s;
    }
  }
  & button {
    cursor: pointer;
    margin: 0 10px 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10vw;
    height: 40px;
    border: 1px solid gray;
    border-radius: 10px;
    transition: 0.6s;
    background-color: #ebebeb;
    font-size: 20px;
    font-weight: bold;
    transition: 0.4s;
    &:hover {
      background-color: #b3b3b3;
    }
  }
`;

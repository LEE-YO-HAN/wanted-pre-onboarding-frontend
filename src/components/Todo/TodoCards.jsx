import { useState, useEffect } from "react";
import { todoAPI } from "../../api/api";
import styled from "styled-components";

export const TodoCards = (appendNew) => {
  // get todos data
  const [todoData, setTodoData] = useState();
  const getTodoAPI = async () => {
    try {
      const data = await todoAPI.getTodos().then((res) => {
        setTodoData(res?.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // new data fetch through Dependency(appendNew)
  useEffect(() => {
    getTodoAPI();
  }, [appendNew]);

  // delete API
  const deleteTodoAPI = async (id) => {
    if (window.confirm("삭제할까요?")) {
      try {
        await todoAPI.deleteTodo(id);
        setTodoData(todoData.filter((item) => item.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  // edit mode (match for index)
  const [editMode, setEditMode] = useState("");

  // edit data / with send
  const [editInput, setEditInput] = useState("");

  // update API
  const updateAPI = async (e, id, isCompleted, prevTodo) => {
    e.preventDefault();
    try {
      const editFormData = {
        todo: editInput === "" ? prevTodo : editInput,
        isCompleted: isCompleted,
      };
      await todoAPI.updateTodo(id, editFormData);
      setTodoData(
        todoData.map((item) => {
          return item.id !== id
            ? item
            : { ...item, todo: editFormData.todo, isCompleted: isCompleted };
        })
      );
      setEditMode("");
      setEditInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {todoData?.map((item, index) => {
        if (editMode === index) {
          return (
            <CardBox key={item?.id}>
              <Options>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setEditInput("");
                  }}
                  style={{ width: "80px" }}
                >
                  수정취소
                </button>
              </Options>
              <form onSubmit={(e) => updateAPI(e, item?.id, item?.isCompleted)}>
                <span>작성자: {item?.userId}</span>
                <input
                  onChange={(e) => setEditInput(e.target.value)}
                  type="text"
                  defaultValue={item?.todo}
                />
                <span>
                  <button type="submit">수정완료</button>
                </span>
              </form>
            </CardBox>
          );
        } else {
          return (
            <CardBox
              key={item?.id}
              style={item?.isCompleted ? { backgroundColor: "gray" } : null}
            >
              <Options>
                <button onClick={() => setEditMode(index)}>수정</button>
                <button onClick={() => deleteTodoAPI(item?.id)}>삭제</button>
              </Options>
              <div>
                <span>작성자: {item?.userId}</span>
                <div>{item?.todo}</div>
              </div>
              <DoingBtnWrap>
                <button
                  onClick={(e) =>
                    updateAPI(
                      e,
                      item?.id,
                      item?.isCompleted ? false : true,
                      item?.todo
                    )
                  }
                >
                  {item?.isCompleted ? "완료!" : "진행중..."}
                </button>
              </DoingBtnWrap>
            </CardBox>
          );
        }
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardBox = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 50vw;
  height: 130px;
  border: 3px solid lightgray;
  border-radius: 10px;
  transition: 0.6s;

  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
    & input {
      margin-right: 20px;
      width: 30vw;
      height: 25px;
      border: 1px solid lightgray;
      border-radius: 5px;
      transition: 0.4s;
      &:focus {
        border: 2px solid lightgray;
        outline-color: lightgray;
        transition: 0.4s;
      }
    }
    & span:last-child {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
      width: 45vw;

      & button {
        cursor: pointer;
        margin: 0 3px 0 3px;
        width: 80px;
        height: 25px;
        background-color: white;
        border-radius: 10px;
        border: 1px solid lightgray;
        transition: 0.4s;
        &:hover {
          background-color: #ebebeb;
        }
      }
    }
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 45vw;
  & button {
    cursor: pointer;
    margin: 0 3px 0 3px;
    width: 50px;
    height: 25px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid lightgray;
    transition: 0.4s;
    &:hover {
      background-color: #ebebeb;
    }
  }
`;

const DoingBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 45vw;
  & button {
    cursor: pointer;
    width: 80px;
    height: 30px;
    background-color: white;
    border-radius: 10px;
    border: 3px solid lightgray;
    transition: 0.4s;
    &:hover {
      background-color: #ebebeb;
    }
  }
`;

import { useState, useEffect } from "react";
import { todoAPI } from "../../api/api";
import styled from "styled-components";

export const TodoCards = (appendNew) => {
  console.log("어펜드 뉴 새로 받았음", appendNew);

  // get todos data
  const [todoData, setTodoData] = useState();
  const getTodoAPI = async () => {
    try {
      const data = await todoAPI.getTodos().then((res) => {
        console.log(res);
        setTodoData(res?.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log("API 요청 데이터", todoData);

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

  // update completed
  //   const updateCompleted =async (id, isCompleted ,prevTodo)=>{
  //     try {
  //         const editFormData = {
  //             todo: editInput,
  //             isCompleted: isCompleted,
  //         }
  //         const data = await todoAPI.updateTodo(id,)
  //     } catch (error) {
  //         console.log(error)
  //     }
  //   }

  return (
    <div>
      {todoData?.map((item, index) => {
        if (editMode === index) {
          return (
            <div key={item?.id}>
              <div>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setEditInput("");
                  }}
                >
                  수정취소
                </button>
              </div>
              <form onSubmit={(e) => updateAPI(e, item?.id, item?.isCompleted)}>
                <span>작성자: {item?.userId}</span>
                <input
                  onChange={(e) => setEditInput(e.target.value)}
                  type="text"
                  defaultValue={item?.todo}
                />
                <button type="submit">수정완료</button>
              </form>
            </div>
          );
        } else {
          return (
            <div key={item?.id}>
              <div>
                <button onClick={() => setEditMode(index)}>수정</button>
                <button onClick={() => deleteTodoAPI(item?.id)}>삭제</button>
              </div>
              <div>
                <span>작성자: {item?.userId}</span>
                <div>{item?.todo}</div>
              </div>
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
            </div>
          );
        }
      })}
    </div>
  );
};

import { Route, Routes } from "react-router-dom";
import Sign from "../pages/Sign";
import Todo from "../pages/Todo";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Sign />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
};

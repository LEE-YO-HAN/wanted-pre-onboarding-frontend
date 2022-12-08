import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SignUp } from "../components/Sign/SignUp";
import { signAPI } from "../api/api";

export default function Sign() {
  const navigate = useNavigate();

  // redirect
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      navigate("/todo");
    }
  }, []);

  // Email/PW state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // formData
  const newFormData = {
    email: email,
    password: password,
  };

  // signin button
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // const data = await axios
      //   .post(
      //     "https://pre-onboarding-selection-task.shop/auth/signin",
      //     newFormData
      //   )
      const data = await signAPI.goSignIn(newFormData).then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          navigate("/todo");
        }
      });
    } catch (error) {
      alert("Email/PW를 다시 확인해주세요!");
    }
  };

  return (
    <div>
      <div>Hello todo</div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type="text" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div>
          <button>로그인</button>
        </div>
      </form>
      <SignUp />
      <div>
        <ul>
          <li>로그인</li>
          <li>회원가입</li>
        </ul>
      </div>
    </div>
  );
}

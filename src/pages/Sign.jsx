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
      const data = await signAPI.goSignIn(newFormData).then((res) => {
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          navigate("/todo");
        }
      });
    } catch (error) {
      alert("Email/PW를 다시 확인해주세요!");
    }
  };

  // Nav button handler
  const [signInTap, setSignInTap] = useState(true);
  const goSignUp = () => {
    setSignInTap(false);
  };
  const goLogin = () => {
    setSignInTap(true);
  };

  return (
    <Container>
      <Greeting>Hello todo</Greeting>
      {signInTap ? (
        <FormWrap onSubmit={submitHandler}>
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
        </FormWrap>
      ) : (
        <SignUp goLogin={goLogin} />
      )}
      <NavBtn>
        <ul>
          <li
            onClick={goLogin}
            style={signInTap ? { backgroundColor: "lightgray" } : null}
          >
            로그인
          </li>
          <li
            onClick={goSignUp}
            style={!signInTap ? { backgroundColor: "lightgray" } : null}
          >
            회원가입
          </li>
        </ul>
      </NavBtn>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  margin-top: 10vh;
  margin-bottom: 10vh;
  width: 480px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 1px 1px 7px 1px gray;
  border-radius: 10px;
`;

const Greeting = styled.div`
  margin: 50px 0 10px 0;
  font-size: 50px;
  font-weight: bold;
`;

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 450px;

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    width: 400px;
  }
  & label {
    width: 80px;
    text-align: center;
  }
  & input {
    width: 200px;
    height: 30px;
    border: none;
    border-bottom: 2px solid lightgray;
    transition: 0.4s;
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
    width: 230px;
    height: 40px;
    border: 1px solid gray;
    border-radius: 10px;
    transition: 0.6s;
    background-color: lightgray;
    font-size: 20px;
    transition: 0.4s;
    &:hover {
      background-color: #b3b3b3;
    }
  }
`;

const NavBtn = styled.div`
  display: flex;
  justify-content: center;

  & ul {
    list-style: none;
    padding: 0;
    display: flex;
    & li {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 30px;
      border: 1px solid gray;
      transition: 0.6s;
      &:first-child {
        border-radius: 12px 0px 0px 12px;
      }
      &:last-child {
        border-radius: 0px 12px 12px 0px;
      }
      &:hover {
        background-color: #b3b3b3;
      }
    }
  }
`;

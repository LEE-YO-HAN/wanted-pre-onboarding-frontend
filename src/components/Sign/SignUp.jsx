import { useState, useEffect } from "react";
import { signAPI } from "../../api/api";
import styled from "styled-components";

export const SignUp = ({ goLogin }) => {
  // Email/PW state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Email/PW confirm
  const [checkEmail, setCheckEmail] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [equalPassword, setEqualPassword] = useState("");

  // disabled button
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    checkEmail && checkPassword && equalPassword
      ? setDisabled(false)
      : setDisabled(true);
  }, [checkEmail, checkPassword, equalPassword]);

  // Email confirm
  // useEffect(() => {
  //   email.indexOf("@") === -1 || email.indexOf(".") === -1
  //     ? setCheckEmail(false)
  //     : setCheckEmail(true);
  // }, [email]);

  // Email confirm Regex
  useEffect(() => {
    const emailRegex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    emailRegex.test(email) ? setCheckEmail(true) : setCheckEmail(false);
  }, [email]);
  // PW confirm
  useEffect(() => {
    password.length < 8 ? setCheckPassword(false) : setCheckPassword(true);
    confirmPassword === password
      ? setEqualPassword(true)
      : setEqualPassword(false);
  }, [password, confirmPassword]);

  // formData
  const newFormData = {
    email: email,
    password: password,
  };

  const handleSingUp = async () => {
    try {
      const data = await signAPI.goSignUp(newFormData).then((res) => {
        if (res.status === 201) {
          alert("회원가입이 완료되었습니다!");
          goLogin();
        }
      });
    } catch (error) {
      alert("사용 불가한 이메일입니다.");
    }
  };

  return (
    <FormWrap>
      <div>
        <label htmlFor="">Email</label>
        <input onChange={(e) => setEmail(e.target.value)} type="text" />
      </div>
      <p style={checkEmail ? { color: "#66cf66" } : { color: "red" }}>
        {checkEmail ? "올바른 이메일" : "올바른 이메일 형식이 아닙니다."}
      </p>
      <div>
        <label htmlFor="">Password</label>
        <input onChange={(e) => setPassword(e.target.value)} type="password" />
      </div>
      <p style={checkPassword ? { color: "#66cf66" } : { color: "red" }}>
        {checkPassword
          ? "사용 가능한 비밀번호입니다."
          : "비밀번호는 8자리 이상 입력해주세요."}
      </p>
      <div>
        <label htmlFor="">confirm</label>
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
        />
      </div>
      <p style={equalPassword ? { color: "#66cf66" } : { color: "red" }}>
        {equalPassword
          ? "동일한 비밀번호입니다."
          : "비밀번호가 일치하지 않습니다."}
      </p>
      <button
        onClick={handleSingUp}
        disabled={disabled}
        style={
          disabled ? { backgroundColor: "#cecece", cursor: "default" } : null
        }
        type="button"
      >
        회원가입
      </button>
    </FormWrap>
  );
};

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
    margin-bottom: 10px;
    width: 400px;
  }
  & p {
    font-size: 12px;
    margin-left: 80px;
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

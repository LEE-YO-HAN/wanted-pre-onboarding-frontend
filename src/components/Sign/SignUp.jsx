import { useState, useEffect } from "react";
import { signAPI } from "../../api/api";

export const SignUp = () => {
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
  useEffect(() => {
    email.indexOf("@") === -1 || email.indexOf(".") === -1
      ? setCheckEmail(false)
      : setCheckEmail(true);
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
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="">Email</label>
        <input onChange={(e) => setEmail(e.target.value)} type="text" />
      </div>
      <p style={checkEmail ? { display: "none" } : null}>
        올바른 이메일 형식이 아닙니다.
      </p>
      <div>
        <label htmlFor="">Password</label>
        <input onChange={(e) => setPassword(e.target.value)} type="password" />
      </div>
      <p style={checkPassword ? { display: "none" } : null}>
        비밀번호는 8자리 이상 입력해주세요.
      </p>
      <div>
        <label htmlFor="">confirm</label>
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
        />
      </div>
      <p style={equalPassword ? { display: "none" } : null}>
        비밀번호가 일치하지 않습니다.
      </p>
      <button onClick={handleSingUp} disabled={disabled} type="button">
        회원가입
      </button>
    </form>
  );
};

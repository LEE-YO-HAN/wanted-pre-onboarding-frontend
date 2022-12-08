import styled from "styled-components";
import { SignUp } from "../components/Sign/SignUp";

export default function Sign() {
  // localStorage.setItem("access_token", res.data.access_token);

  return (
    <div>
      <div>Hello todo</div>
      <form>
        <div>
          <label htmlFor="">Email</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" />
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

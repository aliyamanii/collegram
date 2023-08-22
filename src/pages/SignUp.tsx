import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import logo from "../photos/logo.png";
import tree from "../photos/tree.png";

function SignUp() {
  return (
    <>
      <div className="app__container w-full h-500 top-0 bg-red-500 text-center flex flex-col items-center justify-center">
        <img src={logo} className="logo" alt="Rahnema Logo"></img>
        <section className="switch-mode">
          <Link to="/signup" className="signup__button">
            ثبت نام در کالج گرام
          </Link>
          <Link to="/login" className="login__button">
            ورود به کالج گرام
          </Link>
        </section>
        <form className="signup__form">
          <input
            type="text"
            placeholder="نام کاربری"
            className="username__input text-input bg-red-500"
          ></input>
          <input
            type="text"
            placeholder="ایمیل"
            className="email__input text-input"
          ></input>
          <input
            type="text"
            placeholder="رمز عبور"
            className="password__input text-input"
          ></input>
          <input
            type="text"
            placeholder="تکرار رمز عبور"
            className="confirm-password__input text-input"
          ></input>
          <button className="submit__button">ثبت نام</button>
        </form>
      </div>
      <img src={tree} className="tree" alt="Tree"></img>
    </>
  );
}

export default SignUp;

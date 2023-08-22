import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../photos/logo.png";
import tree from "../photos/tree.png";

function Login() {
  return (
    <>
      <div className="app__container">
        <img src={logo} className="logo" alt="Rahnema Logo"></img>
        <section className="switch-mode">
          <Link to="/signup" className="signup__button">
            ثبت نام در کالج گرام
          </Link>
          <Link to="/login" className="login__button">
            ورود به کالج گرام
          </Link>
        </section>
        <form className="login__form">
          <input
            type="text"
            placeholder="نام کاربری یا ایمیل"
            className="username__input text-input"
          ></input>
          <input
            type="text"
            placeholder="رمز عبور"
            className="password__input text-input"
          ></input>
          <section className="remember__section">
            <text className="remember__text">من را به خاطر بسپار</text>
            <input type="checkbox" className="remember__checkbox"></input>
          </section>
          <button className="submit__button">ورود</button>
          <section className="other-options">
            <Link to="/recoverpassword" className="recoverpassword__link">
              رمز عبورم رو فراموش کردم
            </Link>
            <Link to="/signup" className="signup__link">
              ثبت نام در کالج گرام
            </Link>
          </section>
        </form>
      </div>
      <img src={tree} className="tree" alt="Tree"></img>
    </>
  );
}

export default Login;

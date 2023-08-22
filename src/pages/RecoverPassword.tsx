import React from "react";
import { Link } from "react-router-dom";
import "./RecoverPassword.css";
import logo from "../photos/logo.png";
import tree from "../photos/tree.png";

function RecoverPassword() {
  return (
    <>
      <div className="app__container">
        <img src={logo} className="logo" alt="Rahnema Logo"></img>
        <text className="title">بازیابی رمز عبور</text>
        <form className="recover__form">
          <input
            type="text"
            placeholder="نام کاربری یا ایمیل"
            className="username__input text-input"
          ></input>
          <section className="buttons">
            <button className="submit__button">
              ارسال لینک بازیابی رمز عبور
            </button>
            <Link to="/login" className="cancel__link">
              انصراف
            </Link>
          </section>
        </form>
      </div>
      <img src={tree} className="tree" alt="Tree"></img>
    </>
  );
}

export default RecoverPassword;

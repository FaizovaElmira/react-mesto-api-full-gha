import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ handleRegistration }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegistration(formValue);
  };

  return (
    <div className="auth">
      <h2 className="auth__subtitle">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          required
          name="email"
          type="email"
          value={formValue.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="auth__input"
          required
          name="password"
          type="password"
          value={formValue.password}
          placeholder="Пароль"
          onChange={handleChange}
        />
        <button className="auth__button-submit" type="submit">
          Зарегистрироваться
        </button>
        <Link className="auth__signin-link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
};

export default Register;

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const initialState = {
  email: "",
  password: "",
  rememberMe: false,
};

const LoginView = () => {
  const [form, setForm] = useState(initialState);
  const { logIn } = useContext(AuthContext);

  useEffect(() => {
    const storedRememberMe = !!localStorage.getItem("rememberMe");
    if (storedRememberMe) {
      setForm((form) => ({
        ...form,
        email: localStorage.getItem("email") ?? initialState.email,
        rememberMe: storedRememberMe,
      }));
    }
  }, []);

  const onChange = (event) => {
    const { name: inputName, value } = event.target;
    setForm({
      ...form,
      [inputName]: value,
    });
  };

  const onToggleRemember = () => {
    setForm({
      ...form,
      rememberMe: !form.rememberMe,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (form.rememberMe) {
      localStorage.setItem("email", form.email);
      localStorage.setItem("rememberMe", form.rememberMe);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("rememberMe");
    }

    logIn({ email: form.email, password: form.password });
  };

  return (
    <>
      <form
        className="login100-form validate-form flex-sb flex-w"
        onSubmit={onSubmit}
      >
        <span className="login100-form-title mb-3">Chat - Log In</span>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="row mb-3">
          <div className="col" onClick={onToggleRemember}>
            <input
              className="input-checkbox100"
              id="ckb1"
              type="checkbox"
              name="rememberMe"
              readOnly
              checked={form.rememberMe}
            />
            <label className="label-checkbox100">Remember me</label>
          </div>

          <div className="col text-right">
            <Link to="/auth/register" className="txt1">
              Register new account
            </Link>
          </div>
        </div>

        <div className="container-login100-form-btn m-t-17">
          <button className="login100-form-btn">Log in</button>
        </div>
      </form>
    </>
  );
};

export default LoginView;

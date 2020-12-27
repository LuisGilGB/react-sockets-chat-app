import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AutoCompleteContext } from "../context/AutoCompleteContext";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const RegisterView = () => {
  const { register } = useContext(AuthContext);
  const { autoComplete } = useContext(AutoCompleteContext);
  const [form, setForm] = useState(initialState);

  const onChange = (event) => {
    const { name: inputName, value } = event.target;
    setForm({
      ...form,
      [inputName]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    register({ name: form.name, email: form.email, password: form.password });
  };

  return (
    <>
      <form
        className="login100-form validate-form flex-sb flex-w"
        onSubmit={onSubmit}
      >
        <span className="login100-form-title mb-3">Chat - Register</span>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="text"
            name="name"
            placeholder="Name"
            autoComplete={autoComplete}
            value={form.name}
            onChange={onChange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="email"
            name="email"
            placeholder="Email"
            autoComplete={autoComplete}
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
            autoComplete={autoComplete}
            value={form.password}
            onChange={onChange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="row mb-3">
          <div className="col text-right">
            <Link to="/auth/login" className="txt1">
              Already have an account?
            </Link>
          </div>
        </div>

        <div className="container-login100-form-btn m-t-17">
          <button
            type="submit"
            className="login100-form-btn"
            disabled={
              !(
                form.name?.length &&
                form.email?.length &&
                form.password?.length
              )
            }
          >
            Create account
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterView;

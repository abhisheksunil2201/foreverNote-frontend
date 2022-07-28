import React, { useContext, useState } from "react";
import { Button, Form, Icon } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import HomeNav from "../components/HomeNav";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import "../styles/Login.css";

function Login() {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push("/notebooks");
    },
    onError(err) {
      setErrors(err && err?.graphQLErrors[0]?.extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback(event) {
    loginUser();
  }

  return (
    <>
      <HomeNav />
      <div className="login">
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <h1>Login</h1>
          <Form.Input
            label="Username"
            placeholder="Username.."
            style={{ color: "#fff !important" }}
            name="username"
            type="text"
            error={errors.username ? true : false}
            value={values.username}
            onChange={onChange}
            className="formInput"
          />
          <Form.Input
            label="Password"
            placeholder="Password.."
            name="password"
            type={showPassword ? "text" : "password"}
            error={errors.password ? true : false}
            value={values.password}
            onChange={onChange}
            icon={
              <Icon
                onClick={() => setShowPassword(!showPassword)}
                name={showPassword ? "eye slash" : "eye"}
              />
            }
            className="formInput"
          />
          <Button type="submit" primary>
            Login
          </Button>
          <p className="login__registerLink">
            Don't have an account? <Link to="/register">Join Now</Link>
          </p>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;

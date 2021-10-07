import React, { useContext, useState } from "react";
import { Button, Form, Icon } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";

import HomeNav from "../components/HomeNav";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

function Register() {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      history.push("/notebooks");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <>
      <HomeNav />
      <div className="register">
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <h1>Register</h1>
          <Form.Input
            label="Username"
            placeholder="Username.."
            name="username"
            type="text"
            error={errors.username ? true : false}
            value={values.username}
            onChange={onChange}
            className="formInput"
          />
          <Form.Input
            label="Email"
            placeholder="Email.."
            name="email"
            type="email"
            error={errors.email ? true : false}
            value={values.email}
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
          <Form.Input
            label="Confirm Password"
            placeholder="Confirm Password.."
            name="confirmPassword"
            type={showPassword1 ? "text" : "password"}
            icon={
              <Icon
                onClick={() => setShowPassword1(!showPassword1)}
                name={showPassword1 ? "eye slash" : "eye"}
              />
            }
            error={errors.confirmPassword ? true : false}
            value={values.confirmPassword}
            onChange={onChange}
            className="formInput"
          />
          <Button type="submit" primary>
            Register
          </Button>
          <p className="login__registerLink">
            Already have an account? <Link to="/register">Sign In here</Link>
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;

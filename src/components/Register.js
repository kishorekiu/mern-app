import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  let [err, setErr] = useState({
    isError: false,
    errMsg: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onFormSubmit = async (userObj) => {
    let res = await axios.post("/user/create-user", userObj);
    if (res.data.message === "User Created") {
      navigate("/login");
    } else {
      setErr({ ...err, errMsg: res.data.message, isError: true });
    }
  };
  return (
    <div className="container">
      <h3 className="fs-3 text-info text-center">Register</h3>
      <Form
        onSubmit={handleSubmit(onFormSubmit)}
        className="col-12 col-sm-8 col-md-6 mx-auto"
      >
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            {...register("username", {
              required: true,
              minLength: 4,
              maxLength: 30,
            })}
          />
          {errors.username?.type === "required" && (
            <p className="text-danger">please enter username</p>
          )}
          {errors.username?.type === "minLength" && (
            <p className="text-danger">min length 4 chars</p>
          )}
          {errors.username?.type === "maxLength" && (
            <p className="text-danger">max length 30 chars</p>
          )}
        </Form.Group>
        <h4 className="text-danger">{err.errMsg}</h4>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 16,
              pattern: /^[a-zA-Z0-9!@#$%^&*]{8,16}$/,
            })}
          />
          {errors.password?.type === "required" && (
            <p className="text-danger">Please enter password</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-danger">enter atleast 8 characters</p>
          )}
          {errors.password?.type === "maxLength" && (
            <p className="text-danger">max length 16 chars</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-danger">pattern allowed [a-zA-z0-9!@#$%^&*]</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" {...register("email")} />
        </Form.Group>
        <Button type="submit" variant="dark">
          register
        </Button>
      </Form>
    </div>
  );
}
export default Register;

import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userThunk } from "../slices/userSlice";

function Login() {
  let { userObj, isSuccess, isError, errMsg } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onFormSubmit = (userObj) => {
    if (userObj.userType === "user") {
      dispatch(userThunk(userObj));
    }
    if (userObj.userType === "admin") {
      alert("admin development in progress");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      navigate(`/userdashboard/${userObj.username}`);
    }
  }, [isSuccess]);
  return (
    <div className="container">
      <h1 className="fs-3 text-info text-center ">Login</h1>
      {isError && <p className="text-danger text-center">{errMsg}</p>}
      <div className="col-12 col-sm-8 col-md-6 mx-auto">
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <Form.Group>
            <Form.Check
              inline
              label="User"
              value="user"
              type="radio"
              {...register("userType", { required: true })}
            />
            <Form.Check
              inline
              label="Admin"
              value="admin"
              type="radio"
              {...register("userType", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              {...register("username", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...register("password", { required: true })}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default Login;

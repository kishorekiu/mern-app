import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import Userdashboard from "./components/Userdashboard";
import { useDispatch, useSelector } from "react-redux";
import { clearLoginStatus } from "./slices/userSlice";
function App() {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.user);
  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearLoginStatus());
  };
  return (
    <div className="">
      <div>
        <Navbar bg="drak" expand="sm" className="bg-dark">
          <Container>
            <Navbar.Brand href="#home" className="text-white">
              MyApp
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {isSuccess === false ? (
                  <>
                    <NavLink
                      to="/"
                      style={{ color: "white" }}
                      className="nav-link"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/register"
                      style={{ color: "white" }}
                      className="nav-link"
                    >
                      Register
                    </NavLink>
                    <NavLink
                      to="/login"
                      style={{ color: "white" }}
                      className="nav-link"
                    >
                      Login
                    </NavLink>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    style={{ color: "white" }}
                    className="nav-link"
                    onClick={logout}
                  >
                    Logout
                  </NavLink>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdashboard/:username" element={<Userdashboard />} />
      </Routes>
    </div>
  );
}

export default App;

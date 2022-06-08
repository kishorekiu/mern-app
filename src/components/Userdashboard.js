import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function Userdashboard() {
  let { userObj } = useSelector((state) => state.user);
  let [data, setData] = useState("");
  const getProtectedData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("/user/test", {
      headers: { Authorization: token },
    });
    setData(response.data.message);
  };
  return (
    <div>
      <p className="fs-3 text-end">Welcome, {userObj.username}</p>
      <Button variant="dark" onClick={getProtectedData}>
        get protected data
      </Button>
      <p className="text-center">{data}</p>
    </div>
  );
}
export default Userdashboard;

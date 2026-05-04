import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

     const handleLogin = async () => {
  console.log("Button Clicked");   // 👈 ADD THIS

  try {
    const res = await API.post("/auth/login", {
      email,
      password
    });

    console.log(res.data);
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");

  } catch (error) {
    console.error(error);
    alert("Login failed");
  }


    if (!email || !password) {
  alert("Enter all fields");
}
    console.log("Password:", password);
  };

     return (
    <div>
      <h2>Login Page</h2>

      <input
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;

import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // ...existing code...
    console.log("Button Clicked");
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
    <div className="login-bg">
      <div className="login-card">
        <h2 className="login-heading">Welcome Back</h2>
        <div className="login-subtext">Sign in to your account</div>
        <form className="login-form" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
          <input
            className="login-input"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button className="login-btn" type="submit" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}


export default Login;

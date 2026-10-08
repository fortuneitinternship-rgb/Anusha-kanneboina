import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <div className="auth-page">

      <div className="auth-box">

        <div className="auth-logo">
          <span>R</span>
          RecyConnect
        </div>

        <h1>Welcome Back</h1>
        <p>Login to continue to your account.</p>

        <form>
          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="auth-bottom">
          Don't have an account?
          <Link to="/register"> Create Account</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;
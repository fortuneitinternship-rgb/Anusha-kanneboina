import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  return (
    <div className="register-page">

      <div className="register-box">

        <div className="register-logo">
          <span>R</span>
          RecyConnect
        </div>

        <h1>Create Account</h1>
        <p>Join the RecyConnect community.</p>

        <form>

          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />

          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" />

          <label>Phone Number</label>
          <input type="text" placeholder="Enter phone number" />

          <label>Password</label>
          <input type="password" placeholder="Create password" />

          <button type="submit">
            Create Account
          </button>

        </form>

        <p className="register-bottom">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;

import { useNavigate } from "react-router-dom";
import "../Login/Login.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/verify-otp");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-logo">
          <span>R</span> RecyConnect
        </div>

        <h1>Forgot Password?</h1>
        <p>Enter your registered email to continue.</p>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
          />

          <button type="submit">Continue</button>
        </form>

        <p className="auth-bottom">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer" }}
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;

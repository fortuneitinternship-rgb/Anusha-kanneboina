
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    // Frontend demonstration only.
    // Connect authentication to your backend later.
    alert("Login form submitted successfully!");
  };

  return (
    <main className="auth-page">
      <section className="auth-box">
        <Link to="/" className="auth-logo">
          <span className="auth-logo-circle">R</span>
          <span>RecyConnect</span>
        </Link>

        <div className="auth-heading">
          <span className="auth-tag">WELCOME BACK</span>
          <h1>Login to your Account</h1>
          <p>
            Access your account and continue your
            sustainable journey with RecyConnect.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="auth-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <div className="auth-label-row">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <label className="remember-option">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) =>
                setRememberMe(event.target.checked)
              }
            />
            <span>Remember Me</span>
          </label>

          <button type="submit" className="auth-submit">
            LOGIN
          </button>
        </form>

        <div className="auth-divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <div className="auth-extra-actions">
          <button
            type="button"
            onClick={() =>
              alert("Google sign-in will be connected later.")
            }
          >
            Google
          </button>

          <button
            type="button"
            onClick={() =>
              alert("Phone sign-in will be connected later.")
            }
          >
            Phone
          </button>
        </div>

        <p className="auth-bottom">
          Don't have an account?
          <Link to="/register"> Create Account</Link>
        </p>

        <div className="auth-footer">
          RecyConnect · Where Waste Finds Its Value
        </div>
      </section>
    </main>
  );
}

export default Login;
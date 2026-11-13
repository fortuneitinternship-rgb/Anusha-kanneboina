
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, within, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import Login from "./Login";

describe("Login Component", () => {
  let alertMock;

  const renderLogin = () => {
    return render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<h1>Home Page</h1>}
          />
          <Route
            path="/forgot-password"
            element={<h1>Forgot Password Page</h1>}
          />
          <Route
            path="/register"
            element={<h1>Register Page</h1>}
          />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the Login component correctly", () => {
    const { container } = renderLogin();

    expect(container.querySelector(".auth-page")).toBeInTheDocument();
    expect(container.querySelector(".auth-box")).toBeInTheDocument();
  });

  it("displays the RecyConnect logo", () => {
    const { container } = renderLogin();

    expect(
      within(container.querySelector(".auth-logo")).getByText("RecyConnect")
    ).toBeInTheDocument();
  });

  it("displays the login heading", () => {
    const { container } = renderLogin();

    expect(
      within(container.querySelector(".auth-heading")).getByRole("heading", {
        name: "Login to your Account",
      })
    ).toBeInTheDocument();
  });

  it("displays the welcome message", () => {
    const { container } = renderLogin();

    expect(
      within(container.querySelector(".auth-heading")).getByText(
        "WELCOME BACK"
      )
    ).toBeInTheDocument();
  });

  it("displays the login description", () => {
    const { container } = renderLogin();

    expect(
      within(container.querySelector(".auth-heading")).getByText(
        /Access your account and continue your sustainable journey/
      )
    ).toBeInTheDocument();
  });

  it("renders the email input field", () => {
    const { container } = renderLogin();
    const email = container.querySelector("#email");

    expect(email).toBeInTheDocument();
    expect(email).toHaveAttribute("type", "email");
    expect(email).toHaveAttribute("required");
    expect(email).toHaveAttribute("autocomplete", "email");
  });

  it("renders the password input field", () => {
    const { container } = renderLogin();
    const password = container.querySelector("#password");

    expect(password).toBeInTheDocument();
    expect(password).toHaveAttribute("type", "password");
    expect(password).toHaveAttribute("required");
    expect(password).toHaveAttribute("autocomplete", "current-password");
  });

  it("allows entering an email address", () => {
    const { container } = renderLogin();
    const email = container.querySelector("#email");

    fireEvent.change(email, {
      target: { value: "test@example.com" },
    });

    expect(email).toHaveValue("test@example.com");
  });

  it("allows entering a password", () => {
    const { container } = renderLogin();
    const password = container.querySelector("#password");

    fireEvent.change(password, {
      target: { value: "TestPassword123" },
    });

    expect(password).toHaveValue("TestPassword123");
  });

  it("shows the password when Show button is clicked", () => {
    const { container } = renderLogin();

    const password = container.querySelector("#password");
    const toggle = within(container).getByRole("button", {
      name: "Show password",
    });

    fireEvent.click(toggle);

    expect(password).toHaveAttribute("type", "text");
    expect(
      within(container).getByRole("button", {
        name: "Hide password",
      })
    ).toBeInTheDocument();
  });

  it("hides the password when Hide button is clicked", () => {
    const { container } = renderLogin();

    fireEvent.click(
      within(container).getByRole("button", {
        name: "Show password",
      })
    );

    fireEvent.click(
      within(container).getByRole("button", {
        name: "Hide password",
      })
    );

    expect(container.querySelector("#password")).toHaveAttribute(
      "type",
      "password"
    );
  });

  it("renders the Remember Me checkbox", () => {
    const { container } = renderLogin();
    const checkbox = container.querySelector(
      '.remember-option input[type="checkbox"]'
    );

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("updates the Remember Me checkbox when clicked", () => {
    const { container } = renderLogin();
    const checkbox = container.querySelector(
      '.remember-option input[type="checkbox"]'
    );

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("allows unchecking Remember Me", () => {
    const { container } = renderLogin();
    const checkbox = container.querySelector(
      '.remember-option input[type="checkbox"]'
    );

    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it("renders the Login submit button", () => {
    const { container } = renderLogin();

    expect(
      within(container).getByRole("button", { name: "LOGIN" })
    ).toBeInTheDocument();
  });

  it("submits the login form and displays a success alert", () => {
    const { container } = renderLogin();

    const form = container.querySelector("form");

    fireEvent.submit(form);

    expect(alertMock).toHaveBeenCalledWith(
      "Login form submitted successfully!"
    );
  });

  it("renders the Forgot Password link", () => {
    const { container } = renderLogin();

    expect(
      within(container).getByRole("link", {
        name: "Forgot Password?",
      })
    ).toHaveAttribute("href", "/forgot-password");
  });

  it("navigates to Forgot Password page", () => {
    const { container } = renderLogin();

    fireEvent.click(
      within(container).getByRole("link", {
        name: "Forgot Password?",
      })
    );

    expect(
      within(container).getByRole("heading", {
        name: "Forgot Password Page",
      })
    ).toBeInTheDocument();
  });

  it("renders the Google sign-in button", () => {
    const { container } = renderLogin();

    expect(
      within(container).getByRole("button", { name: "Google" })
    ).toBeInTheDocument();
  });

  it("displays an alert when Google sign-in is clicked", () => {
    const { container } = renderLogin();

    fireEvent.click(
      within(container).getByRole("button", { name: "Google" })
    );

    expect(alertMock).toHaveBeenCalledWith(
      "Google sign-in will be connected later."
    );
  });

  it("renders the Phone sign-in button", () => {
    const { container } = renderLogin();

    expect(
      within(container).getByRole("button", { name: "Phone" })
    ).toBeInTheDocument();
  });

  it("displays an alert when Phone sign-in is clicked", () => {
    const { container } = renderLogin();

    fireEvent.click(
      within(container).getByRole("button", { name: "Phone" })
    );

    expect(alertMock).toHaveBeenCalledWith(
      "Phone sign-in will be connected later."
    );
  });

  it("renders the Create Account link", () => {
    const { container } = renderLogin();

    expect(
      within(container).getByRole("link", {
        name: /Create Account/i,
      })
    ).toHaveAttribute("href", "/register");
  });

  it("navigates to Register page", () => {
    const { container } = renderLogin();

    fireEvent.click(
      within(container).getByRole("link", {
        name: /Create Account/i,
      })
    );

    expect(
      within(container).getByRole("heading", {
        name: "Register Page",
      })
    ).toBeInTheDocument();
  });

  it("renders the RecyConnect footer text", () => {
    const { container } = renderLogin();

    expect(
      within(container.querySelector(".auth-footer")).getByText(
        /Where Waste Finds Its Value/
      )
    ).toBeInTheDocument();
  });

  it("renders the Home logo link", () => {
    const { container } = renderLogin();

    expect(
      within(container).getByRole("link", { name: /RecyConnect/i })
    ).toHaveAttribute("href", "/");
  });

  it("navigates to Home when the logo is clicked", () => {
    const { container } = renderLogin();

    fireEvent.click(
      within(container).getByRole("link", { name: /RecyConnect/i })
    );

    expect(
      within(container).getByRole("heading", {
        name: "Home Page",
      })
    ).toBeInTheDocument();
  });

  it("renders the OR CONTINUE WITH divider", () => {
    const { container } = renderLogin();

    expect(
      within(container.querySelector(".auth-divider")).getByText(
        "OR CONTINUE WITH"
      )
    ).toBeInTheDocument();
  });
});


import { describe, it, expect } from "vitest";
import { render, within, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";

function renderRegister() {
  return render(
    <MemoryRouter initialEntries={["/register"]}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<h1>Login Page</h1>}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("Register Component", () => {
  // ---------------- PAGE DISPLAY ----------------

  it("renders the Register page correctly", () => {
    const { container } = renderRegister();

    expect(container.querySelector(".register-page")).toBeInTheDocument();
    expect(container.querySelector(".register-box")).toBeInTheDocument();
  });

  it("displays the RecyConnect logo", () => {
    const { container } = renderRegister();

    expect(container.querySelector(".register-logo"))
      .toHaveTextContent("RecyConnect");

    expect(container.querySelector(".register-logo span"))
      .toHaveTextContent("R");
  });

  it("displays the Create Account heading", () => {
    const { container } = renderRegister();

    expect(
      within(container).getByRole("heading", {
        level: 1,
        name: "Create Account",
      })
    ).toBeInTheDocument();
  });

  it("displays the registration description", () => {
    const { container } = renderRegister();

    expect(container).toHaveTextContent(
      "Join the RecyConnect community."
    );
  });

  // ---------------- FORM FIELDS ----------------

  it("renders the registration form", () => {
    const { container } = renderRegister();

    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("renders the Full Name input", () => {
    const { container } = renderRegister();

    expect(
      within(container).getByPlaceholderText("Enter your full name")
    ).toHaveAttribute("type", "text");
  });

  it("renders the Email Address input", () => {
    const { container } = renderRegister();

    expect(
      within(container).getByPlaceholderText("Enter your email")
    ).toHaveAttribute("type", "email");
  });

  it("renders the Phone Number input", () => {
    const { container } = renderRegister();

    expect(
      within(container).getByPlaceholderText("Enter phone number")
    ).toHaveAttribute("type", "text");
  });

  it("renders the Password input", () => {
    const { container } = renderRegister();

    expect(
      within(container).getByPlaceholderText("Create password")
    ).toHaveAttribute("type", "password");
  });

  it("displays all registration field labels", () => {
    const { container } = renderRegister();

    const form = container.querySelector("form");

    ["Full Name", "Email Address", "Phone Number", "Password"]
      .forEach((label) => {
        expect(within(form).getByText(label)).toBeInTheDocument();
      });
  });

  // ---------------- USER INPUT ----------------

  it("allows entering a full name", () => {
    const { container } = renderRegister();

    const input = within(container).getByPlaceholderText(
      "Enter your full name"
    );

    fireEvent.change(input, {
      target: { value: "Anusha Kanneboina" },
    });

    expect(input).toHaveValue("Anusha Kanneboina");
  });

  it("allows entering an email address", () => {
    const { container } = renderRegister();

    const input = within(container).getByPlaceholderText(
      "Enter your email"
    );

    fireEvent.change(input, {
      target: { value: "anusha@example.com" },
    });

    expect(input).toHaveValue("anusha@example.com");
  });

  it("allows entering a phone number", () => {
    const { container } = renderRegister();

    const input = within(container).getByPlaceholderText(
      "Enter phone number"
    );

    fireEvent.change(input, {
      target: { value: "9876543210" },
    });

    expect(input).toHaveValue("9876543210");
  });

  it("allows entering a password", () => {
    const { container } = renderRegister();

    const input = within(container).getByPlaceholderText(
      "Create password"
    );

    fireEvent.change(input, {
      target: { value: "Password123" },
    });

    expect(input).toHaveValue("Password123");
  });

  // ---------------- SUBMIT BUTTON ----------------

  it("displays the Create Account submit button", () => {
    const { container } = renderRegister();

    expect(
      within(container).getByRole("button", {
        name: "Create Account",
      })
    ).toHaveAttribute("type", "submit");
  });

  it("keeps the registration form available after rendering", () => {
    const { container } = renderRegister();

    expect(container.querySelector("form")).toBeInTheDocument();
    expect(
      within(container).getByRole("button", {
        name: "Create Account",
      })
    ).toBeInTheDocument();
  });

  // ---------------- LOGIN NAVIGATION ----------------

  it("displays the existing account message", () => {
    const { container } = renderRegister();

    expect(container.querySelector(".register-bottom"))
      .toHaveTextContent("Already have an account?");
  });

  it("displays a Login link", () => {
    const { container } = renderRegister();

    const loginLink = within(container).getByRole("link", {
      name: "Login",
    });

    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("navigates to Login when the Login link is clicked", () => {
    const { container } = renderRegister();

    fireEvent.click(
      within(container).getByRole("link", {
        name: "Login",
      })
    );

    expect(
      within(container).getByRole("heading", {
        name: "Login Page",
      })
    ).toBeInTheDocument();
  });
});

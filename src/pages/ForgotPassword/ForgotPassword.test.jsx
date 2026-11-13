
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import "@testing-library/jest-dom";

import ForgotPassword from "./ForgotPassword";

function TestLocation() {
  const location = useLocation();

  return <p data-testid="current-route">{location.pathname}</p>;
}

describe("ForgotPassword Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/forgot-password"]}>
        <ForgotPassword />
        <TestLocation />
      </MemoryRouter>
    );
  });

  it("renders the Forgot Password page", () => {
    expect(document.querySelector(".auth-page")).toBeInTheDocument();
  });

  it("displays the RecyConnect logo", () => {
    expect(screen.getByText(/RecyConnect/i)).toBeInTheDocument();
  });

  it("displays the Forgot Password heading", () => {
    expect(
      screen.getByRole("heading", { name: "Forgot Password?" })
    ).toBeInTheDocument();
  });

  it("displays the registered email instruction", () => {
    expect(
      screen.getByText("Enter your registered email to continue.")
    ).toBeInTheDocument();
  });

  it("displays the Email Address label", () => {
    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });

  it("displays the email input", () => {
    expect(
      screen.getByPlaceholderText("Enter your email")
    ).toHaveAttribute("type", "email");
  });

  it("makes the email field required", () => {
    expect(
      screen.getByPlaceholderText("Enter your email")
    ).toBeRequired();
  });

  it("displays the Continue button", () => {
    expect(
      screen.getByRole("button", { name: "Continue" })
    ).toBeInTheDocument();
  });

  it("displays the Back to Login option", () => {
    expect(screen.getByText("Back to Login")).toBeInTheDocument();
  });

  it("navigates to verify OTP after form submission", () => {
    const emailInput = screen.getByPlaceholderText("Enter your email");

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByTestId("current-route")).toHaveTextContent(
      "/verify-otp"
    );
  });

  it("navigates to login when Back to Login is clicked", () => {
    fireEvent.click(screen.getByText("Back to Login"));

    expect(screen.getByTestId("current-route")).toHaveTextContent("/login");
  });

  it("displays the password reminder text", () => {
    expect(
      screen.getByText("Remember your password?")
    ).toBeInTheDocument();
  });
});

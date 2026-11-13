
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, within, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import NewPassword from "./NewPassword";

describe("NewPassword Component", () => {
  let alertMock;

  const renderNewPassword = () => {
    return render(
      <MemoryRouter initialEntries={["/new-password"]}>
        <Routes>
          <Route path="/new-password" element={<NewPassword />} />
          <Route
            path="/login"
            element={<h1>Login Page</h1>}
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

  it("renders the NewPassword component correctly", () => {
    const { container } = renderNewPassword();

    expect(container.querySelector(".auth-page")).toBeInTheDocument();
    expect(container.querySelector(".auth-box")).toBeInTheDocument();
  });

  it("displays the RecyConnect logo", () => {
    const { container } = renderNewPassword();

    expect(
      within(container.querySelector(".auth-logo")).getByText(
        "RecyConnect"
      )
    ).toBeInTheDocument();
  });

  it("displays the Create New Password heading", () => {
    const { container } = renderNewPassword();

    expect(
      within(container.querySelector(".auth-box")).getByRole("heading", {
        name: "Create New Password",
      })
    ).toBeInTheDocument();
  });

  it("displays the password instructions", () => {
    const { container } = renderNewPassword();

    expect(
      within(container.querySelector(".auth-box")).getByText(
        "Enter and confirm your new password."
      )
    ).toBeInTheDocument();
  });

  it("renders the New Password input", () => {
    const { container } = renderNewPassword();
    const inputs = container.querySelectorAll('input[type="password"]');

    expect(inputs[0]).toBeInTheDocument();
    expect(inputs[0]).toHaveAttribute("placeholder", "Enter new password");
    expect(inputs[0]).toHaveAttribute("required");
    expect(inputs[0]).toHaveAttribute("minlength", "6");
  });

  it("renders the Confirm Password input", () => {
    const { container } = renderNewPassword();
    const inputs = container.querySelectorAll('input[type="password"]');

    expect(inputs[1]).toBeInTheDocument();
    expect(inputs[1]).toHaveAttribute("placeholder", "Confirm new password");
    expect(inputs[1]).toHaveAttribute("required");
  });

  it("allows entering a new password", () => {
    const { container } = renderNewPassword();
    const password = container.querySelectorAll('input[type="password"]')[0];

    fireEvent.change(password, {
      target: { value: "NewPass123" },
    });

    expect(password).toHaveValue("NewPass123");
  });

  it("allows entering a confirmation password", () => {
    const { container } = renderNewPassword();
    const confirmPassword =
      container.querySelectorAll('input[type="password"]')[1];

    fireEvent.change(confirmPassword, {
      target: { value: "NewPass123" },
    });

    expect(confirmPassword).toHaveValue("NewPass123");
  });

  it("renders the Update Password button", () => {
    const { container } = renderNewPassword();

    expect(
      within(container).getByRole("button", {
        name: "Update Password",
      })
    ).toBeInTheDocument();
  });

  it("displays an error when passwords do not match", () => {
    const { container } = renderNewPassword();
    const inputs = container.querySelectorAll('input[type="password"]');

    fireEvent.change(inputs[0], {
      target: { value: "Password123" },
    });

    fireEvent.change(inputs[1], {
      target: { value: "Different123" },
    });

    fireEvent.submit(container.querySelector("form"));

    expect(
      within(container).getByText("Passwords do not match!")
    ).toBeInTheDocument();

    expect(alertMock).not.toHaveBeenCalled();
  });

  it("displays an error when the password has fewer than 6 characters", () => {
    const { container } = renderNewPassword();
    const inputs = container.querySelectorAll('input[type="password"]');

    fireEvent.change(inputs[0], {
      target: { value: "12345" },
    });

    fireEvent.change(inputs[1], {
      target: { value: "12345" },
    });

    fireEvent.submit(container.querySelector("form"));

    expect(
      within(container).getByText(
        "Password must be at least 6 characters."
      )
    ).toBeInTheDocument();

    expect(alertMock).not.toHaveBeenCalled();
  });

  it("does not navigate to Login when passwords do not match", () => {
    const { container } = renderNewPassword();
    const inputs = container.querySelectorAll('input[type="password"]');

    fireEvent.change(inputs[0], {
      target: { value: "Password123" },
    });

    fireEvent.change(inputs[1], {
      target: { value: "WrongPassword" },
    });

    fireEvent.submit(container.querySelector("form"));

    expect(
      within(container).queryByRole("heading", {
        name: "Login Page",
      })
    ).not.toBeInTheDocument();
  });

  it("does not navigate to Login when password is too short", () => {
    const { container } = renderNewPassword();
    const inputs = container.querySelectorAll('input[type="password"]');

    fireEvent.change(inputs[0], {
      target: { value: "123" },
    });

    fireEvent.change(inputs[1], {
      target: { value: "123" },
    });

    fireEvent.submit(container.querySelector("form"));

    expect(
      within(container).queryByRole("heading", {
        name: "Login Page",
      })
    ).not.toBeInTheDocument();
  });

  it("successfully updates the password when both passwords match", () => {
    const { container } = renderNewPassword();
    const inputs = container.querySelectorAll('input[type="password"]');

    fireEvent.change(inputs[0], {
      target: { value: "NewPassword123" },
    });

    fireEvent.change(inputs[1], {
      target: { value: "NewPassword123" },
    });

    fireEvent.submit(container.querySelector("form"));

    expect(alertMock).toHaveBeenCalledWith(
      "Password updated successfully! (Demo only)"
    );
  });

  it("navigates to Login after successful password update", () => {
    const { container } = renderNewPassword();
    const inputs = container.querySelectorAll('input[type="password"]');

    fireEvent.change(inputs[0], {
      target: { value: "NewPassword123" },
    });

    fireEvent.change(inputs[1], {
      target: { value: "NewPassword123" },
    });

    fireEvent.submit(container.querySelector("form"));

    expect(
      within(container).getByRole("heading", {
        name: "Login Page",
      })
    ).toBeInTheDocument();
  });

  it("does not show an error before form submission", () => {
    const { container } = renderNewPassword();

    expect(
      within(container).queryByText("Passwords do not match!")
    ).not.toBeInTheDocument();

    expect(
      within(container).queryByText(
        "Password must be at least 6 characters."
      )
    ).not.toBeInTheDocument();
  });

  it("clears the previous validation error after a successful submission", () => {
    const { container } = renderNewPassword();
    const inputs = container.querySelectorAll('input[type="password"]');
    const form = container.querySelector("form");

    fireEvent.change(inputs[0], {
      target: { value: "Password123" },
    });

    fireEvent.change(inputs[1], {
      target: { value: "WrongPassword" },
    });

    fireEvent.submit(form);

    expect(
      within(container).getByText("Passwords do not match!")
    ).toBeInTheDocument();

    fireEvent.change(inputs[1], {
      target: { value: "Password123" },
    });

    fireEvent.submit(form);

    expect(
      within(container).queryByText("Passwords do not match!")
    ).not.toBeInTheDocument();
  });
});

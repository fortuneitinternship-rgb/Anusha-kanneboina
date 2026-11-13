
import {
  beforeEach,
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import NewPassword from "./VerifyOTP";

const { mockNavigate, mockAlert } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  mockAlert: vi.fn(),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderNewPassword() {
  return render(
    <MemoryRouter>
      <NewPassword />
    </MemoryRouter>
  );
}

describe("NewPassword Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("alert", mockAlert);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the RecyConnect logo", () => {
    renderNewPassword();
    expect(screen.getByText("RecyConnect")).toBeInTheDocument();
  });

  it("renders the Create New Password heading", () => {
    renderNewPassword();
    expect(
      screen.getByRole("heading", { name: "Create New Password" })
    ).toBeInTheDocument();
  });

  it("renders the description", () => {
    renderNewPassword();
    expect(
      screen.getByText("Enter and confirm your new password.")
    ).toBeInTheDocument();
  });

  it("renders the New Password label", () => {
    renderNewPassword();
    expect(screen.getByText("New Password")).toBeInTheDocument();
  });

  it("renders the Confirm Password label", () => {
    renderNewPassword();
    expect(screen.getByText("Confirm Password")).toBeInTheDocument();
  });

  it("renders the new password input", () => {
    renderNewPassword();
    expect(
      screen.getByPlaceholderText("Enter new password")
    ).toBeInTheDocument();
  });

  it("renders the confirm password input", () => {
    renderNewPassword();
    expect(
      screen.getByPlaceholderText("Confirm new password")
    ).toBeInTheDocument();
  });

  it("sets both inputs to password type", () => {
    renderNewPassword();

    expect(
      screen.getByPlaceholderText("Enter new password")
    ).toHaveAttribute("type", "password");

    expect(
      screen.getByPlaceholderText("Confirm new password")
    ).toHaveAttribute("type", "password");
  });

  it("sets minimum password length to 6", () => {
    renderNewPassword();

    expect(
      screen.getByPlaceholderText("Enter new password")
    ).toHaveAttribute("minLength", "6");
  });

  it("renders the Update Password button", () => {
    renderNewPassword();

    expect(
      screen.getByRole("button", { name: "Update Password" })
    ).toBeInTheDocument();
  });

  it("updates the new password input value", () => {
    renderNewPassword();

    const input = screen.getByPlaceholderText("Enter new password");

    fireEvent.change(input, {
      target: { value: "password123" },
    });

    expect(input).toHaveValue("password123");
  });

  it("updates the confirm password input value", () => {
    renderNewPassword();

    const input = screen.getByPlaceholderText("Confirm new password");

    fireEvent.change(input, {
      target: { value: "password123" },
    });

    expect(input).toHaveValue("password123");
  });

  it("shows an error when passwords do not match", () => {
    renderNewPassword();

    fireEvent.change(
      screen.getByPlaceholderText("Enter new password"),
      { target: { value: "password123" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Confirm new password"),
      { target: { value: "different123" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Update Password" })
    );

    expect(
      screen.getByText("Passwords do not match!")
    ).toBeInTheDocument();
  });

  it("shows an error when password is shorter than 6 characters", () => {
    renderNewPassword();

    fireEvent.change(
      screen.getByPlaceholderText("Enter new password"),
      { target: { value: "12345" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Confirm new password"),
      { target: { value: "12345" } }
    );

    const form = screen
      .getByRole("button", { name: "Update Password" })
      .closest("form");

    fireEvent.submit(form);

    expect(
      screen.getByText("Password must be at least 6 characters.")
    ).toBeInTheDocument();
  });

  it("clears error when new password changes", () => {
    renderNewPassword();

    fireEvent.change(
      screen.getByPlaceholderText("Enter new password"),
      { target: { value: "password123" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Confirm new password"),
      { target: { value: "different123" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Update Password" })
    );

    expect(
      screen.getByText("Passwords do not match!")
    ).toBeInTheDocument();

    fireEvent.change(
      screen.getByPlaceholderText("Enter new password"),
      { target: { value: "newpassword123" } }
    );

    expect(
      screen.queryByText("Passwords do not match!")
    ).not.toBeInTheDocument();
  });

  it("clears error when confirm password changes", () => {
    renderNewPassword();

    fireEvent.change(
      screen.getByPlaceholderText("Enter new password"),
      { target: { value: "password123" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Confirm new password"),
      { target: { value: "different123" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Update Password" })
    );

    expect(
      screen.getByText("Passwords do not match!")
    ).toBeInTheDocument();

    fireEvent.change(
      screen.getByPlaceholderText("Confirm new password"),
      { target: { value: "password123" } }
    );

    expect(
      screen.queryByText("Passwords do not match!")
    ).not.toBeInTheDocument();
  });

  it("does not navigate when passwords do not match", () => {
    renderNewPassword();

    fireEvent.change(
      screen.getByPlaceholderText("Enter new password"),
      { target: { value: "password123" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Confirm new password"),
      { target: { value: "different123" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Update Password" })
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("does not navigate when password is too short", () => {
    renderNewPassword();

    fireEvent.change(
      screen.getByPlaceholderText("Enter new password"),
      { target: { value: "12345" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Confirm new password"),
      { target: { value: "12345" } }
    );

    const form = screen
      .getByRole("button", { name: "Update Password" })
      .closest("form");

    fireEvent.submit(form);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("shows success alert for valid passwords", () => {
    renderNewPassword();

    fireEvent.change(
      screen.getByPlaceholderText("Enter new password"),
      { target: { value: "password123" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Confirm new password"),
      { target: { value: "password123" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Update Password" })
    );

    expect(mockAlert).toHaveBeenCalledWith(
      "Password updated successfully! (Demo only)"
    );
  });

  it("navigates to login after successful password update", () => {
    renderNewPassword();

    fireEvent.change(
      screen.getByPlaceholderText("Enter new password"),
      { target: { value: "password123" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Confirm new password"),
      { target: { value: "password123" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Update Password" })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});


import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loader from "./Loader";

describe("RecyConnect Loader Component", () => {

  it("renders loader correctly", () => {
    render(<Loader />);

    expect(screen.getByRole("status"))
      .toBeInTheDocument();
  });

  it("displays default loading message", () => {
    render(<Loader />);

    expect(screen.getByText("Loading..."))
      .toBeInTheDocument();
  });

  it("displays custom loading message", () => {
    render(<Loader message="Please wait..." />);

    expect(screen.getByText("Please wait..."))
      .toBeInTheDocument();
  });

  it("displays spinner element", () => {
    const { container } = render(<Loader />);

    expect(
      container.querySelector(".recy-loader__spinner")
    ).toBeInTheDocument();
  });

  it("applies correct loader CSS class", () => {
    render(<Loader />);

    expect(screen.getByRole("status"))
      .toHaveClass("recy-loader");
  });

  it("has correct accessibility attributes", () => {
    render(<Loader />);

    expect(screen.getByRole("status"))
      .toHaveAttribute("aria-live", "polite");

    expect(
      screen.getByText("Loading...").previousElementSibling
    ).toHaveAttribute("aria-hidden", "true");
  });

});

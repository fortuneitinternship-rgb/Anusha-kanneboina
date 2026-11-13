import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";

// Mock Navbar
vi.mock("../Components/Navbar/Navbar", () => ({
  default: () => <nav data-testid="navbar">RecyConnect Navbar</nav>,
}));

// Mock Footer
vi.mock("../Components/Footer/Footer", () => ({
  default: () => <footer data-testid="footer">RecyConnect Footer</footer>,
}));

describe("MainLayout Component", () => {
  const renderLayout = () =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<div>Home Page Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

  it("renders the MainLayout component correctly", () => {
    renderLayout();

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("displays the Navbar", () => {
    renderLayout();

    expect(screen.getByText("RecyConnect Navbar")).toBeInTheDocument();
  });

  it("displays the Footer", () => {
    renderLayout();

    expect(screen.getByText("RecyConnect Footer")).toBeInTheDocument();
  });

  it("renders the Outlet content", () => {
    renderLayout();

    expect(screen.getByText("Home Page Content")).toBeInTheDocument();
  });

  it("renders Navbar before the main content", () => {
    renderLayout();

    const navbar = screen.getByTestId("navbar");
    const main = screen.getByRole("main");

    expect(
      navbar.compareDocumentPosition(main) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("renders Footer after the main content", () => {
    renderLayout();

    const main = screen.getByRole("main");
    const footer = screen.getByTestId("footer");

    expect(
      main.compareDocumentPosition(footer) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("renders exactly one main element", () => {
    renderLayout();

    expect(screen.getAllByRole("main")).toHaveLength(1);
  });
});
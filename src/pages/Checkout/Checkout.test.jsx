
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Checkout from "./Checkout";

describe("Checkout Component", () => {
  beforeEach(() => {
    render(<Checkout />);
  });

  it("renders the Checkout page", () => {
    expect(document.querySelector(".checkout-page")).toBeInTheDocument();
  });

  it("displays the RecyConnect title", () => {
    expect(screen.getByText("RECYCONNECT")).toBeInTheDocument();
  });

  it("displays the Checkout heading", () => {
    expect(
      screen.getByRole("heading", { name: "Checkout" })
    ).toBeInTheDocument();
  });

  it("displays the Delivery Address section", () => {
    expect(
      screen.getByRole("heading", { name: "Delivery Address" })
    ).toBeInTheDocument();
  });

  it("displays the Order Summary section", () => {
    expect(
      screen.getByRole("heading", { name: "Order Summary" })
    ).toBeInTheDocument();
  });

  it("displays the First Name input", () => {
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
  });

  it("displays the Last Name input", () => {
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
  });

  it("displays the Phone Number input", () => {
    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
  });

  it("displays the Address textarea", () => {
    expect(screen.getByPlaceholderText("Enter your address")).toBeInTheDocument();
  });

  it("displays the City input", () => {
    expect(screen.getByPlaceholderText("City")).toBeInTheDocument();
  });

  it("displays the PIN Code input", () => {
    expect(screen.getByPlaceholderText("PIN Code")).toBeInTheDocument();
  });

  it("displays the Payment Method section", () => {
    expect(
      screen.getByRole("heading", { name: "Payment Method" })
    ).toBeInTheDocument();
  });

  it("displays Cash on Delivery option", () => {
    expect(screen.getByText("Cash on Delivery")).toBeInTheDocument();
  });

  it("displays UPI / Online Payment option", () => {
    expect(screen.getByText("UPI / Online Payment")).toBeInTheDocument();
  });

  it("displays two payment radio buttons", () => {
    expect(document.querySelectorAll('input[type="radio"]')).toHaveLength(2);
  });

  it("displays the Place Order button", () => {
    expect(
      screen.getByRole("button", { name: "Place Order" })
    ).toBeInTheDocument();
  });

  it("displays the recycled plastic chair", () => {
    expect(screen.getByText("Recycled Plastic Chair")).toBeInTheDocument();
  });

  it("displays the recycled paper notebook", () => {
    expect(screen.getByText("Recycled Paper Notebook")).toBeInTheDocument();
  });

  it("displays the subtotal", () => {
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
  });

  it("displays the delivery charge", () => {
    expect(screen.getByText("Delivery")).toBeInTheDocument();
  });

  it("displays the total amount", () => {
    expect(
      document.querySelector(".checkout-total")
    ).toHaveTextContent("Total");
    
    expect(
      document.querySelector(".checkout-total")
    ).toHaveTextContent("₹1020");
  });

  it("displays the correct order prices", () => {
    expect(screen.getByText("₹850")).toBeInTheDocument();
    expect(screen.getByText("₹120")).toBeInTheDocument();
    expect(screen.getByText("₹970")).toBeInTheDocument();
    expect(screen.getByText("₹50")).toBeInTheDocument();
  });

  it("contains the checkout form and summary", () => {
    expect(document.querySelector(".checkout-form")).toBeInTheDocument();
    expect(document.querySelector(".checkout-summary")).toBeInTheDocument();
  });
});

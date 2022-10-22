import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Input from "./index";

describe("Input", () => {
  test("renders without crash", () => {
    render(<Input onChange={() => 0} />);
  });

  test("renders with label", () => {
    render(<Input label="test label" value="test value" onChange={() => 0} />);
    const label = screen.getByText(/test label/i);
    expect(label).toHaveTextContent("test label");
  });

  test("renders with html for", () => {
    render(<Input label="test label" name="password" onChange={() => 0} />);
    const label = screen.getByTestId("label");
    expect(label).toHaveAttribute("for", "password");
  });

  test("renders with type", () => {
    render(<Input type="password" onChange={() => 0} />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", "password");
  });
});

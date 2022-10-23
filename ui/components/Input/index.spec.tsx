import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders as render } from "../../../utils/tests-utils";
import Input from "./index";

describe("Input", () => {
  test("renders without crash", () => {
    render(<Input />);
  });

  test("should set the value when input chages", () => {
    render(<Input />);
    const input = screen.getByTestId("input");
    expect(input).toHaveValue("");
    fireEvent.change(input, "a");
    // wait for debounce to finish
    expect(input).not.toHaveValue("a");
    waitFor(() => {
      expect(input).toHaveValue("a");
    });
  });

  test("should set the seach value when input chages", () => {
    render(<Input />);
    const input = screen.getByTestId("input");
    expect(input).toHaveValue("");
    fireEvent.change(input, "a");
    expect(input).not.toHaveValue("a");
    waitFor(() => {
      expect(input).toHaveValue("a");
    });
  });
});

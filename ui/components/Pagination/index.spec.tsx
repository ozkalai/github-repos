import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders as render } from "../../../utils/tests-utils";
import Pagination from "./index";

describe("Pagination", () => {
  test("renders without crash", () => {
    render(<Pagination />);
  });

  test("should set the per page value when select changes", () => {
    render(<Pagination />);
    waitFor(() => {
      const select = screen.getByTestId("select-testid");
      expect(select).toHaveValue("10");
      expect(select).toHaveValue(10);
      fireEvent.change(select, { target: { value: 20 } });
      expect(select).toHaveValue(20);
    });
  });

  test("should render pagination button correctly", () => {
    render(<Pagination />, {
      preloadedState: {
        search: {
          page: 1,
          perPage: 20,
          order: "desc",
          status: "idle",
          selectedLanguage: "javascript",
          searchValue: "",
          repositories: {
            total_count: 100,
            incomplete_results: false,
            items: [],
          },
        },
      },
    });

    waitFor(() => {
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(5);
      expect(buttons[0]).toHaveTextContent("1");
      expect(buttons[1]).toHaveTextContent("2");
      expect(buttons[2]).toHaveTextContent("3");
      expect(buttons[3]).toHaveTextContent("4");
      expect(buttons[4]).toHaveTextContent("10");
    });
  });
});

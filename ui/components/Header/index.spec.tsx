import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { store } from "../../../store/store";

import { renderWithProviders as render } from "../../../utils/tests-utils";
import Header from "./index";

export const handlers = [
  rest.get("https://api.github.com/user", (req: any, res: any, ctx: any) => {
    return res(
      ctx.json({
        login: "ozkalai",
        id: 1,
        avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
        html_url: "some url",
        name: "Melih Ozkalay",
        company: "some company",
        location: "some location",
        email: "some email",
        bio: "some bio",
        public_repos: 1,
        followers: 1,
        following: 1,
      }),
      ctx.delay(150)
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Header", () => {
  test("renders without crash", () => {
    render(<Header />);
  });

  test("should render user info correctly", () => {
    render(<Header />);
    waitFor(() => {
      expect(screen.getByText("Melih Ozkalay")).toBeInTheDocument();
      expect(screen.getByText("ozkalai")).toBeInTheDocument();
    });
  });

  test("should render logout button correctly", () => {
    render(<Header />);
    waitFor(() => {
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });
  });

  test("should work logout button correctly", () => {
    render(<Header />);
    waitFor(() => {
      const logoutButton = screen.getByText("Logout");
      fireEvent.click(logoutButton);
      expect(screen.getByText("Explore")).toBeInTheDocument();
    });
  });

  test("should render image correctly", () => {
    render(<Header />);
    waitFor(() => {
      expect(screen.getByAltText("avatar")).toBeInTheDocument();
      expect(screen.getByAltText("avatar")).toHaveAttribute(
        "src",
        "https://avatars.githubusercontent.com/u/1?v=4"
      );
    });
  });

  test("should dispatch setToken action correctly", () => {
    const dispatch = jest.fn();
    store.dispatch = dispatch;

    render(<Header />);
    waitFor(() => {
      expect(store.getState().auth.token).toBe("fake-token");
    });
  });
});

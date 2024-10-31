import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { api } from "@/state/api";
import Navbar from "./Navbar";

jest.mock("@reduxjs/toolkit/query/react", () => ({
  ...jest.requireActual("@reduxjs/toolkit/query/react"),
  fetchBaseQuery: jest.fn(() => jest.fn()),
}));

jest.mock("@/app/redux", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      global: (state = initialState) => state,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

describe("Navbar", () => {
  let mockStore: any;

  beforeEach(() => {
    mockStore = createMockStore({ isDarkMode: false });
    jest.clearAllMocks();
    /* eslint-disable-no-require-imports */
    (require("@/app/redux").useAppSelector as jest.Mock).mockImplementation(
      (selector) => selector(mockStore.getState()),
    );
  });

  it("renders properly", () => {
    render(<Navbar />);
    const navbar = screen.getByPlaceholderText(/Search/i);
    expect(navbar).toBeInTheDocument();
  });

  it("has dark mode option", () => {
    const { container } = render(<Navbar />);
    const icon = container.querySelector(".lucide-moon");
    expect(icon).toBeInTheDocument();
  });

  it("has light mode option", () => {
    mockStore = createMockStore({ isDarkMode: true });

    const { container } = render(
      <Provider store={mockStore}>
        <Navbar />
      </Provider>,
    );

    const sunIcon = container.querySelector(".lucide-sun") as HTMLElement;
    expect(sunIcon).toBeInTheDocument();
  });

  it("has a link to settings page", () => {
    render(<Navbar />);
    const settingsLink = screen.getByRole("link");
    expect(settingsLink).toHaveProperty(
      "href",
      expect.stringMatching(/settings/i),
    );
  });
});

import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";

import { api } from "@/state/api";
import Navbar from "./Navbar";

jest.mock("@/app/redux", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      global: (state = initialState, action) => state,
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

  it.skip("has light mode option", () => {
    const dispatch = jest.fn();

    useDispatch.mockReturnValue(jest.fn());

    const { container } = render(
      <Provider store={mockStore}>
        <Navbar />
      </Provider>,
    );
    const moonIcon = container.querySelector(".lucide-moon") as HTMLElement;

    fireEvent.click(moonIcon);

    const sunIcon = container.querySelector(".lucide-moon") as HTMLElement;

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

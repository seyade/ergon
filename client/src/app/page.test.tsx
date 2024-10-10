import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "./page";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  useStore: jest.fn(),
}));

describe("Home", () => {
  const mockedDispatch = jest.fn();

  (mockedDispatch as jest.Mock).mockReturnValue(mockedDispatch);

  it("should render", () => {
    render(<Home />);
    const home = screen.getByText(/peace/i);
    expect(home).toBeInTheDocument();
  });
});

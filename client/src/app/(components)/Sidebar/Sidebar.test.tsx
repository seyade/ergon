import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "./Sidebar";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  useStore: jest.fn(),
}));

describe("Sidebar", () => {
  const mockedDispatch = jest.fn();

  (useDispatch as jest.Mock).mockReturnValue(mockedDispatch);

  it("renders", () => {
    render(<Sidebar />);
    const sidebar = screen.getByText(/Home/i);
    expect(sidebar).toBeInTheDocument();
  });
});

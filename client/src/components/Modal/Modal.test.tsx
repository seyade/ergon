import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Modal from "./Modal";

jest.mock("@/state/api", () => ({
  ...jest.requireActual("@/state/api"),
  useCreateProjectMutation: jest.fn(),
}));

jest.mock("@reduxjs/toolkit/query/react", () => ({
  ...jest.requireActual("@reduxjs/toolkit/query/react"),
  fetchBaseQuery: jest.fn(() => jest.fn()),
}));

jest.mock("@/app/redux", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const props = {
  children: null,
  isOpen: true,
  onClose: jest.fn(),
  title: "Modal Title",
};

describe("Modal", () => {
  it("should render correctly", () => {
    render(<Modal {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
  });
});

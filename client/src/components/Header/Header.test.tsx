import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "./Header";

const props = {
  title: "Page Header",
  buttonComponent: null,
  isSmallText: false,
};

describe("Header", () => {
  it("should render properly", () => {
    render(<Header {...props} />);
    const header = screen.getByText(/Page Header/i);
    expect(header).toBeInTheDocument();
  });
});

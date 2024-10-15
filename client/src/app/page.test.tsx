import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "./page";

describe("Home", () => {
  it("should render", () => {
    render(<Home />);

    const home = screen.getByText(/peace/i);
    expect(home).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ProjectHeader from "./ProjectHeader";

const props = {
  activeTab: "Board",
  setActiveTab: jest.fn(),
};

describe("ProjectHeader", () => {
  it("should render", () => {
    render(<ProjectHeader {...props} />);
    const pageHeader = screen.getByText(/Board/i);
    expect(pageHeader).toBeInTheDocument();
  });

  it("displays the correct tabs", () => {
    render(<ProjectHeader {...props} />);

    expect(screen.getByText(/Board/i)).toBeInTheDocument();
    expect(screen.getByText(/List/i)).toBeInTheDocument();
    expect(screen.getByText(/Timeline/i)).toBeInTheDocument();
    expect(screen.getByText(/Table/i)).toBeInTheDocument();
  });
});

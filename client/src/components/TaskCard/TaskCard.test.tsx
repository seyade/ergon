import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import TaskCard from "./TaskCard";

const props = {
  task: {
    id: 1,
    title: "Task Title",
    projectId: 1,
  },
};

describe("TaskCard", () => {
  it("renders properly", () => {
    render(<TaskCard {...props} />);
    const card = screen.getByText(/Task Title/i);
    expect(card).toBeInTheDocument();
  });
});

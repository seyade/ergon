import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProjectHeader from "./ProjectHeader";

// Mock the NewProjectModal component
jest.mock("@/app/projects/NewProjectModal", () => ({
  __esModule: true,
  default: ({ isOpen, onClose }: any) =>
    isOpen ? (
      <div data-testid="mock-modal">
        <button data-testid="mock-modal-close-btn" onClick={onClose}>
          Close
        </button>
        Modal Content
      </div>
    ) : null,
}));

// Mock the Header component
jest.mock("@/components/Header", () => ({
  __esModule: true,
  default: ({ title, buttonComponent }: any) => (
    <div data-testid="mock-header">
      <h1>{title}</h1>
      {buttonComponent}
    </div>
  ),
}));

describe("ProjectHeader", () => {
  const mockSetActiveTab = jest.fn();

  beforeEach(() => {
    mockSetActiveTab.mockClear();
  });

  it("renders the header with correct title", () => {
    render(<ProjectHeader activeTab="Board" setActiveTab={mockSetActiveTab} />);
    expect(screen.getByText("Capsule Corp Spaceship")).toBeInTheDocument();
  });

  it('opens new project modal when "New Board" button is clicked', () => {
    render(<ProjectHeader activeTab="Board" setActiveTab={mockSetActiveTab} />);

    const newBoardButton = screen.getByText("New Board");
    fireEvent.click(newBoardButton);

    expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
  });

  it("closes modal when onClose is triggered", () => {
    render(<ProjectHeader activeTab="Board" setActiveTab={mockSetActiveTab} />);

    // Open modal
    const newBoardButton = screen.getByText("New Board");
    fireEvent.click(newBoardButton);

    expect(screen.getByTestId("mock-modal")).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByTestId("mock-modal-close-btn");
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId("mock-modal")).not.toBeInTheDocument();
  });

  it("renders all tab buttons with correct icons", () => {
    render(<ProjectHeader activeTab="Board" setActiveTab={mockSetActiveTab} />);

    const tabNames = ["Board", "List", "Timeline", "Table"];
    tabNames.forEach((tabName) => {
      expect(screen.getByText(tabName)).toBeInTheDocument();
    });
  });

  it("applies active styles to the selected tab", () => {
    render(<ProjectHeader activeTab="List" setActiveTab={mockSetActiveTab} />);

    const listTab = screen.getByText("List").closest("button");
    expect(listTab).toHaveClass("text-blue-600");
  });

  it("calls setActiveTab with correct tab name when clicking tabs", () => {
    render(<ProjectHeader activeTab="Board" setActiveTab={mockSetActiveTab} />);

    const timelineTab = screen.getByText("Timeline");
    fireEvent.click(timelineTab);

    expect(mockSetActiveTab).toHaveBeenCalledWith("Timeline");
    expect(mockSetActiveTab).toHaveBeenCalledTimes(1);
  });

  it("renders search input with placeholder", () => {
    render(<ProjectHeader activeTab="Board" setActiveTab={mockSetActiveTab} />);

    const searchInput = screen.getByPlaceholderText("Search Task");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("type", "text");
  });

  it("renders filter and share buttons", () => {
    render(<ProjectHeader activeTab="Board" setActiveTab={mockSetActiveTab} />);

    const buttons = screen.getAllByRole("button");
    const filterAndShareButtons = buttons.filter(
      (button) =>
        !button.textContent?.includes("Board") &&
        !button.textContent?.includes("List") &&
        !button.textContent?.includes("Timeline") &&
        !button.textContent?.includes("Table") &&
        !button.textContent?.includes("New Board"),
    );

    expect(filterAndShareButtons).toHaveLength(2);
  });

  // Test TabButton component separately
  describe("TabButton", () => {
    it("renders tab button with correct styles when active", () => {
      render(
        <ProjectHeader activeTab="Board" setActiveTab={mockSetActiveTab} />,
      );

      const boardTab = screen.getByText("Board").closest("button");
      expect(boardTab).toHaveClass("text-blue-600");
      expect(boardTab).toHaveClass("after:bg-blue-600");
      expect(boardTab).toHaveClass("dark:text-white");
    });

    it("renders tab button with inactive styles when not active", () => {
      render(
        <ProjectHeader activeTab="Board" setActiveTab={mockSetActiveTab} />,
      );

      const listTab = screen.getByText("List").closest("button");
      expect(listTab).not.toHaveClass("text-blue-600");
      expect(listTab).not.toHaveClass("after:bg-blue-600");
      expect(listTab).toHaveClass("dark:text-neutral-500");
    });

    it("handles tab button click events", () => {
      render(
        <ProjectHeader activeTab="Board" setActiveTab={mockSetActiveTab} />,
      );

      const listTab = screen.getByText("List");
      fireEvent.click(listTab);

      expect(mockSetActiveTab).toHaveBeenCalledWith("List");
      expect(mockSetActiveTab).toHaveBeenCalledTimes(1);
    });
  });
});

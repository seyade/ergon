import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { usePathname } from "next/navigation";
import "@testing-library/jest-dom";

import { api, Project, useGetProjectsQuery } from "@/state/api";
import Sidebar from "./Sidebar";

jest.mock("@/state/api", () => ({
  ...jest.requireActual("@/state/api"),
  useGetProjectsQuery: jest.fn(),
}));

jest.mock("@reduxjs/toolkit/query/react", () => ({
  ...jest.requireActual("@reduxjs/toolkit/query/react"),
  fetchBaseQuery: jest.fn(() => jest.fn()),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

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

describe("Sidebar", () => {
  let mockStore: any;

  beforeEach(() => {
    mockStore = createMockStore({ isSidebarCollapsed: false });

    jest.clearAllMocks();

    (usePathname as jest.Mock).mockReturnValue("/");

    (require("@/app/redux").useAppSelector as jest.Mock).mockImplementation(
      (selector) => selector(mockStore.getState()),
    );

    (useGetProjectsQuery as jest.Mock).mockReturnValue({
      data: [
        { id: 1, name: "Project One", description: "Test project one" },
        { id: 2, name: "Project Two", description: "Test project two" },
      ] as Project[],
      error: null,
      isLoading: false,
      refetch: jest.fn(),
    });
  });

  const renderSidebar = () => {
    return render(
      <Provider store={mockStore}>
        <Sidebar />
      </Provider>,
    );
  };

  it("renders with correct links", () => {
    renderSidebar();

    expect(screen.getByText("Ergon")).toBeInTheDocument();
    expect(screen.getByText("MY TEAM")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Timeline")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Priority")).toBeInTheDocument();
  });

  it("toggles Projects section when clicked", () => {
    renderSidebar();

    const projectsButton = screen.getByText("Projects");
    fireEvent.click(projectsButton);

    expect(screen.queryByText("Project One")).not.toBeInTheDocument();

    fireEvent.click(projectsButton);
    expect(screen.getByText("Project One")).toBeInTheDocument();
    expect(screen.getByText("Project Two")).toBeInTheDocument();
  });

  it("handles error for fail projects fetching", () => {
    (useGetProjectsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: { message: "API Error" },
      isLoading: false,
      refetch: jest.fn(),
    });

    renderSidebar();

    expect(screen.queryByText("Project One")).not.toBeInTheDocument();
  });

  it("shows loading state while fetching projects", () => {
    (useGetProjectsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
      refetch: jest.fn(),
    });

    renderSidebar();

    expect(screen.queryByText("Project One")).not.toBeInTheDocument();
  });
});

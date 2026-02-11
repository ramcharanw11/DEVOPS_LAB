import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const mockDashboard = {
  totalIncome: 100000,
  totalExpenses: 40000,
};

describe("App dashboard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows loading state initially", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockDashboard,
    });

    render(<App />);

    await waitFor(() =>
      expect(
        screen.getByText(/Loading dashboard data/i)
      ).toBeInTheDocument()
    );
  });

  it("renders stats after successful fetch", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockDashboard,
    });

    render(<App />);

    await waitFor(() =>
      expect(screen.queryByText(/Loading dashboard data/i)).not.toBeInTheDocument()
    );

    expect(screen.getByText("Total Income")).toBeInTheDocument();
    expect(screen.getByText("Total Expenses")).toBeInTheDocument();
    expect(screen.getByText("Balance")).toBeInTheDocument();
  });

  it("shows error and allows retry on failed fetch", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValueOnce({ ok: false, status: 500 })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockDashboard,
      });

    render(<App />);

    await waitFor(() =>
      expect(
        screen.getByText(/API error: 500/i)
      ).toBeInTheDocument()
    );

    const retryButton = screen.getByRole("button", { name: /retry/i });
    await userEvent.click(retryButton);

    await waitFor(() =>
      expect(screen.queryByText(/Error:/i)).not.toBeInTheDocument()
    );

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

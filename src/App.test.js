import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Testing", () => {
  const renderHere = <App />;

  test("renders navbar", () => {
    render(renderHere);
    const navbarEl = screen.getByText("Home");
    expect(navbarEl).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Greeting component", () => {
  test("renders Hello World as a text", () => {
    // Arrange - 준비
    render(<Greeting />);

    // Act

    // Assert - 단언
    const helloWorldElement = screen.getByText("Hello World!", { exact: true });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders 'good to see you' if the button was NOT clicked", () => {
    // Arrange
    render(<Greeting />);

    // Assert
    const outputElement = screen.getByText("good to see you", {
      exact: false,
    });

    expect(outputElement).toBeInTheDocument();
  });

  test("renders 'Changed!' if the button was clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.getByText("changed!", { exact: false });
    expect(outputElement).toBeInTheDocument();
  });

  test("does not render 'good to see you' if the button was clicked", () => {
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert
    /**
     * 없는 엘리먼트 검사할 땐 queryByText 를 이용. 엘리먼트 없으면 null 반환함.
     * 반면, getByText는 엘리먼트 없으면 오류 반환함.
     */
    const outputElement = screen.queryByText("good to see you");

    /**
     * 어쩌피 엘리먼트가 없어서 outputElement가 null이니깐 toBeNull로 검사해도 됨.
     * expect(outputElement).not.toBeInTheDocument();
     */
    expect(outputElement).toBeNull();
  });
});

import { renderWithProviders as render } from "../../../tests/tests-utils";
import { screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import LanguageRadioGroup from "./index";

describe("LanguageRadioGroup", () => {
  test("should render options with labels", () => {
    render(
      <LanguageRadioGroup
        options={[
          { value: "javascript", label: "Javascript" },
          { value: "scala", label: "Scala" },
        ]}
      />
    );
    expect(screen.getAllByRole("radio")).toHaveLength(2);
    expect(screen.getByLabelText("Javascript")).toBeInTheDocument();
    expect(screen.getByLabelText("Scala")).toBeInTheDocument();
  });

  test("should set javascript as default value", () => {
    render(
      <LanguageRadioGroup
        options={[
          { value: "javascript", label: "Javascript" },
          { value: "scala", label: "Scala" },
        ]}
      />
    );
    expect(screen.getByLabelText("Javascript")).toBeChecked();
  });

  test("should select clicked option", () => {
    render(
      <LanguageRadioGroup
        options={[
          { value: "javascript", label: "Javascript" },
          { value: "scala", label: "Scala" },
        ]}
      />
    );
    const scala = screen.getByLabelText("Scala");
    expect(scala).not.toBeChecked();
    act(() => {
      scala.click();
    });
    expect(scala).toBeChecked();
  });
});

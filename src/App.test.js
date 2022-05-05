import { getByAltText, render, screen } from "@testing-library/react";
import { configure } from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MainPage from "./pages/MainPage/MainPage";
import Uploader from "./components/Uploader/Uploader";
configure({ adapter: new Adapter() });

describe("Testing MainPage rendering", () => {
  const renderMain = <MainPage />;
  test("renders banner text in MainPage", () => {
    render(renderMain);
    const bannerEl = screen.getByText("Hello, Uploader!");
    expect(bannerEl).toBeInTheDocument();
  });
});

describe("Testing state of message in Uploader", () => {
  let uploaderPage;
  beforeEach(() => {
    uploaderPage = shallow(<Uploader />);
  });

  it("should hold a state attribute of a message that is initially empty", () => {
    const { container } = render(<Uploader />);
    const messageValue = getByAltText(container, "Choose-file");
    expect(messageValue.textContent).toBe("");
  });
});

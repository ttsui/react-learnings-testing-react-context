import React, {useContext, useEffect, useState} from "react";
import {render} from "@testing-library/react";
import {screen} from "@testing-library/dom";

const MyContext = React.createContext({
  firstName: ""
});

const Address = () => {
  const [names, setNames] = useState([]);
  const {firstName} = useContext(MyContext);

  useEffect(() => {
    setNames(names.concat(firstName));
  }, [firstName]);

  return (
    <div>

      <label>
        First Name: <input type="text" value={firstName} onChange={() => {
      }}/>
      </label>

      Names: <span data-testid="names">{names.join(", ")}</span>
    </div>
  );
};

it("test changes to context value", () => {
  const {rerender} = render(
    <MyContext.Provider value={{firstName: "Bob"}}>
      <Address/>
    </MyContext.Provider>
  );

  expect(screen.getByLabelText("First Name:").value).toEqual("Bob");
  expect(screen.getByTestId("names").textContent).toEqual("Bob");

  // calling render with the same component on the same container does not remount
  // https://testing-library.com/docs/example-update-props
  rerender(
    <MyContext.Provider value={{firstName: "Alice"}}>
      <Address/>
    </MyContext.Provider>
  );

  expect(screen.getByLabelText("First Name:").value).toEqual("Alice");
  expect(screen.getByTestId("names").textContent).toEqual("Bob, Alice");
});

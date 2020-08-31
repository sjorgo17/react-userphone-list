import React from 'react';
import { render,fireEvent,screen } from '@testing-library/react';
import { UserForm } from './UserForm';
import { act } from 'react-dom/test-utils';



describe("with invalid number", () => {
  it("renders the number validation error", async () => {
    const {getByText,getByTestId, getByPlaceholderText} = render(<UserForm />)

    await act(async () => {
      const numberInput = getByPlaceholderText("Enter phone number");
      fireEvent.change(numberInput, {target: {value: "mgskxv"}})
      fireEvent.click(getByText('Submit'))
    })
    const error = getByTestId("number-error");
    expect(error.textContent).toBe("invalid phone number");
  })
})

describe("with empty name field", () => {
  it("renders the name validation error", async () => {
    const {getByText,getByTestId} = render(<UserForm />)

    await act(async () => {
      fireEvent.click(getByText('Submit'))
    })
    const error = getByTestId("name-error");
    expect(error.textContent).toBe("*");
  })
})

describe("with empty surname field", () => {
  it("renders the surname validation error", async () => {
    const {getByText,getByTestId} = render(<UserForm />)

    await act(async () => {
      fireEvent.click(getByText('Submit'))
    })
    const error = getByTestId("surname-error");
    expect(error.textContent).toBe("*");
  })
})

describe("with unselected type field", () => {
  it("renders the type validation error", async () => {
    const {getByText,getByTestId} = render(<UserForm />)

    await act(async () => {
      fireEvent.click(getByText('Submit'))
    })
    const error = getByTestId("type-error");
    expect(error.textContent).toBe("*");
  })
})

describe("with selected type field", () => {
  it("does not render the type validation error", async () => {
    const {getByText,getByTestId} = render(<UserForm />)

    await act(async () => {
      const typeInput = getByText("Type");
      fireEvent.change(screen.getByTestId("select"), {
        target: { value: "Personal" },
      });
      fireEvent.click(getByText('Submit'))
    })
    const error = getByTestId("type-error");
    expect(error.textContent).toBe("");
  })
})


describe("with clicking the add number button", () => {
  it("adds a new number and type field", async () => {
    const {getByText, getAllByPlaceholderText} = render(<UserForm />)
  
    await act(async ()=> {
      fireEvent.click(getByText('+ Add Number'))
    });

    const numberInputs = getAllByPlaceholderText("Enter phone number");
    expect(numberInputs).toHaveLength(2);
  })
})

describe("with clicking the X button", () => {
  it("removes the number and type field", async () => {
    const {getByText, queryAllByPlaceholderText} = render(<UserForm />)
    
    await act(async() =>{
      fireEvent.click(getByText("X"))    
    });
    
    const numberInputs = queryAllByPlaceholderText("Enter phone number");
    expect(numberInputs).toHaveLength(0);
  })
})


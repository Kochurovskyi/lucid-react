// Import React and necessary hooks from the React library
import React, { useEffect, useRef } from "react";
// Import the CSS file for styling
import "./index.css";
// Import the InputField component
import InputField from "./InputField";
// Import the function to fetch autocomplete data
import { fetchAutocompleteData } from "./AutoComplete";
// Import the custom state management hook
import useCalculatorStore from "./state_store";

// Define the Calculator component
function Calculator() {
  // Destructure state variables and setters from the custom store
  const {
    inputValue, // Current input value
    result, // Calculated result
    labelText, // Label text for the input field
    options, // Autocomplete options
    setInputValue, // Function to update input value
    setResult, // Function to update result
    setLabelText, // Function to update label text
    setOptions, // Function to update autocomplete options
  } = useCalculatorStore();

  // Create a reference for the input field
  const inputRef = useRef(null);

  // Fetch autocomplete data when the component mounts
  useEffect(() => {
    fetchAutocompleteData(setOptions); // Fetch data and update options
  }, [setOptions]); // Dependency array ensures this runs only when setOptions changes

  // Handle the "Enter" key press event
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      // Check if the pressed key is "Enter"
      try {
        let expression = inputValue; // Get the current input value
        // Replace labels in the input with their corresponding values
        options.forEach((option) => {
          const labelWithHash = `(#${option.label})`; // Format label with hash
          if (expression.includes(labelWithHash)) {
            expression = expression.replaceAll(labelWithHash, option.value); // Replace label with value
          }
        });
        // Evaluate the mathematical expression and round the result
        const calculatedResult =
          Math.round((eval(expression) + Number.EPSILON) * 100) / 100;
        setResult(calculatedResult); // Update the result state
        // Update the label text, truncating if it's too long
        setLabelText(
          inputValue.length > 10 ? inputValue.slice(0, 10) + "..." : inputValue
        );
      } catch {
        // Handle invalid expressions
        setResult("Invalid Expression"); // Set result to error message
        setLabelText("Invalid Expression"); // Set label text to error message
      }
    }
  }

  // Handle the "Backspace" key press event
  function handleKeyDown(event) {
    if (event.key === "Backspace") {
      // Check if the pressed key is "Backspace"
      const cursorPosition = inputRef.current.selectionStart; // Get the cursor position
      const textBeforeCursor = inputValue.slice(0, cursorPosition); // Text before the cursor
      const textAfterCursor = inputValue.slice(cursorPosition); // Text after the cursor
      const match = textBeforeCursor.match(/#\w+$/); // Match hashtags at the end of the text before the cursor
      if (match) {
        const hashtagStart = match.index; // Get the start index of the hashtag
        const updatedValue =
          textBeforeCursor.slice(0, hashtagStart - 1) + textAfterCursor; // Remove the hashtag
        setInputValue(updatedValue); // Update the input value
        event.preventDefault(); // Prevent the default backspace behavior
      }
    }
  }

  // Handle the reset button click event
  const handleReset = () => {
    setInputValue(""); // Clear the input value
    setResult(""); // Clear the result
    setLabelText("Enter Formula:"); // Reset the label text
  };

  // Render the Calculator component
  return (
    <div className="container">
      {/* Main functionality section */}
      <div className="main-functionality">
        {/* Label for the input field */}
        <label htmlFor="inputField" className="label">
          {labelText}
        </label>
        {/* Input field component */}
        <InputField
          inputValue={inputValue} // Pass the current input value
          onInputChange={(event) => setInputValue(event.target.value)} // Update input value on change
          onKeyPress={handleKeyPress} // Handle "Enter" key press
          onKeyDown={handleKeyDown} // Handle "Backspace" key press
          options={options} // Pass autocomplete options
          setInputValue={setInputValue} // Pass the function to update input value
          inputRef={inputRef} // Pass the input field reference
        />
        {/* Instruction text */}
        <p className="label ">press `Enter`</p>
        {/* Display the calculated result */}
        <p className="result">Result: {result}</p>
      </div>
      {/* Reset button */}
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

// Export the Calculator component as the default export
export default Calculator;

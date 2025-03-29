// Import React for creating components
import React from "react";
// Import the Select component from the react-select library
import Select from "react-select";
// Import the useQuery hook from the react-query library
import { useQuery } from "@tanstack/react-query";
// Import utility functions for filtering options and getting substring positions
import { getFilteredOptions, getSubstringPosition } from "./AutoComplete";

// Define an asynchronous function to fetch autocomplete data
async function fetchAutocompleteData() {
  // Fetch data from the mock API endpoint
  const response = await fetch(
    "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
  );
  // Throw an error if the response is not OK
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  // Parse the JSON response
  const data = await response.json();

  // Map the fetched data to a format suitable for the Select component
  return data.map((item) => {
    // Handle cases where the name or value is missing or invalid
    if (
      !item.name || // Check if the name is missing
      item.name.trim() === "" || // Check if the name is empty
      (typeof item.value === "string" && item.value.trim() === "") // Check if the value is an empty string
    ) {
      return {
        label: `${item.name || "Unnamed"} (disabled)`, // Use "Unnamed" if the name is missing
        value: item.value || null, // Use null if the value is missing
        isDisabled: true, // Mark the option as disabled
      };
    }
    // Return valid options with labels and values
    return {
      label: item.name, // Use the name as the label
      value: item.value, // Use the value as the value
      isDisabled: false, // Mark the option as enabled
    };
  });
}

// Define the InputField component
const InputField = ({
  inputValue, // Current input value
  onInputChange, // Function to handle input changes
  onKeyPress, // Function to handle key press events
  onKeyDown, // Function to handle key down events
  setInputValue, // Function to update the input value
  inputRef, // Reference to the input field
}) => {
  // Use the useQuery hook to fetch autocomplete data
  const {
    data: options = [], // Destructure the fetched options, defaulting to an empty array
    isLoading, // Loading state
    isError, // Error state
  } = useQuery({
    queryKey: ["autocompleteData"], // Unique key for the query
    queryFn: fetchAutocompleteData, // Function to fetch data
  });

  // Define custom styles for the Select component's options
  const listItemCustomStyles = {
    option: (provided, state) => ({
      ...provided, // Use default styles
      color: state.isDisabled ? "gray" : "darkblue", // Gray for disabled options, dark blue for others
      backgroundColor: state.isFocused ? "#f0f8ff" : "white", // Light blue for focused options, white for others
      cursor: state.isDisabled ? "not-allowed" : "pointer", // Pointer cursor for enabled options, not-allowed for disabled
    }),
  };

  // Display a loading message while data is being fetched
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Display an error message if data fetching fails
  if (isError) {
    return <p>Error loading autocomplete data.</p>;
  }

  // Render the input field and autocomplete dropdown
  return (
    <div style={{ position: "relative" }}>
      {/* Input field for user input */}
      <input
        type="text"
        id="inputField"
        className="input"
        value={inputValue} // Bind the input value
        onChange={onInputChange} // Handle input changes
        onKeyPress={onKeyPress} // Handle key press events
        onKeyDown={onKeyDown} // Handle key down events
        placeholder="e.g., 2+3+name" // Placeholder text
        ref={inputRef} // Attach the input reference
      />
      {/* Render the autocomplete dropdown if there are filtered options */}
      {getFilteredOptions(inputValue, options).length > 0 && (
        <div
          style={{
            position: "absolute", // Position the dropdown absolutely
            top: "100%", // Place it below the input field
            left: `${getSubstringPosition(inputValue)}px`, // Adjust the position based on the substring
            width: "auto", // Automatically adjust the width
          }}
        >
          {/* Select component for displaying filtered options */}
          <Select
            options={getFilteredOptions(inputValue, options)} // Pass filtered options
            onChange={(selectedOption) => {
              // Handle option selection
              if (selectedOption && !selectedOption.isDisabled) {
                // Replace the last word in the input with the selected option
                const updatedValue = inputValue.replace(
                  /[a-zA-Z]\w*$/, // Match the last word
                  `(#${selectedOption.label.replace(" (disabled)", "")})` // Replace it with the selected option's label
                );
                setInputValue(updatedValue + " "); // Update the input value
                inputRef.current.focus(); // Focus the input field
              }
            }}
            placeholder="Select a variable" // Placeholder text for the dropdown
            isClearable // Allow clearing the selection
            menuIsOpen={true} // Keep the dropdown menu open
            styles={listItemCustomStyles} // Apply custom styles
          />
        </div>
      )}
    </div>
  );
};

// Export the InputField component as the default export
export default InputField;

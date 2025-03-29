// Export an asynchronous function to fetch autocomplete data
export async function fetchAutocompleteData(setOptions) {
  try {
    // Send a GET request to the mock API endpoint
    const response = await fetch(
      "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
    );
    // Parse the JSON response
    const data = await response.json();
    // Format the fetched data into an array of objects with label and value properties
    const formattedOptions = data.map((item) => ({
      label: item.name, // Use the 'name' property as the label
      value: item.value, // Use the 'value' property as the value
    }));
    // Update the options state with the formatted data
    setOptions(formattedOptions);
  } catch (error) {
    // Log an error message if the fetch operation fails
    console.error("Error fetching data:", error);
  }
}

// Export a function to filter autocomplete options based on user input
export function getFilteredOptions(input, options) {
  // Match the last word in the input that starts with a letter
  const match = input.match(/[a-zA-Z]\w*$/);
  if (match) {
    // Extract the matched word as the search term
    const searchTerm = match[0];
    // Filter options whose labels start with the search term
    return options.filter((option) => option.label.startsWith(searchTerm));
  }
  // Return an empty array if no match is found
  return [];
}

// Export a function to find the position of a specific substring in the input
export function getSubstringPosition(inputValue) {
  // Find the last occurrence of the substring " name"
  const index = inputValue.lastIndexOf(" name");
  if (index !== -1) {
    // Return the position after the substring
    return index + 5;
  }
  // Return 0 if the substring is not found
  return 0;
}

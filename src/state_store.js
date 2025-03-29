// Import the 'create' function from the Zustand library to create a state store
import { create } from "zustand";

// Create a custom Zustand store for managing calculator state
const useCalculatorStore = create((set) => ({
  // Define the initial state for the input value
  inputValue: "",
  // Define the initial state for the result
  result: "",
  // Define the initial state for the label text
  labelText: "Enter Formula:",
  // Define the initial state for the autocomplete options
  options: [],
  // Define a function to update the input value in the state
  setInputValue: (value) => set({ inputValue: value }),
  // Define a function to update the result in the state
  setResult: (value) => set({ result: value }),
  // Define a function to update the label text in the state
  setLabelText: (value) => set({ labelText: value }),
  // Define a function to update the autocomplete options in the state
  setOptions: (value) => set({ options: value }),
}));

// Export the custom Zustand store as the default export
export default useCalculatorStore;

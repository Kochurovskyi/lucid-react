# Formula Input Functionality Task (React)#

This project implements a formula input functionality inspired by the UI and behavior seen in Causal. The goal was to replicate the hybrid input field with autocomplete, tag-based inputs, and formula evaluation features. Below is a summary of the task requirements, features implemented, and the current status of the project.

## Features Implemented

### State Management

Local State with Zustand:
Zustand is used to manage the local state of the formula input, including the input value, result, label text, and autocomplete options.
Status: ✅ Done

### API State with React Query:

React Query is used to fetch and manage the autocomplete suggestions from the provided API endpoint. Data validation was implemented.
Status: ✅ Done

### Formula Input Features

Supporting Operands Between Tags:
The input supports mathematical operators such as +, -, \*, /, \*\* (power), and parentheses ().
Status: ✅ Done

### Support for Adding Natural Numbers:

Users can input natural numbers (e.g., 1, 2, 3) as part of the formula.
Status: ✅ Done

### Supporting Writing Between Tags:

Users can write or edit text between tags seamlessly.
Status: ✅ Done

### Deleting a Tag with Backspace:

Tags can be deleted using the backspace key, with proper handling of cursor position and input updates.
Status: ✅ Done

### Autocomplete Suggestions:

Autocomplete suggestions are displayed based on the input, even after an operand is written.
Status: ⚠️ Partially Done (Basic functionality implemented, but improvements are needed for edge cases.)

### Dropdown Attached to Each Tag:

A dropdown menu attached to each tag for additional interactions was a mandatory feature.
Status: ❌ Not Done

### Calculating Values:

The formula input supports evaluating mathematical expressions with values from the endpoin with rounding to 2 decimals.
Status: ✅ Done

## Hosting and Submission

GitHub Repository: The source code is available on GitHub (here)
Hosted Version: The application is hosted on Vercel (link is in the end)

## Notes

### Focus on Functionality: The primary focus was on implementing the required functionality. Design was considered secondary but still given some attention.

Libraries and Tools: Zustand and React Query were used for state management, and React Select was used for dropdown functionality.

### Challenges:

Implementing the attached dropdown for each tag remains incomplete due to time constraints.

### How to Run the Project

Clone the repository from GitHub.
Install dependencies using npm install.
Start the development server using npm start.
Access the application in your browser at http://localhost:3000.

### ...or Just run it from here...:

www.

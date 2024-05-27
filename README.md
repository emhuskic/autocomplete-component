# Autocomplete React Typescript Component

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## How to Run the Application

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Implementation details
The AutocompleteInput component is a React component designed to provide autocomplete functionality for user input. 

It consists of a text input field - where users can type, and as they type, a list of suggestions dynamically appears below the input field.

These suggestions are fetched from an external API ([DataMuse](https://api.datamuse.com/sug)).

Users can navigate through the suggestions using keyboard arrow keys or mouse clicks, and when they select a suggestion, the input field is updated with the selected value.\
Additionally,  the AutocompleteInput component highlights the matching part of each suggestion, providing visual feedback to the user.

### AutocompleteInput component
Contains the Autocomplete behavioural logic, as well as rendering part. 
CSS for this component is defined in AutocompleteInput.css file in the same folder.

### useAutocompleteData hook
Handles fetching autocomplete suggestions based on a given word input. 

### useOutsideClick hook
Detects clicks outside of a container for which it is referenced and triggers a callback function when such clicks occur.

# React Focus Tracker

**React Focus Tracker** is a lightweight, robust React package that provides two hooks for tracking focus states in your applications. Use it to determine whether a specific DOM element is focused or whether the browser window is active. This can be extremely useful for enhancing user experience, accessibility, and interactivity in your React projects. 

 ## Table of Contents 

 - [Installation](#installation)
 - [Usage](#usage) 
   - [Element-Level Focus Tracking (`useFocusTracker`)](#element-level-focus-tracking-usefocustracker) 
   - [Window-Level Focus Tracking (`useWindowFocus`)](#window-level-focus-tracking-usewindowfocus)
 - [How It Works](#how-it-works) 
   - [useFocusTracker](#usefocustracker) 
   - [useWindowFocus](#usewindowfocus) 
 - [API Reference](#api-reference) 
 - [Contributing](#contributing) 
 - [License](#license) 
 
 --- 
 
 ## Installation 
 
 You can install **React Focus Tracker** via npm: 
 
 ```bash 
 npm install react-focus-tracker 
 ``` 
 
 Or using yarn: 
 
 ```bash 
 yarn add react-focus-tracker 
 ``` 
 
 --- 
 
 ## Usage 
 
 ### Element-Level Focus Tracking (`useFocusTracker`) 
 
 This hook allows you to track whether a specific DOM element (like an input field) is focused. It accepts a React ref pointing to the element, along with an optional configuration object. 
 
 #### Example: 
 
 ```jsx 
 import React, { useRef } from 'react'; 
 import { useFocusTracker } from 'react-focus-tracker'; 
 
 function FocusInput() { 
   const inputRef = useRef(null); 
   // Optionally pass options: { bubble: false, capture: false } 
   const isFocused = useFocusTracker(inputRef, { bubble: false, capture: false }); 
 
   return ( 
     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}> 
       <h2>Element Focus Tracker</h2> 
       <input 
         ref={inputRef} 
         placeholder="Click here..." 
         style={{ padding: '8px', width: '250px', fontSize: '16px' }} 
       /> 
       <p style={{ marginTop: '10px', color: isFocused ? 'green' : 'red' }}> 
         {isFocused ? 'Input is focused!' : 'Input is not focused.'} 
       </p> 
     </div> 
   ); 
 } 
 
 export default FocusInput; 
 ``` 
 
 ### Window-Level Focus Tracking (`useWindowFocus`) 
 
 This hook detects whether the browser window is currently active (focused) or not. 
 
 #### Example: 
 
 ```jsx 
 import React from 'react'; 
 import { useWindowFocus } from 'react-focus-tracker'; 
 
 function WindowFocusStatus() { 
   const isWindowFocused = useWindowFocus(); 
 
   return ( 
     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}> 
       <h2>Window Focus Tracker</h2> 
       <p style={{ fontSize: '18px', color: isWindowFocused ? 'blue' : 'gray' }}> 
         {isWindowFocused ? 'Welcome back! The window is active.' : 'The window is not active.'} 
       </p> 
     </div> 
   ); 
 } 
 
 export default WindowFocusStatus; 
 ``` 
 
 --- 
 
 ## How It Works 
 
 ### useFocusTracker 
 
 The `useFocusTracker` hook monitors the focus state of a specific DOM element: 
 
 - **Ref Validation:**  
   It accepts a React ref (`ref.current`) and verifies that it points to a valid DOM element. If the ref is not valid, a warning is logged. 
 
 - **Event Listeners:**  
   Depending on the configuration options, it attaches either non-bubbling (`focus`/`blur`) or bubbling (`focusin`/`focusout`) event listeners.  
   - The `bubble` option lets you choose bubbling events. 
   - The `capture` option determines if the events should be captured in the capturing phase. 
 
 - **Initial Focus Check:**  
   When the component mounts, it checks if the element is already focused (by comparing `document.activeElement` with the element) and sets the state accordingly. 
 
 - **Cleanup:**  
   The hook removes the event listeners when the component unmounts or if the ref or options change, preventing memory leaks. 
 
 ### useWindowFocus 
 
 The `useWindowFocus` hook tracks whether the browser window is active: 
 
 - **Browser Environment Check:**  
   It first ensures that the code is running in a browser environment (important for server-side rendering). 
 
 - **Initial State:**  
   The initial state is determined using `document.hasFocus()`, ensuring an accurate starting point for the window's focus state. 
 
 - **Event Listeners:**  
   The hook listens for: 
   - `focus` and `blur` events on the `window` to detect when the window gains or loses focus. 
   - The `visibilitychange` event on the `document` to detect when the page becomes hidden or visible (e.g., switching tabs). 
 
 - **State Synchronization:**  
   An `updateFocus` function synchronizes the state with the current focus status. 
 
 - **Cleanup:**  
   All event listeners are removed on component unmount to avoid memory leaks. 
 
 --- 
 
 ## API Reference 
 
 ### `useFocusTracker(ref, options)` 
 
 - **Parameters:** 
   - `ref` (Object): A React ref object pointing to a DOM element. 
   - `options` (Object, optional): 
     - `bubble` (boolean): If true, uses bubbling events (`focusin`/`focusout`). Defaults to `false`. 
     - `capture` (boolean): Whether to use event capturing. Defaults to `false`. 
 
 - **Returns:**  
   - `isFocused` (boolean): `true` if the element is focused; `false` otherwise. 
 
 ### `useWindowFocus()` 
 
 - **Parameters:**  
   None. 
 
 - **Returns:**  
   - `isWindowFocused` (boolean): `true` if the window is active; `false` otherwise. 
 
 --- 
 
 ## Contributing 
 
 Contributions are welcome! If you’d like to improve **React Focus Tracker**, please follow these steps: 
 
 1. **Fork the repository.** 
 2. **Create a new branch** for your feature or bug fix. 
 3. **Write tests** for your changes. 
 4. **Submit a pull request** with a detailed description of your changes. 
 
 For major changes, please open an issue first to discuss what you would like to change. 
 
 --- 
 
 ## License 
 
 **React Focus Tracker** is licensed under the [MIT License](LICENSE). 
 
 --- 
 
 Thank you for using **React Focus Tracker**! If you have any questions or suggestions, feel free to reach out.

import React from "react";

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div>
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  );
}
/*This code defines a React functional component named Pagination. This component takes two props as arguments: gotoNextPage and gotoPrevPage. These props are functions that will be used to navigate to the next and previous pages, respectively. The component renders a pagination UI with "Previous" and "Next" buttons.
 
 1. import React from "react";: Imports the React module, which is required to create and work with React components.

2. export default function Pagination({ gotoNextPage, gotoPrevPage }) {: This line exports the Pagination component as the default export of the module. The component is defined as a JavaScript function that takes two props, gotoNextPage and gotoPrevPage.

3. The return statement starts the JSX code block that represents the component's UI.

4. {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}: This line checks if the gotoPrevPage prop is defined. If it is, it renders a "Previous" button using JSX. The onClick event handler of the button is set to the value of the gotoPrevPage prop, which means clicking the button will call the gotoPrevPage function.

5. {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}: Similar to the previous line, this line checks if the gotoNextPage prop is defined. If it is, it renders a "Next" button using JSX. The onClick event handler of the button is set to the value of the gotoNextPage prop, which means clicking the button will call the gotoNextPage function.

6. </div>: Closes the wrapping <div> element that contains the pagination buttons.

In summary, this Pagination component provides a simple pagination user interface that displays "Previous" and "Next" buttons, and it uses the provided gotoPrevPage and gotoNextPage functions to handle the navigation logic. The buttons are only rendered if the corresponding navigation functions are provided as props.

 */

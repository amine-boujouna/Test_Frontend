# TestBoujounaAmine

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.13.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Setup Backend

Make sure you have a backend server running on http://localhost:8081. This appears to be the base URL for your backend API.

Ensure that the backend has endpoints for getting all books, adding a book, updating a book, deleting a book, and getting a book by its ID. These endpoints seem to be /books/GetAllBooks, /books/AddBook, /books/updatebook, /books/deletebook/:id, and /books/GetbookbyId/:id respectively.

## Setup Frontend

nsure you have Angular CLI installed globally on your machine.

Navigate to the root directory of your Angular project.

Install dependencies by running npm install.

After the dependencies are installed, you can start the Angular development server by running ng serve.

By default, the Angular development server runs on http://localhost:4200.

## Interacting with the Frontend
Once both the backend server and the Angular development server are running, open your web browser.

Navigate to http://localhost:4200 (or wherever your Angular development server is running).

You should see the "Book Management" interface.

You can use the interface to perform CRUD (Create, Read, Update, Delete) operations on books.

Click on the "Add" button to add a new book. This should navigate you to a page where you can fill in the details of the new book.

You can edit existing books by clicking on the edit button (pencil icon) next to each book entry.

You can delete a book by clicking on the delete button (trash can icon) next to each book entry.


## Handling Errors

If any errors occur during the interaction with the frontend, error messages will be displayed on the interface.

If a retry option is available, you can click on the "Try again" button to attempt the action again.

## Success Messages
If operations are successful, success messages will be displayed on the interface.

## Pagination
The interface includes pagination functionality at the bottom using mat-paginator from Angular Material. You can use this to navigate through pages if there are many books.


## Add Book Section

This section allows users to add a new book to the system.

It includes a form with fields for the title, author, ISBN, and publication year.

Each input field has validation logic to ensure that the required fields are filled and that the input formats are correct.

If there's an error (e.g., a required field is empty or an invalid input format), an error message is displayed.

Users can click the "Add" button to submit the form and add the book.

If the operation is successful, a success message is displayed.


## Update Book Section

This section allows users to update an existing book in the system.

Similar to the "Add Book" section, it includes a form with fields for the title, author, ISBN, and publication year.

Each input field also has validation logic.

Users can click the "Update book" button to submit the form and update the book.

If the operation is successful, a success message is displayed


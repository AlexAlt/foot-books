# 🦶 Books
This is a Node.js side project by [@AlexAlt](https://github.com/AlexAlt/) designed for learning and experimenting with Node.js. The app serves as a collaborative platform where the Footies can contribute to our book club's "To Be Read" (TBR) list, and it randomly selects the next book for the group to read.

---

## Architecture Overview

The app follows a simple yet modular architecture to ensure scalability and maintainability. Below is an overview of its key components:

### 1. **Backend**
- **Framework**: Built using Node.js with Express.js for handling HTTP requests and routing.
- **Database**: Connected to a MongoDB instance for storing book data (e.g., titles, authors, and statuses).

### 2. **Frontend**
- **Templating Engine**: Uses Pug for rendering dynamic HTML pages.
- **Styling**: Basic CSS for a clean and minimal user interface. Contributions for improved styling are welcome!
- Front end was generated vibe-coding style with CoPilot

### 3. **APIs**
- **Endpoints**:
  - `GET /books`: Returns the full list of books in the DB.
  - `POST /books`: Add a new book to the TBR list.
  - `PATCH /books/:id`: Update an existing book.
  - `GET /books/currently-reading`: Return the book that is currently being read by the group.
  - `GET books/sorted-books`: Returns the list of books in the DB sorted by their read status.
  - `GET /books/next-read`: Retrieve a random next book to read.
  - `POST /login`: Authenticate a user and start a session.
  
- **Validation**: Input validation is implemented to ensure data integrity.

### 4. **Testing**
- **Framework**: Jest is used for unit testing models and util classes.

---

## Contributing Guidelines

### Pull Requests
- All pull requests must be approved by at least one existing contributor before merging.

### Branch Naming Conventions
Use a descriptive branch name that includes the type of work being done. Examples:
```
feature/add-form-field-for-book
bugfix/fix-random-selection-logic
```

## Future Enhancements
- Add better user authentication.
- Add more comprehensive testing.
- Enhance the UI/UX with modern frameworks like React or Vue.js.
- Modernizing with Typescript.
- Implement better JS best practices.

---

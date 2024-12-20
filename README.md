# Bookstore API
This is a simple Express-based API for managing a bookstore. It supports CRUD operations (Create, Read, Update, and Delete) for books. The data is stored in a JSON file, and the server runs on port `3001`.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [File Structure](#file-structure)
- [License](#license)

## Installation

1.**Clone this repository to your local machine:**

   ```bash
   git clone https://github.com/Tsageon/BooksDirectoryApi.git
   cd into the folder

2.**Install the dependencies:**

```bash
npm i 

3.**Run the server:**
  
  ```bash
  node BookApi.js

## Api EndPoints
I recommend using Postman for this: 

GET /bookstore
Gets all books

POST /bookstore
Add a new book to the bookstore.
use this format
{
  "title": "Book Title",
  "author": "Author Name",
  "publisher": "Publisher Name",
  "publishedDate": "2024-01-01",
  "isbn": 1234567890
}

PUT /bookstore
Update an existing book by ISBN.

DELETE /bookstore
Delete a book from the bookstore using its ISBN.

You must suffer as I have suffered through testing

### Key Features and Notes:
- **Automatic File Creation:** When the server starts, it will automatically create the `Books` directory and `bookstore.json` file if they do not exist.
- **Data Validation:** The API validates the data for required fields (`title`, `author`, `publisher`, `publishedDate`, `isbn`) for POST and PUT requests.
- **ISBN Uniqueness:** The API prevents adding a book with an existing ISBN.
- **Server Port:** The server runs on port `3001`. You can modify this in the `server.js` file if necessary.

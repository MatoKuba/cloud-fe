# OpenAPI
```yaml
# OpenAPI
openapi: 3.0.3
info:
  title: Wete3 Library - OpenAPI
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
  version: 1.0.11
tags:
  - name: bookCategories
    description: Book categories such as Romance, Sci-fi etc.
  - name: books
    description: Books such as Dune, Lord of the rings etc.
  - name: customers
    description: Customers - as people who can borrow a book.
  - name: borrowings
    description: Which book is borrowed by which customer.

paths:
  /books:
    post:
      tags:
        - books
      summary: Create book
      operationId: createBook
      requestBody:
        description: Update an existent book in the store
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateBookDto'
        required: true
      responses:
        '201':
          description: CREATED
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BookDto'
        '400':
          description: Bad request
        '404':
          description: Not found
        '405':
          description: Validation exception
    get:
      tags:
        - books
      summary: Get all books or filtered by name
      operationId: getBooks
      parameters:
        - name: name
          in: query
          description: Name of book to filter with
          required: false
          schema:
            type: string
        - name: categoryId
          in: query
          description: Book category to filter with
          required: false
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BooksDto'
        '405':
          description: Invalid input

  /books/{bookId}:
    get:
      tags:
        - books
      summary: Find book by ID
      operationId: getBookById
      parameters:
        - name: bookId
          in: path
          description: ID of book to return
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BookDto'
        '400':
          description: Bad request
        '404':
          description: Not found
    put:
      tags:
        - books
      summary: Updates a book
      operationId: updateBook
      parameters:
        - name: bookId
          in: path
          description: ID of book that needs to be updated
          required: true
          schema:
            type: integer
            format: int64
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateBookDto'
      responses:
        '405':
          description: Invalid input
        '200':
          description: Ok

    delete:
      tags:
        - books
      summary: Deletes a book
      operationId: deleteBook
      parameters:
        - name: bookId
          in: path
          description: Book id to delete
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '400':
          description: Bad request
        '200':
          description: Ok

  /books/{bookId}/bookCategory/{bookCategoryId}:
    put:
      tags:
        - books
      summary: Add category to book
      operationId: addBookCategory
      parameters:
        - name: bookId
          in: path
          description: ID of book that needs to be updated
          required: true
          schema:
            type: integer
            format: int64
        - name: bookCategoryId
          in: path
          description: ID of bookCategory that needs to be updated
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '405':
          description: Invalid input
        '200':
          description: Ok

    delete:
      tags:
        - books
      summary: Deletes a category from book
      operationId: deleteSpecificBookCategory
      parameters:
        - name: bookId
          in: path
          description: ID of book that needs to be updated
          required: true
          schema:
            type: integer
            format: int64
        - name: bookCategoryId
          in: path
          description: ID of bookCategory that needs to be updated
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '400':
          description: Bad request
        '200':
          description: Ok


  /customers:
    post:
      tags:
        - customers
      summary: Create customer
      operationId: createCustomer
      requestBody:
        description: Update an existent customer in the store
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateCustomerDto'
        required: true
      responses:
        '201':
          description: CREATED
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CustomerDto'
        '400':
          description: Bad request
        '404':
          description: Not found
        '405':
          description: Validation exception
    get:
      tags:
        - customers
      summary: Get all customers or filtered by name
      operationId: getCustomers
      parameters:
        - name: firstName
          in: query
          description: First name to filter with
          required: false
          schema:
            type: string
        - name: lastName
          in: query
          description: Last name to filter with
          required: false
          schema:
            type: string
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CustomersDto'
        '405':
          description: Invalid input

  /customers/{customerId}:
    get:
      tags:
        - customers
      summary: Find customer by ID
      operationId: getCustomerById
      parameters:
        - name: customerId
          in: path
          description: ID of customer to return
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CustomerDto'
        '400':
          description: Bad request
        '404':
          description: Not found
    put:
      tags:
        - customers
      summary: Updates a customer
      operationId: updateCustomer
      parameters:
        - name: customerId
          in: path
          description: ID of customer that needs to be updated
          required: true
          schema:
            type: integer
            format: int64
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateCustomerDto'
      responses:
        '405':
          description: Invalid input

    delete:
      tags:
        - customers
      summary: Deletes a customer
      operationId: deleteCustomer
      parameters:
        - name: customerId
          in: path
          description: Customer id to delete
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '400':
          description: Bad request

  /bookCategories:
    post:
      tags:
        - bookCategories
      summary: Create book category
      operationId: createBookCategory
      requestBody:
        description: Update an existent book category in the database
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateBookCategoryDto'
        required: true
      responses:
        '201':
          description: CREATED
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BookCategoryDto'
        '400':
          description: Bad request
        '404':
          description: Not found
        '405':
          description: Validation exception
    get:
      tags:
        - bookCategories
      summary: Get all bookCategory or filtered by name
      operationId: getBookCategories
      parameters:
        - name: name
          in: query
          description: Name of category to filter with
          required: false
          schema:
            type: string
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BookCategoriesDto'
        '405':
          description: Invalid input

  /bookCategories/{bookCategoryId}:
    get:
      tags:
        - bookCategories
      summary: Find book category by ID
      operationId: getBookCategoryById
      parameters:
        - name: bookCategoryId
          in: path
          description: ID of book category to return
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BookCategoryDto'
        '400':
          description: Bad request
        '404':
          description: Not found
    put:
      tags:
        - bookCategories
      summary: Updates a book
      operationId: updateBookCategory
      parameters:
        - name: bookCategoryId
          in: path
          description: ID of book category that needs to be updated
          required: true
          schema:
            type: integer
            format: int64
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateBookCategoryDto'
      responses:
        '405':
          description: Invalid input

    delete:
      tags:
        - bookCategories
      summary: Deletes a bookCategory
      operationId: deleteBookCategory
      parameters:
        - name: bookCategoryId
          in: path
          description: Book category id to delete
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '400':
          description: Bad request

  /borrowings:
    post:
      tags:
        - borrowings
      summary: Create borrowing
      operationId: createBorrowing
      requestBody:
        description: Update an existent borrowing in the database
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateBorrowingDto'
        required: true
      responses:
        '201':
          description: CREATED
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BorrowingDto'
        '400':
          description: Bad request
        '404':
          description: Not found
        '405':
          description: Validation exception
    get:
      tags:
        - borrowings
      summary: Get all borrowings or filtered by name
      operationId: getBorrowings
      parameters:
        - name: bookId
          in: query
          description: BookId to filter with
          required: false
          schema:
            type: integer
            format: int64
        - name: customerID
          in: query
          description: CustomerId to filter with
          required: false
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BorrowingsDto'
        '405':
          description: Invalid input

  /borrowing/{borrowingId}:
    get:
      tags:
        - borrowings
      summary: Find borrowing by ID
      operationId: getBorrowingById
      parameters:
        - name: borrowingId
          in: path
          description: ID of borrowing to return
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BorrowingDto'
        '400':
          description: Bad request
        '404':
          description: Not found
    put:
      tags:
        - borrowings
      summary: Updates a borrowing
      operationId: updateBorrowing
      parameters:
        - name: borrowingId
          in: path
          description: ID of borrowing that needs to be updated
          required: true
          schema:
            type: integer
            format: int64
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateBorrowingDto'
      responses:
        '405':
          description: Invalid input

    delete:
      tags:
        - borrowings
      summary: Deletes a borrowing
      operationId: deleteBorrowing
      parameters:
        - name: borrowingId
          in: path
          description: Borrowing id to delete
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '400':
          description: Bad request

components:
  schemas:
    CreateBookDto:
      required:
        - name
        - author
      properties:
        name:
          type: string
          example: Dune
        author:
          type: string
          description: Name of author of the book
          example: Frank Herbert
        count:
          type: integer
          format: int64
          example: 117
          default: 0


    BookDto:
      properties:
        id:
          type: integer
          format: int64
          example: 10
        name:
          type: string
          example: Surely you're joking Mr Feynman!
        author:
          type: string
          description: Name of author of the book
          example: Richard P. Feynman
        categories:
          type: array
          items:
            $ref: '#/components/schemas/BookCategoryDto'
        count:
          type: integer
          format: int64
          example: 45
        status:
          type: string
          description: book status for borrow
          enum:
            - AVAILABLE
            - NOT_AVAILABLE
        isbn:
          type: string
          example: 9788022213882


    BooksDto:
      properties:
        books:
          type: array
          items:
            $ref: '#/components/schemas/BookDto'


    CreateBookCategoryDto:
      required:
        - name
      properties:
        name:
          type: string
          example: Sci-fi

    BookCategoryDto:
      properties:
        id:
          type: integer
          format: int64
          example: 10
        name:
          type: string
          example: Sci-fi

    BookCategoriesDto:
      properties:
        bookCategories:
          type: array
          items:
            $ref: '#/components/schemas/BookCategoryDto'

    CreateCustomerDto:
      required:
        - firstName
        - lastName
        - email
      properties:
        firstname:
          type: string
          example: John
        lastName:
          type: string
          example: Carrot
        email:
          type: string
          example: john.carrot@mail.com

    CustomerDto:
      properties:
        id:
          type: integer
          format: int64
          example: 10
        firstName:
          type: string
          example: John
        lastName:
          type: string
          example: Carrot
        email:
          type: string
          example: john.carrot@mail.com
    CustomersDto:
      properties:
        customers:
          type: array
          items:
            $ref: '#/components/schemas/CustomerDto'

    CreateBorrowingDto:
      required:
        - bookId
        - customerId
      properties:
        bookId:
          type: integer
          format: int64
          example: 1
        customerId:
          type: integer
          format: int64
          example: 10

    BorrowingDto:
      properties:
        id:
          type: integer
          format: int64
          example: 10
        book:
          $ref: '#/components/schemas/BookDto'
        customer:
          $ref: '#/components/schemas/CustomerDto'
        dateOfBorrowing:
          type: string
          format: date
          example: 2017-07-21

    BorrowingsDto:
      properties:
        borrowings:
          type: array
          items:
            $ref: '#/components/schemas/BorrowingDto'

```

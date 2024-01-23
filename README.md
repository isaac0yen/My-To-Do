# My To-Do Software

Welcome to My To-Do, a versatile software that helps you keep track of tasks, events, and more. Never miss a deadline again with our intuitive to-do list application.

## Features

- Record and manage tasks with date and time details.
- Receive notifications on your laptop for upcoming events.
- Email reminders to ensure you stay on top of your to-do list.

## Table of Contents

- [My To-Do Software](#my-to-do-software)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Project Structure](#project-structure)
  - [Frontend (React)](#frontend-react)
  - [Backend](#backend)
  - [AI Integration](#ai-integration)
  - [Installation](#installation)
  - [Contact Information](#contact-information)

## Technologies Used

- **Apollo Server:** Version 4.9.5
- **Generative AI (Gemini-Pro):** Version 0.1.3
- **GraphQL:** Version 16.8.1
- **MongoDB:** Version 6.3.0

## Project Structure

```My-To-Do
|-- client
|   |-- public
|   |   |-- favicon.ico
|   |   |-- index.html
|   |   |-- manifest.json
|   |-- src
|       |-- App.css
|       |-- App.js
|       |-- component
|       |   |-- Form.js
|       |   |-- Home.js
|       |-- gql
|           |-- gql.js
|       |-- index.js
|-- server
|   |-- helpers
|   |   |-- AI.js
|   |   |-- HTML.js
|   |   |-- Mail.js
|   |   |-- MongoDB.js
|   |   |-- ThrowError.js
|   |   |-- Validate.js
|   |-- resolvers
|   |   |-- Category.js
|   |   |-- Event.js
|   |   |-- index.js
|   |-- index.js
|   |-- Mail.js
|   |-- package.json
|   |-- package-lock.json
|   |-- prompt.txt
|   |-- typedefs.js
```

## Frontend (React)

The frontend of the application is built using React. It includes the following directories and files:

- **src/App.css:** Styles for the main application.
- **src/App.js:** Main component of the application.
- **src/component/Form.js:** Form component for task input.
- **src/component/Home.js:** Home component for displaying tasks.
- **src/gql/gql.js:** GraphQL queries.

## Backend

The backend is powered by Apollo Server for GraphQL, MongoDB for data storage, and various helper functions for additional functionalities.

## AI Integration

Gemini-Pro is used for AI integration to generate different styles of emails for reminders.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/isaac0yen/My-To-Do.git
   ```

2. Install dependencies for both the client and server:

   ```bash
   cd My-To-Do/client
   npm install

   cd ../server
   npm install
   ```

3. Run the application:

   ```bash
   # Start the client
   cd ../client
   npm start

   # Start the server
   cd ../server
   npm start
   ```

## Contact Information

For inquiries and support, please contact Isaac Oyeniyi at isaacoyeniyi06@gmail.com.

Feel free to reach out for any questions, feedback, or collaboration opportunities.

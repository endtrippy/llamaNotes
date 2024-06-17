# LlamaNotes

Welcome to **LlamaNotes**, a notes app with a llama. Below is a guide to help you get started, understand the technologies used, and manage the project effectively.

## Watch the Video and [Checkout the Site](https://llama-notes.vercel.app/)

![LlamaNotes Tour](./src/media/LlamaNotesTour.gif)

## Project Overview

LlamaNotes is a web-based notes application designed to offer users a fun take on the classic notes app. This project uses modern web technologies.

## Features

- Create and Read notes, everyone can post and your posts are permanent.
- CI/CD via Vercel/Github
- Attractive and responsive UI built for mobile first use.
- Llama 3 themed logo and design.
- Secure data handling with AWS DynamoDB.
- Llama Button, has Llama 3 generate a prefilled note.

## Technologies Used

- **React**: For building the user interface.
- **Vercel**: For deployment, hosting, and CI/CD integration.
- **Express**: For handling backend server operations.
- **AWS SDK**: For interacting with AWS DynamoDB.
- **UUID**: For generating unique note identifiers.
- **Body-Parser**: For parsing incoming request bodies in middleware.
- **Cors**: For enabling Cross-Origin Resource Sharing.
- **Nodemon**: For automatic server restarts during development.
- **Babel**: For compiling modern JavaScript.
- **Dotenv**: For managing environment variables.
- **HTML**: For structuring the web pages.
- **CSS**: For styling the application.
- **Replicate**: For enabling LLM integrations in our API.
- **Concurrently**: For running multiple commands (e.g., starting backend and frontend servers) simultaneously in a single terminal.

## Setup and Installation

To set up and run this project locally, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/endtrippy/llamaNotes.git
   cd LlamaNotes
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of your project and add the necessary variables. Fill these in with your AWS Dynamo info but keep the
   `REACT_APP_BASE_URL=http://localhost:3001` for dev.
   ```
   AWS_REGION=your-aws-region
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   REACT_APP_BASE_URL=http://localhost:3001
   REPLICATE_API_TOKEN=your-api-token
   ```
4. **Start the frontend/backend development servers simultaneously**:
   This command should start both servers in one terminal.

   ```sh
   npm run dev
   ```

   To start separately you may use:

   - `npm start`: to start the frontend
   - `npm run back`: to start the backend

   Please note:

   - For convenience ports 3000 and 3001 are killed before dev enviroment starts:
     - This only works for unix based systems and will fail on windows
       - `"dev": "concurrently \"lsof -ti :3000 -ti :3001 | xargs kill -9\" \"nodemon api/index.js\" \"react-scripts start\""`
     - If you are on windows just remove the first command and manage your ports accordingly
       - `"dev": "concurrently \"nodemon api/index.js\" \"react-scripts start\""`
   - These edits can be made in `package.json` under scripts.

## Project Structure

Here is an overview of the project structure:

- `public/`: Contains the public assets and the HTML file.
- `src/`: Contains the source code for the React application.
- `/api/index.js`: Express server file for handling backend operations.
- `.env`: Environment variables file (not included in the repository for security reasons).
- `package.json`: Lists the project dependencies and scripts.
- `nodemon.json`: Configuration file for what nodemon should watch/ignore.
- `vercel.json`: Configuration file for Vercel deployment.

## How to Contribute

If you want to contribute to LlamaNotes, follow these steps:

# Steps to Contribute

1. **Fork the repository**.

2. **Clone the forked repository to your local machine**:

   ```sh
   git clone https://github.com/endtrippy/llamaNotes.git
   ```

3. **Create a new branch**:

   ```sh
   git checkout -b feature-branch
   ```

4. **Make your changes**.

5. **Stage your changes**:

   ```sh
   git add .
   ```

6. **Commit your changes**:

   ```sh
   git commit -m "Add your message"
   ```

7. **Push to the branch**:

   ```sh
   git push origin feature-branch
   ```

8. **Open a pull request**.

## Upcoming Features

- `Users` and `User Profiles`: login with profiles.
- `Update` and `Delete` notes: do more with your notes.

## License

This project is licensed under the MIT License.

## Acknowledgments

Thanks to all contributors and the open-source community for their support and tools that made this project possible. As well as GPT-4 and Llama 3.

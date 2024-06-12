# LlamaNotes

Welcome to **LlamaNotes**, a notes app with a llama theme. Below is a guide to help you get started, understand the technologies used, and manage the project effectively.

## Watch the Video

<div style="display: flex; justify-content: center;">
  <video controls style="width: 100%; max-width: 800px; height: auto;" autoplay loop muted>
    <source src="./src/media/LlamaNotesTour.mov" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

## Project Overview

LlamaNotes is a web-based notes application designed to offer users a fun take on the classic notes app. This project uses modern web technologies.

## Features

- Create and Read notes, everyone can post and your post are permament.
- Attractive and responsive UI built for mobile first use.
- Llama-themed logo and design.
- Secure data handling with AWS DynamoDB.

## Technologies Used

- **React**: For building the user interface.
- **Express**: For handling backend server operations.
- **AWS SDK**: For interacting with AWS DynamoDB.
- **UUID**: For generating unique note identifiers.
- **Body-Parser**: For parsing incoming request bodies in a middleware.
- **Cors**: For enabling Cross-Origin Resource Sharing.
- **Nodemon**: For automatic server restarts during development.
- **Babel**: For compiling JavaScript.
- **Dotenv**: For managing environment variables.

## Setup and Installation

To set up and run this project locally, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/LlamaNotes.git
    cd LlamaNotes
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root of your project and add the necessary variables. Fill these in with your AWS Dynamo
    ```
    AWS_REGION=your-aws-region
    AWS_ACCESS_KEY_ID=your-access-key-id
    AWS_SECRET_ACCESS_KEY=your-secret-access-key
    ```

4. **Start the development server**:
    ```sh
    npm start
    ```

5. **Run the backend server**:
    ```sh
    npm run dev
    ```

## Project Structure

Here is an overview of the project structure:

- `public/`: Contains the public assets and the HTML file.
- `src/`: Contains the source code for the React application.
- `server.js`: Express server file for handling backend operations.
- `.env`: Environment variables file (not included in the repository for security reasons).
- `package.json`: Lists the project dependencies and scripts.

## How to Contribute

If you want to contribute to LlamaNotes, follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
    ```sh
    git checkout -b feature-branch
    ```

3. **Make your changes**.
4. **Commit your changes**:
    ```sh
    git commit -m "Add your message"
    ```

5. **Push to the branch**:
    ```sh
    git push origin feature-branch
    ```

6. **Open a pull request**.

## Upcoming Features

- `Llama button`: will prefill the note modal with random thoughts from Meta's Llama 3.

## License

This project is licensed under the MIT License.

## Acknowledgments

Thanks to all contributors and the open-source community for their support and tools that made this project possible. As well as GPT-4 and Llama 3.

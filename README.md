# Pinterest Clone

This is a Pinterest clone built using Node.js, Express, Passport, Multer, HTML, CSS, and MongoDB. The application allows users to create profiles, upload photos, and view a feed of posts from other users.

## Features

- User authentication using Passport
- Profile creation and management
- Photo uploading using Multer
- Feed displaying posts from all users

## Tech Stack

- Node.js (Express) for the server side
- MongoDB database with Mongoose
- Passport.js for user authentication
- Multer for file handling
- EJS templating engine
- CSS for styling

## Prerequisites

Before you can run this application, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (includes npm)
- [MongoDB](https://www.mongodb.com/) installed and running

## Cloning and Running the App

Follow these steps to clone the repository and install dependencies:

1. Clone the repository to your local machine:

    ```
    git clone https://github.com/your-username/pinterest-clone.git
    ```

2. Navigate to the project directory:

    ```
    cd pinterest-clone
    ```

3. Install the dependencies using npm:

    ```
    npm install
    ```

4. Set up your MongoDB configuration:
   
    - Make sure MongoDB is running on your machine.
    - Update the MongoDB connection string in the `config/database.js` file if necessary.

5. Start the application:

    ```
    npx nodemon
    ```

6. Access the application in your web browser at `http://localhost:3000`.



## Contributing

Feel free to contribute to this project by submitting bug reports, feature requests, or pull requests. Your feedback is highly appreciated!

## License

This project is licensed under the MIT License - see the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.

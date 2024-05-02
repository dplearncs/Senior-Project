TellyCrate storage organizing solution
TellyCrate Organizer is a web application designed to help users efficiently organize their belongings into boxes and easily locate them when needed. It utilizes a basic CRUD (Create, Read, Update, Delete) functionality for managing items and boxes.

* Features
  Item Management: Add, edit, and delete items.
  Box Management: Create, label, and manage boxes for organizing items.
  User Authentication: Secure login system to protect user data.
  Responsive Design: Optimized for use on various devices.

* Technologies Used
  Frontend: React.js, Tailwind CSS
  Backend: Node.js, Express.js
  Database: MySql

* Installation
  Create MySql database on your local machine.
      MySql query files are located at: 
      https://github.com/dplearncs/Senior-Project
  If you get an error please run the following command: 
      “ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Lamadey123|;”
      Replace the password with your mySql local connection password.
      The password used in the project is in the .env file located in server directory.
  Install dependencies for Client and server

Usage
  The Client is running on the default react port which http://localhost:3000/ and the server is running on the http://localhost:5050/.
  Run server and client in two different cmd prompts and it should fire up the web app.

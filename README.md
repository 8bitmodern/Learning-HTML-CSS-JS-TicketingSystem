Yep — you want it to read like a **normal README/documentation file**, not like an AI-generated numbered tutorial. Here is one continuous Markdown block you can drop directly into `README.md`:

````markdown
# IT Helpdesk Ticketing System

This project is a basic IT Helpdesk Ticketing System built using HTML, CSS, JavaScript, Node.js, Express, bcrypt, Express Session, and JSON files. The frontend is located in the `public` folder, while the Node.js backend and JSON files are located in the main project folder. The application allows anyone to access the main helpdesk page and submit a ticket, while the internal ticket portal requires authentication.

## Project Structure

The project should be kept in the following structure:

```text
IT Helpdesk Ticketing System/
│
├── server.js
├── create-user.js
├── tickets.json
├── users.json
├── package.json
├── package-lock.json
│
└── public/
    ├── index.html
    ├── login.html
    ├── tickets.html
    ├── style.css
    ├── script.js
    └── login.js
````

The `public` folder contains the website files. `index.html` is the public helpdesk page, `login.html` contains the login form, and `tickets.html` is the protected internal ticket portal. `style.css` controls the appearance of the website, while `script.js` handles ticket submission and `login.js` handles the login process. The `server.js` file runs the Node.js and Express backend. `tickets.json` is used as a simple database for storing submitted tickets, and `users.json` stores the authorized user account and its password hash. `create-user.js` is a setup script used to create the initial user account.

## Requirements

Node.js LTS is required to run the project. Node.js can be downloaded from [https://nodejs.org/](https://nodejs.org/). After installing Node.js, PowerShell can be used to verify that it is installed by running `node --version` and `npm --version`. A web browser is also required. VS Code is recommended for viewing or editing the project files, but it is not required to run the application.

## Installation

Once the project files have been copied to the computer, open PowerShell and navigate to the `IT Helpdesk Ticketing System` folder. If the project was provided with `package.json` and `package-lock.json`, the required Node.js packages can be installed by running:

```powershell
npm install
```

The project uses Express for the web server, bcrypt for password hashing, and express-session for user authentication sessions. If the project does not include a `package.json` file, initialize the Node.js project with:

```powershell
npm init -y
```

and then install the required packages with:

```powershell
npm install express bcrypt express-session
```

## Database Files

The application uses JSON files for simple data storage. `tickets.json` should exist in the same folder as `server.js` and should contain an empty JSON array when starting the project:

```json
[]
```

`users.json` should also exist in the same folder and can initially contain:

```json
[]
```

The server will add submitted tickets to `tickets.json`. User information is stored in `users.json`, with passwords being stored as bcrypt hashes instead of plain-text passwords.

## Creating the Login Account

Before using the internal ticket portal, an account needs to be created. Open `create-user.js` and set the username and password that should be used for the application. After saving the file, run the following command from the project folder:

```powershell
node create-user.js
```

The script will create the user account and store the password as a bcrypt hash inside `users.json`. Once the account has been successfully created, `create-user.js` can be removed if it is no longer needed.

## Running the Application

After Node.js and the required packages have been installed and a user account has been created, the application can be started from PowerShell with:

```powershell
node server.js
```

The server should display:

```text
Server running at http://localhost:3000
```

The PowerShell window running the server needs to remain open while the application is being used.

The website can then be opened in a web browser by going to:

```text
http://localhost:3000
```

The main page is public and does not require authentication. Users can submit a helpdesk ticket directly from the main page. Submitted tickets are sent to the Node.js backend and saved in `tickets.json`.

The login page is available at:

```text
http://localhost:3000/login.html
```

After logging in with an authorized account, the user is redirected to the internal ticket portal:

```text
http://localhost:3000/tickets
```

The ticket portal and the ticket viewing API are protected by authentication. Users who are not logged in will be redirected to the login page instead of being allowed to view submitted tickets.

## Application Flow

The basic flow of the application is:

```text
Public Homepage
      |
      +----> Submit Helpdesk Ticket
      |             |
      |             v
      |        tickets.json
      |
      +----> Login
                    |
                    v
             Authentication
                    |
                    v
             Ticket Portal
                    |
                    v
              View Tickets
```

The homepage and ticket submission form are public because a person reporting an IT issue should not need access to the internal ticket system. Authentication is only required when accessing the internal ticket portal and retrieving the submitted tickets.

## Important URLs

The main public website is available at `http://localhost:3000`.

The login page is available at `http://localhost:3000/login.html`.

The protected internal ticket portal is available at `http://localhost:3000/tickets`.

## Running the Project Again

After the initial setup has been completed, the project does not need to be initialized or have its packages reinstalled each time. The server can be started by opening PowerShell, navigating to the project folder, and running:

```powershell
node server.js
```

The website can then be accessed at:

```text
http://localhost:3000
```

To stop the application, return to the PowerShell window running Node.js and press `Ctrl+C`.

## Important

This project uses Node.js and Express as its web server, so it should not be opened using VS Code Live Server or directly from the `index.html` file. Do not use `http://localhost:5500` or the `file://` protocol for this project. Start the Node.js server with `node server.js` and access the application through `http://localhost:3000`.

This project is intended as a basic class and learning project. JSON files are being used as a simple database so the application can demonstrate storing and retrieving information without requiring a separate database server. A production helpdesk system would normally use a proper database such as SQL Server, PostgreSQL, MySQL, or SQLite and would include additional security controls, HTTPS, stronger session management, input validation, logging, and other production safeguards.

```
```

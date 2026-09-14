# IT Helpdesk Ticketing System

A basic IT Helpdesk Ticketing System built with HTML, CSS, JavaScript, Node.js, Express, bcrypt, Express Session, Nodemailer, and JSON files.

The public website is stored in the `public` folder. The Node.js backend and JSON files are stored in the main project folder.

## Project Structure

```text
IT Helpdesk Ticketing System/
│
├── server.js
├── create-user.js
├── tickets.json
├── users.json
├── package.json
├── package-lock.json
├── .env
├── .gitignore
│
└── public/
    ├── index.html
    ├── login.html
    ├── tickets.html
    ├── style.css
    ├── script.js
    └── login.js
```

## Requirements

You need:

* Node.js LTS
* A web browser
* VS Code (recommended)

Download Node.js from:

https://nodejs.org/

Check that Node.js is installed:

```powershell
node --version
npm --version
```

## Installation

Open PowerShell in the project folder.

If `package.json` already exists:

```powershell
npm install
```

If you are setting up the project from scratch:

```powershell
npm init -y
npm install express bcrypt express-session nodemailer dotenv
```

The project uses:

* **Express** – Web server and API
* **bcrypt** – Password hashing
* **express-session** – Login sessions
* **Nodemailer** – Sending customer emails
* **dotenv** – Loading private settings from `.env`

## JSON Files

Make sure these files exist:

### `tickets.json`

```json
[]
```

### `users.json`

```json
[]
```

These files are used as the application's simple database.

## Create a User

Edit `create-user.js` with the username and password you want to use.

Then run:

```powershell
node create-user.js
```

The password will be stored as a bcrypt hash in `users.json`.

Once the account has been created, `create-user.js` can be removed if it is no longer needed.

## Gmail Setup

The ticket portal can send email through Gmail using Nodemailer.

Create a Google **App Password** and place the credentials in a `.env` file:

```env
GMAIL_USER=yourgmail@gmail.com
GMAIL_APP_PASSWORD=your16characterapppassword
```

Do not use your normal Gmail password.

Do not share or commit the `.env` file.

The `.gitignore` file should contain:

```text
.env
node_modules/
```

## Running the Application

Start the server from PowerShell:

```powershell
node server.js
```

You should see:

```text
Server running at http://localhost:3000
```

Open the website:

```text
http://localhost:3000
```

Login:

```text
http://localhost:3000/login.html
```

Internal ticket portal:

```text
http://localhost:3000/tickets
```

## Ticket Features

The internal ticket portal allows authenticated users to:

* View submitted tickets
* Change ticket status
* Delete tickets
* Send emails to customers

Available ticket statuses are:

```text
Open
In Progress
Closed
```

The public homepage allows anyone to submit a support ticket without logging in.

## Application Flow

```text
Public Homepage
       |
       +----> Submit Ticket
       |          |
       |          v
       |     tickets.json
       |
       +----> Login
                  |
                  v
             Ticket Portal
                  |
          +-------+-------+
          |       |       |
        View    Status   Delete
        Tickets Update  Tickets
                  |
                  v
             Email Customer
```

## Important

Do not open the project directly with `index.html` or VS Code Live Server.

Start the Node.js server:

```powershell
node server.js
```

Then access the application through:

```text
http://localhost:3000
```

To stop the server, press:

```text
Ctrl+C
```

This project uses JSON files as a simple database for learning purposes. A production helpdesk system would normally use a proper database and additional security controls.

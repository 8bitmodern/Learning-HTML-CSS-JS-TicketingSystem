const bcrypt = require("bcrypt");
const fs = require("fs");

const username = "admin";
const password = "password";

async function createUser() {

    const passwordHash = await bcrypt.hash(password, 12);

    const users = [
        {
            username: username,
            passwordHash: passwordHash
        }
    ];

    fs.writeFileSync(
        "users.json",
        JSON.stringify(users, null, 2)
    );

    console.log("User created successfully.");
}

createUser();
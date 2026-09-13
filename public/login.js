const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    loginMessage.textContent = "Logging in...";
    loginMessage.style.color = "";

    try {

        const response = await fetch("/api/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const result = await response.json();

        if (!response.ok) {

            throw new Error(
                result.error || "Login failed."
            );
        }

        loginMessage.textContent =
            "Login successful. Redirecting...";

        loginMessage.style.color = "green";

        // Send the user to the protected ticket portal
        window.location.href = "/tickets";

    } catch (error) {

        console.error("Login error:", error);

        loginMessage.textContent =
            error.message || "Unable to log in.";

        loginMessage.style.color = "red";
    }

});
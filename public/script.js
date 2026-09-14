const ticketForm = document.getElementById("ticketForm");
const message = document.getElementById("message");

ticketForm.addEventListener("submit", async function (event) {

    // Prevent the browser from refreshing the page
    event.preventDefault();

    const formData = new FormData(ticketForm);

    const ticket = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        description: formData.get("description")
    };

    // Show a message while submitting
    message.textContent = "Submitting ticket...";
    message.style.color = "";

    try {

        const response = await fetch("/api/tickets", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(ticket)
        });

        // Get the JSON response from the server
        const result = await response.json();

        // Check for an error response
        if (!response.ok) {

            throw new Error(
                result.error || "Unable to submit ticket."
            );
        }

        // Successful ticket submission
        message.textContent =
            `Ticket #${result.ticket.id} submitted successfully.`;

        message.style.color = "green";

        // Clear the form
        ticketForm.reset();

    } catch (error) {

        console.error("Ticket submission error:", error);

        message.textContent =
            error.message ||
            "There was a problem submitting the ticket.";

        message.style.color = "red";
    }

});

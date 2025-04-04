document.addEventListener("DOMContentLoaded", function () {
    const messagesContainer = document.getElementById("submitted-messages-container");

    // Retrieve saved messages from localStorage
    const savedMessages = JSON.parse(localStorage.getItem("submittedMessages")) || [];

    if (savedMessages.length === 0) {
        messagesContainer.innerHTML = "<p>No messages have been submitted yet.</p>";
        return;
    }

    // Render messages dynamically
    savedMessages.forEach(message => {
        const messageCard = document.createElement("div");
        messageCard.className = "message-card";
        messageCard.innerHTML = `
            <h5>From: ${message.name}</h5>
            <p><strong>Email:</strong> ${message.email}</p>
            <p><strong>Message:</strong> ${message.message}</p>
        `;
        messagesContainer.appendChild(messageCard);
    });
});

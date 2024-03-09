<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat Room</title>
    <style>
    </style>
    </head>
<body>
    <div id="chatArea"></div>
    <input type="text" id="messageInput" placeholder="Type your message here...">
    <button onclick="sendMessage()">Send</button>
    <script>
        // WebSocket connection
        const socket = new WebSocket("ws://localhost:8090/chat");

        // Function to add messages to the chat area
        function addMessage(message) {
            const chatArea = document.getElementById("chatArea");
            const messageElement = document.createElement("div");
            messageElement.textContent = message.sender + ": " + message.content;
            chatArea.appendChild(messageElement);
        }

        // Function to send a message to the server
        function sendMessage() {
            const messageInput = document.getElementById("messageInput");
            const message = {
                content: messageInput.value,
                sender: "User",
                type: "CHAT"
            };
            socket.send(JSON.stringify(message));
            messageInput.value = "";
        }

        // WebSocket event listeners
        socket.onopen = function(event) {
            console.log("WebSocket connection opened");
        };

        socket.onmessage = function(event) {
            const message = JSON.parse(event.data);
            addMessage(message);
        };

        socket.onclose = function(event) {
            console.log("WebSocket connection closed");
        };
    </script>
</body>
</html>
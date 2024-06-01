const socket = io({
    autoConnect: false,
});

let username = "";
Swal.fire({
    title: "Identify you",
    icon: "question",
    input: "text",
    inputValidator: (value) => {
        if (!value) {
            return "Please enter a valid username";
        }
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
}).then((res) => {
    username = res.value;
    socket.connect();
});

console.log("Chat Client: Connection successful");

const chatbox = document.getElementById("chatbox");
chatbox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        // Send message
        socket.emit("message", {username: username, message: chatbox.value});
        // socket.emit("message", chatbox.value);

        // Clear input box
        chatbox.value = "";
    }
})

socket.on("log", (data) => {
    const logs = document.getElementById("messagesLog");
    let messages = "";
    data.forEach(msgItem => {
        messages += `${msgItem.username} dice ${msgItem.message} <br>`;
    })
    console.log(messages);
    logs.innerHTML = messages;
})

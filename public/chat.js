const socket = io();

/*socket.on("messages", messages => {
    console.log("chat messages:",messages);
})*/

const user = {}

Swal.fire({
    title: "Type your userName:",
    input: "text",
    inputValidator: userName => (!userName && "Tye your userName!"),
    allowOutsideClick: false,
    allowEscapeKey: false,
}).then(obj => {
    user.name = obj.value
    document.querySelector("#name").innerHTML = obj.value
    socket.emit("user", user);
})

const chatData = document.querySelector("#chat-text")
chatData.addEventListener("keyup", event => {
    if(event.key === "Enter") {
        event.preventDefault();
        socket.emit("new message", {name: user.name, message: chatData.value});
        chatData.value= ""
    }
})

socket.on("new chat messages:", data => {
   data = data.map(each => `
    <p>
    <span class="fw-bold">
        ${each.name}:
    </span>
        ${each.message}
    </p>`).join("")
    document.querySelector("#chats").innerHTML= data;
})
//.on listens for events
let socket = io();
socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("disconnect", () => {
    console.log("Lost connection with server");
});

socket.on("sendMessage", (payload) => {
    console.log(payload);
});

//.emit is to send data
socket.emit("sendMessage", {
    user: "Frank",
    message: "Hello World"
}, (response) => {
    console.log(response.resp);
});
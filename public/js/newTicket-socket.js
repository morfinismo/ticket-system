const socket = io();
let ticketLabel = $("#lblNewTicket");

socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("disconnect", () => {
    console.log("Lost server connection");
});

socket.on("currentTicket", (response) => {
    ticketLabel.text(response.currentTicket);
});

$("button").click(() => {
    socket.emit("nextTicket", null, (currentTicket) => {
        ticketLabel.text(currentTicket);
    });
});